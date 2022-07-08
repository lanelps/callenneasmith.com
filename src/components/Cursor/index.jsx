import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { ReactComponent as Arrow } from "~assets/svg/arrow.svg";

const ArrowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  transform: translate3d(
    ${({ position }) => `${position.x}px, ${position.y}px, 0px`}
  );
  pointer-events: none;
  mix-blend-mode: difference;

  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.3s ease;

  z-index: 1;
`;

const Cursor = ({
  width = `16`,
  height = `16`,
  color = `white`,
  position,
  direction,
  active
}) => (
  <ArrowContainer position={position} active={active}>
    <Arrow
      width={width}
      height={height}
      color={color}
      css={css`
        transform: rotate(
          ${(direction === `left` && `-180deg`) ||
          (direction === `right` && `0deg`)}
        );

        transition: transform 0.3s ease;
      `}
    />
  </ArrowContainer>
);

export default Cursor;
