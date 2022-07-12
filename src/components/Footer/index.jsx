import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";

import { breakpoint } from "~utils/css";

const Footer = styled.div`
  position: relative;
  width: 100%;

  padding: 1.5rem 0;

  background: var(--color-white);
  text-transform: uppercase;

  h5 {
    grid-column: 1 / -1;
    margin-bottom: 1.5rem;
  }

  a:first-of-type {
    grid-column: 1 / span 3;
  }

  ${breakpoint(`tablet`)} {
    padding: 3rem 0;

    h5 {
      grid-column: 1 / span 3;
      margin-bottom: 0;
    }

    a:first-of-type {
      grid-column: 4 / span 1;
    }
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

            :hover {
              color: var(--color-rich-black);
            }

            transition: color 0.3s ease;
          `}
        >
          {item?.label}
        </a>
      ))}
    </Grid>
  </Footer>
);

export default footer;
