/* eslint-disable import/prefer-default-export */
import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  apiVersion: `2023-08-4`, // use current UTC date - see "specifying API version"!
  useCdn: true // `false` if you want to ensure fresh data
};

export const sanityClient = createClient(sanityConfig);
