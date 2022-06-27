import { useStaticQuery, graphql } from "gatsby";

const useSanityTags = () => {
  const data = useStaticQuery(graphql`
    query Tags {
      allSanityTag {
        edges {
          node {
            id
            name
            colour {
              value {
                hex
              }
            }
          }
        }
      }
    }
  `);

  const tags = data.allSanityTag.edges.map(({ node }) => node);

  return tags;
};

export default useSanityTags;
