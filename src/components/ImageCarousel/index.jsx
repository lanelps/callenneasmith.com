/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useApp, useSize, usePrevNextButtons } from "~hooks";
import { Grid, Cursor, ExampleCarousel } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  position: relative;
  width: calc(100% + 1rem);
  height: 100%;
  transform: translateX(-0.5rem);

  pointer-events: auto;
  overflow: hidden;

  grid-column: 1 / -1;

  ${breakpoint(`tablet`)} {
    cursor: none;
    grid-column: 6 / -1;
    width: calc(100% + 0.5rem);
  }
`;

const ImageCarousel = ({ className, projects }) => {
  const carouselRef = useRef();

  const { activeExpand, setActiveExpand } = useApp();
  const size = useSize(carouselRef);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: `start`,
    containScroll: `trimSnaps`
  });

  const { onPrevButtonClick, onNextButtonClick, activeSlideIndex } =
    usePrevNextButtons(emblaApi);

  const [offsetX, setOffsetX] = useState(
    carouselRef?.current?.getBoundingClientRect()?.left
  );
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorDirection, setCursorDirection] = useState(`right`);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorSize = 16;

  const [images, setImages] = useState([]);

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
    if (!activeExpand) {
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
    if (activeExpand) {
      const project = projects.find((p) => p._id === activeExpand);
      setImages(project?.images);
    }
  }, [activeExpand]);

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        max-height: 100vh;

        display: ${activeExpand ? `flex` : `none`};
        flex-direction: column-reverse;
        justify-content: space-between;

        pointer-events: ${activeExpand ? `auto` : `none`};

        pointer-events: none;

        z-index: 50;

        ${breakpoint(`tablet`)} {
          flex-direction: column;
        }
      `}
    >
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

          <ExampleCarousel ref={emblaRef} slides={images || []} />
        </Container>
      </Grid>

      {images?.length > 0 && (
        <Grid>
          <nav
            css={css`
              width: 100%;
              padding: 0.5rem;
              background-color: var(--color-white);
              grid-column: 1 / -1;
              pointer-events: auto;

              ${breakpoint(`tablet`)} {
                grid-column: 4 / -1;
              }
            `}
          >
            <button
              onClick={() => setActiveExpand(null)}
              css={css`
                width: 100%;
                display: flex;
                justify-content: space-between;
              `}
            >
              <span>Close Overlay</span>
              <span>
                {activeSlideIndex + 1}/{images?.length}
              </span>
            </button>
          </nav>
        </Grid>
      )}
    </div>
  );
};

export default ImageCarousel;
