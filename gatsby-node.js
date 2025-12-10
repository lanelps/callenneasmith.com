const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~assets": path.resolve(__dirname, `src/assets`),
        "~components": path.resolve(__dirname, `src/components`),
        "~context": path.resolve(__dirname, `src/context`),
        "~data": path.resolve(__dirname, `src/data`),
        "~hooks": path.resolve(__dirname, `src/hooks`),
        "~node_modules": path.resolve(__dirname, `node_modules`),
        "~templates": path.resolve(__dirname, `src/templates`),
        "~utils": path.resolve(__dirname, `src/utils`)
      }
    }
  });
};

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions;

  // Target Sanity Mux video asset nodes
  if (node.internal.type === "SanityMuxVideoAsset" && node.playbackId) {
    try {
      const { createBlurUp } = await import("@mux/blurup");
      const { blurDataURL, aspectRatio } = await createBlurUp(node.playbackId);

      if (!blurDataURL || !aspectRatio) {
        console.warn(`Skipping incomplete blur data for ${node.playbackId}`);
        return;
      }

      console.log("✓ Successfully created blur data for:", node.playbackId);

      const blurNode = {
        id: createNodeId(`mux-blur-${node.id}`),
        parent: node.id,
        playbackId: node.playbackId,
        blurDataURL: blurDataURL,
        aspectRatio: aspectRatio,
        internal: {
          type: "MuxBlurData",
          contentDigest: createContentDigest({
            blurDataURL,
            aspectRatio,
            playbackId: node.playbackId
          })
        }
      };

      createNode(blurNode);
      createParentChildLink({ parent: node, child: blurNode });
    } catch (error) {
      console.error(
        `✗ Failed to create blur data for ${node.playbackId}:`,
        error.message
      );
    }
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
   type MuxBlurData implements Node {
      playbackId: String
      blurDataURL: String
      aspectRatio: Float
    }

    type SanityMuxVideoAsset implements Node {
      blurData: MuxBlurData
    }
  `);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityMuxVideoAsset: {
      blurData: {
        type: "MuxBlurData",
        resolve: async (source, args, context, info) => {
          return await context.nodeModel.findOne({
            type: "MuxBlurData",
            query: {
              filter: { parent: { id: { eq: source.id } } }
            }
          });
        }
      }
    }
  };
  createResolvers(resolvers);
};
