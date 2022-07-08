/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Cursor } from "~components";
import { useSize } from "~hooks";

import { breakpoint } from "~utils/css";

import { ReactComponent as Arrow } from "~assets/svg/arrow.svg";

const Container = styled.ul`
  position: relative;
  width: 100%;

  display: flex;
  gap: 0.375rem;

  padding-bottom: 1rem;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  cursor: none;

  ${breakpoint(`tablet`)} {
    padding-bottom: 0.75rem;
  }
`;

const Slide = styled.li`
  position: relative;
  height: 100%;

  scroll-snap-align: start;

  figure {
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
`;

const ImageCarousel = ({ images, className, loaded }) => {
  const ref = useRef();
  const cursorRef = useRef();
  const size = useSize(ref);

  const [arrowActive, setArrowActive] = useState(false);
  const [arrowDirection, setArrowDirection] = useState(`right`);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!arrowActive) return;

    if (e.clientX > 0 && e.clientX <= size.width / 2) {
      setArrowDirection(`left`);
    }

    if (e.clientX > size.width / 2 && e.clientX < size.width) {
      setArrowDirection(`right`);
    }

    setPosition({
      x: e.clientX - 16 / 2,
      y: e.clientY - 16 / 2
    });
  };

  const handleEnter = () => {
    setArrowActive(true);
  };

  const handleLeave = () => {
    setArrowActive(false);
  };

  return (
    <Container
      className={className}
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Cursor */}
      <div
        ref={cursorRef}
        css={css`
          position: fixed;
          top: 0;
          left: 0;

          transform: ${`translate3d(${position.x}px, ${position.y}px, 0)`};
          pointer-events: none;
          mix-blend-mode: difference;

          opacity: ${arrowActive ? 1 : 0};
          transition: opacity 0.3s ease;

          z-index: 1;
        `}
      >
        <Arrow
          width="16"
          height="16"
          color="white"
          css={css`
            transform: rotate(
              ${(arrowDirection === `left` && `-180deg`) ||
              (arrowDirection === `right` && `0deg`)}
            );

            transition: transform 0.3s ease;
          `}
        />
      </div>

      {loaded &&
        images.map((image, index) => (
          <Slide key={image?._key}>
            <figure>
              <Image
                image={image}
                css={css`
                  aspect-ratio: 1/1;
                  width: max-content;
                  height: 60.55vw;

                  user-drag: none;
                  pointer-events: none;
                  user-select: none;

                  ${breakpoint(`tablet`)} {
                    height: 29.72vw;
                  }
                `}
              />
              <figcaption className="caption">
                {index + 1}/{images.length}
              </figcaption>
            </figure>
          </Slide>
        ))}
    </Container>
  );
};

export default ImageCarousel;
