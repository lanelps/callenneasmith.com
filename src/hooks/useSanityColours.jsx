import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  query Colours {
    allSanityColour(sort: { name: ASC }) {
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
`;

const useSanityColours = () => {
  // const data = useStaticQuery(query);

  // const colours = data.allSanityColour.edges.map(({ node }) => node);
  const colours = [];

  return colours;
};

export default useSanityColours;
