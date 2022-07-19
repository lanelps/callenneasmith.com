/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";

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
    > * + * {
      margin-top: 0.375rem;
    }
  }
`;

const ImageCarousel = ({ className, images, loaded, expandIsActive }) => {
  const carouselRef = useRef();
  const size = useSize(carouselRef);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: `start`,
    loop: false,
    slidesToScroll: 1
  });

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

  const preventEdgeScrolling = (embla) => {
    const { limit, target, location, scrollTo } = embla.internalEngine();
    console.log(`target`, target.get());

    return () => {
      if (limit.reachedMax(target.get())) {
        console.log(`reached Max`);
        if (limit.reachedMax(location.get())) location.set(limit.max);
        target.set(limit.max);
        scrollTo.distance(0, false);
      }
      if (limit.reachedMin(target.get())) {
        console.log(`reached Min`);
        if (limit.reachedMin(location.get())) location.set(limit.min);
        target.set(limit.min);
        scrollTo.distance(0, false);
      }
    };
  };

  useEffect(() => {
    if (!expandIsActive) {
      setCursorActive(false);
    }
  }, [expandIsActive]);

  useEffect(() => {
    setOffsetX(carouselRef?.current?.getBoundingClientRect()?.left);
  }, [size]);

  useEffect(() => {
    if (!loaded) return;

    emblaApi.reInit();
  }, [loaded]);

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

      <Carousel
        embla={{
          api: emblaApi,
          ref: emblaRef
        }}
        slides={() =>
          (loaded &&
            images.map((image, index) => {
              const { width, height } = image?.asset?.gatsbyImageData;
              const widthRatio = width / height;

              return (
                <Slide key={image?._key}>
                  <figure>
                    <Image
                      image={image}
                      css={css`
                        width: calc(${widthRatio} * 60.55vw);
                        height: 60.55vw;
                        ${breakpoint(`tablet`)} {
                          width: calc(${widthRatio} * 29.72vw);
                          height: 29.72vw;
                        }
                      `}
                    />
                    <figcaption className="caption">
                      {index + 1}/{images.length}
                    </figcaption>
                  </figure>
                </Slide>
              );
            })) ||
          []
        }
      />
    </Container>
  );
};

export default ImageCarousel;
