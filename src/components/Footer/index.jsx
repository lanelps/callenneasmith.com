import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";

const Footer = styled.div`
  position: relative;
  width: 100%;

  padding: 3rem 0.75rem 0.75rem;

  background: var(--color-white);
  text-transform: uppercase;

  a:first-of-type {
    grid-column: 4 / span 1;
  }
`;

const footer = ({ className, contact }) => (
  <Footer className={`${(className && `${className} `) || ``}caption`}>
    <Grid>
      <h5>Callen Neasmith 2022 ©</h5>
      {contact.map((item) => (
        <a
          key={`${item?._key}-footer`}
          href={`${item?.url}`}
          target="_blank"
          rel="noopener noreferrer"
          css={css`
            color: var(--color-off-black);
          `}
        >
          {item?.label}
        </a>
      ))}
    </Grid>
  </Footer>
);

export default footer;
