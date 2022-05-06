import { useStaticQuery, graphql } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
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
    `
  );

  return site;
};

export default useSiteMetadata;
