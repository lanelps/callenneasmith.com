import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { ReactComponent as Arrow } from "~assets/svg/arrow.svg";

const Cursor = ({ width = `16`, height = `16`, color = `black` }) => {
  const cursorRef = useRef();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offSet, setOffSet] = useState({ x: 0, y: 0 });

  return (
    <Arrow
      ref={cursorRef}
      width={width}
      height={height}
      color={color}
      css={css`
        position: fixed;
        top: 0;
        left: 0;

        z-index: 1;
      `}
    />
  );
};

export default Cursor;
