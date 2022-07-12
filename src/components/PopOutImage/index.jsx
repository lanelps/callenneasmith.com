import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Draggable } from "~components";

import { ReactComponent as Cross } from "~assets/svg/cross.svg";

const PopOutImage = ({ id, image, active, setActive }) => (
  <Draggable
    id={id}
    css={css`
      opacity: ${active ? 1 : 0};
      pointer-events: ${active ? `auto` : `none`};

      transition: opacity 0.3s ease;

      z-index: 100;
    `}
    startPosition={[`5vw`, `5vw`]}
  >
    <figure
      css={css`
        aspect-ratio: 1/1;
        max-height: 428px;
      `}
    >
      <Image
        image={image}
        css={css`
          user-select: none;
          pointer-events: none;
        `}
      />
    </figure>
    <Cross
      css={css`
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;

        width: 1rem;
        height: 1rem;

        color: var(--color-white);
        transform: rotate(-45deg);
        mix-blend-mode: difference;

        cursor: pointer;
      `}
      onPointerDown={() => setActive(false)}
    />
  </Draggable>
);

export default PopOutImage;
