require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

const { GATSBY_SANITY_PROJECT_ID, GATSBY_SANITY_DATASET, SANITY_TOKEN, GA_MEASUREMENT_ID } =
  process.env;

const isProd = process.env.NODE_ENV === `production`;
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || `false`).toLowerCase() === `true`;

module.exports = {
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    author: `Callen Neasmith`,
    description: ``,
    facebook: ``,
    favicon: `/favicon.png`,
    instagram: ``,
    image: `/share.png`,
    keywords: ``,
    siteLanguage: `en`,
    siteUrl: `https://callenneasmith.com/`,
    title: `Callen Neasmith`,
    titleTemplate: `%s - Callen Neasmith`
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
        icon: `${__dirname}/static/favicon.png`
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
    {
      resolve: `gatsby-plugin-sanity-image`,
      options: {
        projectId: GATSBY_SANITY_PROJECT_ID,
        dataset: GATSBY_SANITY_DATASET,
        token: SANITY_TOKEN
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
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          GA_MEASUREMENT_ID // Google Analytics / GA
        ]
      }
    }
  ]
};
