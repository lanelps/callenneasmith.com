import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";

import { Layout, Grid, Image } from "~components";

import { breakpoint } from "~utils/css";

const NotFound = ({ data, location }) => (
  <Layout data={data} location={location}>
    <Grid
      css={css`
        height: 100vh;
      `}
    >
      <figure
        css={css`
          grid-column: 1 / -1;
        `}
      >
        <Image
          css={css`
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);

            ${breakpoint(`tablet`)} {
              transform: rotate(0deg);
            }
          `}
          image={data.sanitySettings.errorPage}
          contain
        />
      </figure>
    </Grid>
  </Layout>
);

export default NotFound;

export const query = graphql`
  query {
    sanitySettings {
      title
      role

      navItems {
        _key
        title
        items {
          _key
          _rawText(resolveReferences: { maxDepth: 10 })
          tag
        }
      }

      _rawFootnote(resolveReferences: { maxDepth: 10 })

      contact {
        _key
        label
        url
      }

      errorPage {
        asset {
          gatsbyImageData(
            width: 1440
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }

      seoTitle
      seoDescription
      seoKeywords
      seoImage {
        asset {
          gatsbyImageData(
            width: 720
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`;
