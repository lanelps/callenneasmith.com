import React from "react";
import { graphql } from "gatsby";

import { Layout, Intro, Projects } from "~components";

const Index = ({ data: { sanitySettings, allSanityProject } }) => {
  const projects = allSanityProject.edges.map(({ node }) => node);

  return (
    <Layout>
      <Intro introduction={sanitySettings._rawIntroduction} />
      <Projects projects={projects} />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query {
    sanitySettings {
      _rawIntroduction(resolveReferences: { maxDepth: 10 })
    }

    allSanityProject(sort: { fields: started, order: DESC }) {
      edges {
        node {
          _id
          name
          client {
            name
          }
          isFeatured
          isOngoing
          ended(formatString: "y")
          started(formatString: "y")
          tags {
            _id
            name
            colour {
              name
              value {
                hex
              }
            }
          }
          description
          links {
            _key
            label
            url
          }
          images {
            _key
            altText
            asset {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
