/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { Grid, Cursor, ExampleCarousel } from "~components";
import { useSize, usePrevNextButtons } from "~hooks";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  pointer-events: auto;
  overflow: hidden;

  grid-column: 6 / -1;

  ${breakpoint(`tablet`)} {
    cursor: none;
  }
`;

const ImageCarousel = ({ className, images, loaded, expandIsActive }) => {
  const carouselRef = useRef();
  const size = useSize(carouselRef);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: `start`,
    containScroll: `trimSnaps`
  });

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const [offsetX, setOffsetX] = useState(
    carouselRef?.current?.getBoundingClientRect()?.left
  );
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorDirection, setCursorDirection] = useState(`right`);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorSize = 16;

  const { isTablet } = useBreakpoint();

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
    if (!isTablet) return;

    if (cursorDirection === `left`) {
      onPrevButtonClick();
    }

    if (cursorDirection === `right`) {
      onNextButtonClick();
    }
  };

  const handleEnter = () => {
    if (!expandIsActive) {
      setCursorActive(false);
    } else {
      setCursorActive(true);
    }
  };

  const handleLeave = () => {
    setCursorActive(false);
  };

  const handleOut = () => {
    setCursorActive(false);
  };

  useEffect(() => {
    setOffsetX(carouselRef?.current?.getBoundingClientRect()?.left);
  }, [size]);

  useEffect(() => {
    if (!loaded) return;

    emblaApi.reInit();
  }, [loaded]);

  return (
    <>
      <Grid
        css={css`
          height: 100%;
          overflow: hidden;
        `}
      >
        <Container
          className={className}
          ref={carouselRef}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseOut={handleOut}
          onClick={handleClick}
        >
          {isTablet && (
            <Cursor
              width={cursorSize}
              height={cursorSize}
              position={cursorPosition}
              direction={cursorDirection}
              active={cursorActive}
            />
          )}

          <ExampleCarousel ref={emblaRef} slides={(loaded && images) || []} />
        </Container>
      </Grid>

      <Grid>
        <nav
          css={css`
            width: 100%;
            padding: 0.5rem;
            background-color: var(--color-white);
            grid-column: 4 / -1;
            pointer-events: auto;
          `}
        >
          <button>Close Overlay</button>
        </nav>
      </Grid>
    </>
  );
};

export default ImageCarousel;
