require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const isProd = process.env.NODE_ENV === "production";
const previewEnabled =
  (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true";

module.exports = {
  siteMetadata: {
    author: `Lane Le Prevost-Smith`,
    description: `A bare bones Gatsby boilerplate`,
    facebook: ``,
    instagram: ``,
    image: `/share.jpg`,
    keywords: ``,
    siteLanguage: `en`,
    siteUrl: `https://www.example.com`,
    title: `Gatsby Tinderbox`,
    titleTemplate: `%s - Gatsby Tinderbox`
  },
  plugins: [
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
        projectId: `4kxh2xwe`,
        dataset: `production`,
        token: process.env.SANITY_API_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd || previewEnabled
      }
    }
  ]
};
