require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

const { GATSBY_SANITY_PROJECT_ID, GATSBY_SANITY_DATASET, SANITY_TOKEN } =
  process.env;

const isProd = process.env.NODE_ENV === `production`;
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || `false`).toLowerCase() === `true`;

module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    author: `Callen Nea Smith`,
    description: ``,
    facebook: ``,
    favicon: `/favicon.jpg`,
    instagram: ``,
    image: `/share.jpg`,
    keywords: ``,
    siteLanguage: `en`,
    siteUrl: `https://callenneasmith.netlify.app/`,
    title: `callenneasmith`,
    titleTemplate: `%s - callenneasmith`
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `${__dirname}/static/favicon.jpg`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: GATSBY_SANITY_PROJECT_ID,
        dataset: GATSBY_SANITY_DATASET,
        token: SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd || previewEnabled
      }
    },
    `gatsby-plugin-svgr`,
    {
      resolve: `gatsby-plugin-breakpoints`,
      options: {
        queries: {
          isMobile: `(max-width: 428px)`,
          isTablet: `(min-width: 429px)`,
          isDesktop: `(min-width: 1025px)`,
          isLarge: `(min-width: 1441px)`
        }
      }
    }
  ]
};
