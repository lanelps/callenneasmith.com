import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";
import { useApp } from "~hooks";

import { breakpoint } from "~utils/css";

import { ReactComponent as Cross } from "~assets/svg/cross.svg";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: auto;

  display: flex;

  padding: 0.625rem 0;
  background-color: var(--color-off-white);
  color: var(--color-rich-black);
  border-bottom: 0.5px solid var(--color-off-black);

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
  display: none;

  ${breakpoint(`tablet`)} {
    display: block;
    grid-column: 4 / span 2;
  }
`;

const ContactButton = styled.p`
  display: none;

  ${breakpoint(`tablet`)} {
    display: block;
    color: ${({ active }) =>
      active ? `var(--color-rich-black)` : `var(--color-off-black)`};
    grid-column: 6;
    text-align: left;

    :hover {
      color: var(--color-rich-black);
    }

    transition: color 0.3s ease;
  }
`;

const MobileButton = styled.button`
  grid-column: 6 / span 1;
  display: flex;
  justify-content: flex-end;

  margin-right: -0.5rem;
  padding: 0 0.5rem;

  ${breakpoint(`tablet`)} {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: relative;
  grid-column: 1 / -1;

  display: grid;
  grid-template-rows: ${({ show }) => (show ? `1fr` : `0fr`)};

  margin: 0;

  z-index: 2;
  overflow: hidden;
  transition:
    grid-template-rows 0.3s ease,
    border-color 0.3s ease;

  ${breakpoint(`tablet`)} {
    grid-column: 6 / span 1;
    border: none;
  }
`;

const DropdownWrapper = styled.div`
  overflow: hidden;
`;

const Contacts = styled.ul`
  position: relative;

  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.6rem;
  }

  padding-top: 0.6rem;
  color: var(--color-off-black);

  ${breakpoint(`tablet`)} {
    padding: 0.75rem 0;

    > * + * {
      margin-top: 0.75rem;
    }
  }
`;

const NavBar = ({ title, role, contact }) => {
  const { introInView } = useApp();
  const [showContacts, setShowContacts] = useState(false);

  return (
    <Container show={!introInView} onMouseLeave={() => setShowContacts(false)}>
      <Grid
        css={css`
          align-items: center;
        `}
      >
        <Title className="h1">{title}</Title>
        <Role className="h1">{role}</Role>

        <ContactButton
          type="button"
          className="h1"
          onMouseEnter={() => setShowContacts(true)}
          active={showContacts}
        >
          Contact
        </ContactButton>

        {/* mobile */}
        <MobileButton
          type="button"
          onClick={() => setShowContacts(!showContacts)}
        >
          <Cross
            css={css`
              position: relative;
              width: 1rem;
              height: 1rem;

              color: ${showContacts
                ? `var(--color-off-black)`
                : `var(--color-rich-black)`};

              transform: rotate(${showContacts ? `-45deg` : `0deg`});

              transition: transform 0.15s ease;
            `}
          />
        </MobileButton>

        <Dropdown show={showContacts}>
          <DropdownWrapper>
            <Contacts className="h1">
              {contact.map((item) => (
                <a
                  key={`${item?._key}-nav`}
                  href={`${item?.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  css={css`
                    :hover {
                      color: var(--color-rich-black);
                    }

                    transition: color 0.3s ease;
                  `}
                >
                  <li>{item?.label}</li>
                </a>
              ))}
            </Contacts>
          </DropdownWrapper>
        </Dropdown>
      </Grid>
    </Container>
  );
};

export default NavBar;
