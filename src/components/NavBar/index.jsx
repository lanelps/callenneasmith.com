import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Grid } from "~components";
import { useStaticQuery, graphql } from "gatsby";

const Container = styled.div`
  color: #000000;
  display: flex;
  height: auto;
  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;
  padding: 10px;
  padding-left: 0px;
  background-color: #ffffff;
`;

const Dropdown = styled.div`
  position: relative;
  margin: 0;
  z-index: 2;
  padding: 12px 0px;
  align-items: center;
  grid-column: 6 / span 1;
`;

const NavBar = () => {
  const data = useStaticQuery(graphql`
    query {
      sanitySettings {
        title
        role
        contact {
          label
          url
        }
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
            text-align: left;
          `}
        >
          Contact
        </button>
        {/* <Dropdown>
          <ul>
            <a
              href={`${data.sanitySettings.contact[0].url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>{data.sanitySettings.contact[0].label}</li>
            </a>
            <a
              href={`${data.sanitySettings.contact[1].url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <li>{data.sanitySettings.contact[1].label}</li>
            </a>
          </ul>
        </Dropdown> */}
      </Grid>
    </Container>
  );
};

export default NavBar;
