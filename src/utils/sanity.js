/* eslint-disable import/prefer-default-export */
import sanityClient from "@sanity/client";

export const config = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  apiVersion: `2022-06-21`, // use current UTC date - see "specifying API version"!
  token: process.env.GATSBY_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true // `false` if you want to ensure fresh data
};

export const configuredClient = sanityClient(config);
