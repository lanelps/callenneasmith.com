import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/react";

import { Layout, Grid, Go } from "~components";

const NotFound = ({ data: { sanitySettings } }) => (
  <Layout data={{ sanitySettings }}>
    <Grid>
      <h1
        className="h1"
        css={css`
          grid-column: 1 / span 6;
        `}
      >
        404 Error
      </h1>
      <p
        className="h1"
        css={css`
          grid-column: 1 / span 6;
          grid-row: 2;
        `}
      >
        Nothing here sorry - let’s go{` `}
        <Go
          to="/"
          css={css`
            color: var(--color-off-black);
          `}
        >
          back home.
        </Go>
      </p>
    </Grid>
  </Layout>
);

export default NotFound;

export const query = graphql`
  query {
    sanitySettings {
      contact {
        label
        url
      }
      _rawIntroduction(resolveReferences: { maxDepth: 10 })
      title
      role
    }
  }
`;
