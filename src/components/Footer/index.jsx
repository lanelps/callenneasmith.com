import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Footer = styled.div`
  background: #f7f7f7;
  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 110%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  padding: 48px 12px 12px 12px;
  display: flex;
`;

const footer = () => (
  <Footer>
    <h5
      css={css`
        padding-right: 664px;
      `}
    >
      Callen Neasmith 2022 ©
    </h5>
    <h5
      css={css`
        color: #595959;
        padding-right: 105px;
      `}
    >
      calneasmith@gmail.com
    </h5>
    <h5
      css={css`
        color: #595959;
      `}
    >
      @callencallencallen
    </h5>
  </Footer>
);

export default footer;
