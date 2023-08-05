import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  query SiteMetaData {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        author
        description
        facebook
        instagram
        image
        keywords
        siteLanguage
        siteUrl
        title
        titleTemplate
      }
    }
  }
`;

const useSiteMetadata = () => {
  // const { site } = useStaticQuery(query);
  const site = {};

  return site;
};

export default useSiteMetadata;
