import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Draggable } from "~components";

const PopOutImage = ({ id, image, active, setActive }) => (
  <Draggable
    id={id}
    css={css`
      opacity: ${active ? 1 : 0};
      pointer-events: ${active ? `auto` : `none`};

      transition: opacity 0.3s ease;
    `}
    startPosition={[`5vw`, `5vw`]}
    onClick={() => setActive(false)}
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
  </Draggable>
);

export default PopOutImage;
