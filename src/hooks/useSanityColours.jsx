import { useStaticQuery, graphql } from "gatsby";

const useSanityColours = () => {
  const data = useStaticQuery(graphql`
    query Colours {
      allSanityColour(sort: { fields: name }) {
        edges {
          node {
            id
            name
            value {
              hex
            }
          }
        }
      }
    }
  `);

  const colours = data.allSanityColour.edges.map(({ node }) => node);

  return colours;
};

export default useSanityColours;
