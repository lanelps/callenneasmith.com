import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { breakpoint } from "~utils/css";

const Footer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  padding: 1.5rem 0.5rem 0.75rem;

  background: var(--color-blue);
  color: var(--color-white);

  a:first-of-type {
    grid-column: span 2;
  }

  ${breakpoint(`tablet`)} {
    flex-wrap: nowrap;
    padding: 3rem 0.5rem 0.5rem;

    a:first-of-type {
      grid-column: span 1;
    }
  }
`;

const footer = ({ className, contact }) => (
  <Footer className={`${(className && `${className} `) || ``}caption`}>
    <h5
      className="caption"
      css={css`
        margin-right: 0.875rem;
        width: 100%;

        ${breakpoint(`tablet`)} {
          width: auto;
        }
      `}
    >
      Callen Neasmith 2025 ©
    </h5>

    {contact.map((item) => (
      <a
        key={`${item?._key}-footer`}
        href={`${item?.url}`}
        target="_blank"
        rel="noopener noreferrer"
        css={css`
          text-decoration: underline;

          :hover {
            text-decoration: none;
          }
        `}
      >
        {item?.label}
      </a>
    ))}
  </Footer>
);

export default footer;
