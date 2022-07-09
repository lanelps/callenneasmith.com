/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Cursor, Carousel } from "~components";
import { useSize } from "~hooks";

import { breakpoint } from "~utils/css";

const Container = styled.ul`
  position: relative;
  width: 100%;

  padding-bottom: 1rem;

  cursor: none;

  ${breakpoint(`tablet`)} {
    padding-bottom: 0.75rem;
  }
`;

const Slide = styled.div`
  position: relative;
  height: 100%;

  figure {
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
`;

const SlideImg = styled(Image)`
  aspect-ratio: 1/1;
  width: max-content;
  height: 60.55vw;

  user-drag: none;
  pointer-events: none;
  user-select: none;

  ${breakpoint(`tablet`)} {
    height: 29.72vw;
  }
`;

const ImageCarousel = ({ className, images, loaded }) => {
  const carouselRef = useRef();
  const size = useSize(carouselRef);

  const [offsetX, setOffsetX] = useState(
    carouselRef?.current?.getBoundingClientRect()?.left
  );
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorDirection, setCursorDirection] = useState(`right`);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const cursorSize = 16;

  const direction = (e) => {
    if (e.clientX > 0 + offsetX && e.clientX <= size.width / 2 + offsetX) {
      setCursorDirection(`left`);
    }

    if (
      e.clientX > size.width / 2 + offsetX &&
      e.clientX <= size.width + offsetX
    ) {
      setCursorDirection(`right`);
    }
  };

  const handleMove = (e) => {
    if (!cursorActive) return;

    direction(e);

    setCursorPosition({
      x: e.clientX - cursorSize / 2,
      y: e.clientY - cursorSize / 2
    });
  };

  const handleEnter = () => {
    setCursorActive(true);
  };

  const handleLeave = () => {
    setCursorActive(false);
  };

  useEffect(() => {
    setOffsetX(carouselRef?.current?.getBoundingClientRect()?.left);
  }, [size]);

  return (
    <Container
      className={className}
      ref={carouselRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Cursor
        width={cursorSize}
        height={cursorSize}
        position={cursorPosition}
        direction={cursorDirection}
        active={cursorActive}
      />

      {loaded && (
        <Carousel
          slides={() =>
            images.map((image, index) => (
              <Slide key={image?._key}>
                <figure>
                  <SlideImg image={image} />
                  <figcaption className="caption">
                    {index + 1}/{images.length}
                  </figcaption>
                </figure>
              </Slide>
            ))
          }
        />
      )}
    </Container>
  );
};

export default ImageCarousel;
