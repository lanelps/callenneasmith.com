import React, { useState, useRef, useEffect } from "react";
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

  padding: 0.625rem 0;
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
  grid-column: 6 / span 1;

  height: ${({ show, dropdownHeight }) => (show ? `${dropdownHeight}px` : `0`)};

  margin: 0;

  z-index: 2;
  overflow: hidden;

  transition: height 0.3s ease;
`;

const Contacts = styled.ul`
  position: relative;
  padding: 0.75rem 0;
  color: var(--color-off-black);
`;

const NavBar = ({ title, role, contact }) => {
  const contactsRef = useRef();

  const { introInView } = useApp();
  const [showContacts, setShowContacts] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  useEffect(() => {
    if (contactsRef?.current) {
      setDropdownHeight(contactsRef.current.clientHeight);
    }
  }, [contactsRef?.current]);

  return (
    <Container show={!introInView} onMouseLeave={() => setShowContacts(false)}>
      <Grid>
        <Title className="h1">{title}</Title>
        <Role className="h1">{role}</Role>
        <button
          type="button"
          css={css`
            color: var(--color-off-black);
            grid-column: 6;
            text-align: left;
          `}
          className="h1"
          onMouseEnter={() => setShowContacts(true)}
        >
          Contact
        </button>
        <Dropdown show={showContacts} dropdownHeight={dropdownHeight}>
          <Contacts ref={contactsRef} className="h1">
            {contact.map((item) => (
              <a href={`${item.url}`} target="_blank" rel="noopener noreferrer">
                <li>{item.label}</li>
              </a>
            ))}
          </Contacts>
        </Dropdown>
      </Grid>
    </Container>
  );
};

export default NavBar;
