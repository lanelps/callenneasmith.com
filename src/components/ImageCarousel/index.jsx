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
    ${({ active }) => (active ? `cursor: none;` : `pointer-events: none;`)}
    grid-column: 5 / -1;
    width: calc(100% + 0.5rem);
    transform: translateX(0rem);
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
    if (activeExpand && images?.length > 0) {
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

        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;

        opacity: ${activeExpand && images?.length > 0 ? 1 : 0};
        pointer-events: none;

        transition: opacity 0.3s ease-in-out;

        z-index: 101;

        ${breakpoint(`tablet`)} {
          flex-direction: column;
          z-index: 50;
        }
      `}
    >
      <Grid
        css={css`
          height: 100%;
          overflow: hidden;
        `}
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

        <Container
          className={className}
          ref={carouselRef}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseOut={handleOut}
          onClick={handleClick}
          active={activeExpand && images?.length > 0}
        >
          <ExampleCarousel ref={emblaRef} slides={images || []} />
        </Container>
      </Grid>

      {images?.length > 0 && (
        <Grid>
          <nav
            css={css`
              grid-column: 1 / -1;
              width: calc(100% + 1rem);
              transform: translateX(-0.5rem);

              padding: 0.5rem;

              background-color: var(--color-white);
              pointer-events: auto;

              ${breakpoint(`tablet`)} {
                grid-column: 4 / -1;
                width: calc(100% + 0.5rem);
                transform: translateX(0);

                padding-right: 1rem;
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
