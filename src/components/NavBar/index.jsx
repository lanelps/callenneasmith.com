import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Grid } from "~components";

const Container = styled.div`
  color: ##000000;
  display: flex;
  height: 58px;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;
  padding: 10px;
  padding-left: 0px;
`;

const NavBar = () => (
  <Container>
    <Grid>
      <h2
        css={css`
          grid-column: 1 / span 3;
        `}
      >
        Callen Neasmith
      </h2>
      <h2
        css={css`
          grid-column: 4 / span 2;
        `}
      >
        Digtal & Graphic Designer
      </h2>
      <h2
        css={css`
          color: #595959;
        `}
      >
        Contact
      </h2>
    </Grid>
  </Container>
);

export default NavBar;
