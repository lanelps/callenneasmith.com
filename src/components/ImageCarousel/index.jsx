/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

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
  height: 60.55vw;

  user-drag: none;
  pointer-events: none;
  user-select: none;
  overflow: hidden;

  ${breakpoint(`tablet`)} {
    height: 29.72vw;
  }
`;

const wheelGestures = WheelGesturesPlugin({ forceWheelAxis: `x` });

const ImageCarousel = ({ className, images, loaded, expandIsActive }) => {
  const carouselRef = useRef();
  const size = useSize(carouselRef);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: `start`,
      loop: false,
      slidesToScroll: 1
    },
    [wheelGestures]
  );

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

  const handleClick = () => {
    if (cursorDirection === `left`) {
      emblaApi.scrollPrev();
    }

    if (cursorDirection === `right`) {
      emblaApi.scrollNext();
    }
  };

  const handleEnter = () => {
    setCursorActive(true);
  };

  const handleLeave = () => {
    setCursorActive(false);
  };

  useEffect(() => {
    if (!expandIsActive) {
      setCursorActive(false);
    }
  }, [expandIsActive]);

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
      onClick={handleClick}
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
          embla={{
            api: emblaApi,
            ref: emblaRef
          }}
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
