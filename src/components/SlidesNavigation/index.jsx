// SlidesNavigation.jsx
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { breakpoint } from "~utils/css";

const SlidesNavContainer = styled.nav`
  grid-column: 1 / -1;
  padding: 0.5rem;
  background-color: var(--color-white);
  user-select: none;
  pointer-events: ${({ active }) => (active ? `auto` : `none`)};

  ${breakpoint("tablet")} {
    grid-column: 4 / -1;
    padding-right: 1rem;
    order: 2;
  }
`;

const SlidesNavigation = ({ active, onClose, currentIndex, totalSlides }) => (
  <SlidesNavContainer active={active}>
    <button
      onClick={onClose}
      css={css`
        width: 100%;
        display: flex;
        justify-content: space-between;
      `}
      className="h1"
    >
      <span>Close Overlay</span>
      <span>
        {currentIndex + 1}/{totalSlides}
      </span>
    </button>
  </SlidesNavContainer>
);

export default SlidesNavigation;
