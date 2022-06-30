import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Draggable from "react-draggable";

import { Image } from "~components";

import { ReactComponent as PopOutIcon } from "~assets/svg/pop-out.svg";

const Button = styled.button`
  position: relative;
  width: max-content;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-off-black);

  text-transform: uppercase;
`;

const PopOut = ({ image, isActive, setIsActive }) => {
  const loadedRef = useRef(false);
  const [popUpActive, setPopUpActive] = useState(false);

  useEffect(() => {
    if (isActive && !loadedRef.current) {
      loadedRef.current = true;
    }
  }, [isActive]);

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          setPopUpActive(true);
          setIsActive(false);
        }}
      >
        <PopOutIcon
          css={css`
            width: 1rem;
          `}
        />

        <span className="caption">Pop Out</span>
      </Button>

      {loadedRef?.current && (
        <PopOutImage
          image={image}
          active={popUpActive}
          setActive={setPopUpActive}
        />
      )}
    </>
  );
};

export default PopOut;

const PopOutImage = ({ image, active, setActive }) => {
  const [doucmentExists, setDocumentExists] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const DOCUMENT_MAIN =
      typeof document !== `undefined`
        ? document.getElementById(`app-root`)
        : null;

    if (!DOCUMENT_MAIN) return;

    setDocumentExists(true);
  }, []);

  if (doucmentExists) {
    return createPortal(
      <Draggable
        onDrag={() => setIsDragging(true)}
        onStop={() => setIsDragging(false)}
      >
        <figure
          css={css`
            position: fixed;
            top: 5vw;
            right: 5vw;

            aspect-ratio: 1/1;
            max-height: 428px;

            opacity: ${active ? 1 : 0};
            pointer-events: ${active ? `auto` : `none`};
            cursor: pointer;

            transition: opacity 0.3s ease;
            z-index: 100;
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
      </Draggable>,
      document.getElementById(`app-root`)
    );
  }

  return null;
};
