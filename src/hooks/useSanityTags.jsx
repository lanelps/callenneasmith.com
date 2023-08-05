import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
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
`;

const useSanityTags = () => {
  // const data = useStaticQuery(query);

  // const tags = data.allSanityTag.edges.map(({ node }) => node);
  const tags = [];

  return tags;
};

export default useSanityTags;
