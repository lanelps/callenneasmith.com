import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid, Go } from "~components";
import { useApp } from "~hooks";

import { breakpoint } from "~utils/css";

import { ReactComponent as Cross } from "~assets/svg/cross.svg";

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: auto;

  display: flex;

  padding: 0.9375rem 0.5rem 0.625rem;
  background: ${({ active }) =>
    active
      ? `linear-gradient(var(--color-blue), var(--color-red))`
      : `var(--color-white)`};

  color: ${({ active }) =>
    active ? `var(--color-white)` : `var(--color-rich-black)`};

  font-family: "Neue Haas Grotesk Display Pro";
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;

  transform: translateY(${({ show }) => (show ? `0%` : `-100%`)});

  z-index: 100;

  &:hover {
    background: linear-gradient(var(--color-blue), var(--color-red));
    color: var(--color-white);
  }

  ${breakpoint(`tablet`)} {
    padding: 1.0625rem 0 0.75rem;
  }
`;

const Title = styled.h1`
  grid-column: 1 / -2;

  ${breakpoint(`tablet`)} {
    grid-column: 1 / span 2;
  }
`;

const Role = styled.h2`
  display: none;

  ${breakpoint(`tablet`)} {
    display: block;
    grid-column: 3 / span 2;
  }
`;

const ContactButton = styled.p``;

const Contacts = styled.ul`
  position: relative;

  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 0.6rem;
  }

  & li span {
    display: none;
  }

  padding-top: 0.6rem;
  color: var(--color-white);

  ${breakpoint(`tablet`)} {
    display: none;
    flex-direction: row;

    > * + * {
      margin-top: 0;
    }

    & li span {
      display: inline;
    }

    padding-top: 0;
  }
`;

const ContactWrapper = styled.div`
  display: none;

  ${breakpoint(`tablet`)} {
    display: block;
    grid-column-start: 6;
    text-align: left;
  }

  &:hover {
    & > ${ContactButton} {
      display: none;
    }
      & > ${Contacts} {
        display: flex;
      }
`;

const MobileButton = styled.button`
  grid-column: -1;
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
  // transition:
  //   grid-template-rows 0.3s ease,
  //   border-color 0.3s ease;

  ${breakpoint(`tablet`)} {
    display: none;
    grid-column: 6 / span 1;
    border: none;
  }
`;

const DropdownWrapper = styled.div`
  overflow: hidden;
`;

const NavBar = ({ title, role, contact, location }) => {
  const { introInView } = useApp();
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    if (!introInView) {
      setShowContacts(false);
    }
  }, [introInView]);

  return (
    <Container
      active={showContacts}
      show={!introInView || location.pathname !== "/"}
    >
      <Grid
        css={css`
          align-items: center;
          padding: 0;

          ${breakpoint(`tablet`)} {
            padding: 0 0.5rem;
          }
        `}
      >
        <Title className="h1">
          <Go to="/">{title}</Go>
        </Title>

        <Role className="h1">{role}</Role>

        <ContactWrapper className="h1">
          <ContactButton type="button">Contact</ContactButton>

          <Contacts>
            {contact.map((item, idx) => (
              <a
                key={`${item?._key}-nav`}
                href={`${item?.url}`}
                target="_blank"
                rel="noopener noreferrer"
                css={css`
                  :hover {
                    color: var(--color-rich-black);
                  }

                  // transition: color 0.3s ease;
                `}
              >
                <li>
                  {item?.label}
                  {idx < contact.length - 1 && <span>,&nbsp;</span>}
                </li>
              </a>
            ))}
          </Contacts>
        </ContactWrapper>

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
                ? `var(--color-white)`
                : `var(--color-rich-black)`};

              transform: rotate(${showContacts ? `-45deg` : `0deg`});
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

                    // transition: color 0.3s ease;
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
