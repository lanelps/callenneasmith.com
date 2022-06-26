import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";
import { useApp } from "~hooks";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: auto;

  display: flex;

  padding: 10px;
  padding-left: 0px;
  background-color: var(--color-white);
  color: var(--color-rich-black);
  border-bottom: 1px solid var(--color-rich-black);

  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;

  transform: translateY(${({ show }) => (show ? `0%` : `-100%`)});
  transition: all 0.3s ease;

  z-index: 20;
`;

const Title = styled.h1`
  grid-column: 1 / span 3;
`;

const Role = styled.h2`
  grid-column: 4 / span 2;
`;

const Dropdown = styled.div`
  position: relative;
  margin: 0;
  z-index: 2;
  padding: 12px 0px;
  align-items: center;
  grid-column: 6 / span 1;
`;

const NavBar = ({ title, role, contact }) => {
  const { introInView } = useApp();

  return (
    <Container show={!introInView}>
      <Grid>
        <Title>{title}</Title>
        <Role>{role}</Role>
        <button
          type="button"
          css={css`
            color: var(--color-off-black);
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
