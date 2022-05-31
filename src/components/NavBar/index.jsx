import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Grid } from "~components";
import { useStaticQuery, graphql } from "gatsby";

const Container = styled.div`
  color: #000000;
  display: flex;
  height: 58px;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;
  padding: 10px;
  padding-left: 0px;
  background-color: #ffffff;
`;

const Dropdown = styled.div`
  background-color: #ffffff;
  position: absolute;
  top: 100%;
  right: -5%;
  width: 105%;
  margin: 0;
  z-index: 2;
  padding: 12px;
  align-items: center;
`;

const NavBar = () => {
  const data = useStaticQuery(graphql`
    query {
      sanitySettings {
        title
        role
      }
    }
  `);

  return (
    <Container>
      <Grid>
        <h2
          css={css`
            grid-column: 1 / span 3;
          `}
        >
          {data.sanitySettings.title}
        </h2>
        <h2
          css={css`
            grid-column: 4 / span 2;
          `}
        >
          {data.sanitySettings.role}
        </h2>
        <button
          type="button"
          css={css`
            color: #595959;
            grid-column: 6;
          `}
        >
          Contact
        </button>
        <Dropdown>
          <ul>
            <li>Email</li>
            <li>Insta</li>
          </ul>
        </Dropdown>
      </Grid>
    </Container>
  );
};

export default NavBar;
