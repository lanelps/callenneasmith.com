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
