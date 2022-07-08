/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Cursor } from "~components";
import { useSize } from "~hooks";

import { breakpoint } from "~utils/css";

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
  const size = useSize(ref);

  const [offsetX, setOffsetX] = useState(
    ref?.current?.getBoundingClientRect()?.left
  );
  const [arrowActive, setArrowActive] = useState(false);
  const [arrowDirection, setArrowDirection] = useState(`right`);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const direction = (e) => {
    if (e.clientX > 0 + offsetX && e.clientX <= size.width / 2 + offsetX) {
      setArrowDirection(`left`);
    }

    if (
      e.clientX > size.width / 2 + offsetX &&
      e.clientX <= size.width + offsetX
    ) {
      setArrowDirection(`right`);
    }
  };

  const handleMove = (e) => {
    if (!arrowActive) return;

    direction(e);

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

  useEffect(() => {
    setOffsetX(ref?.current?.getBoundingClientRect()?.left);
  }, [size]);

  return (
    <Container
      className={className}
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Cursor
        position={position}
        direction={arrowDirection}
        active={arrowActive}
      />

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
