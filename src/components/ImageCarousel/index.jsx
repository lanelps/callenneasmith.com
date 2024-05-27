/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useApp, useSize, usePrevNextButtons } from "~hooks";
import { Grid, ExampleCarousel } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  opacity: ${({ activeExpand, slidesLength }) =>
    activeExpand && slidesLength > 0 ? 1 : 0};
  pointer-events: none;

  z-index: 101;

  ${breakpoint(`tablet`)} {
    z-index: 50;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: calc(100% + 1rem);
  height: 100%;
  transform: translateX(-0.5rem);

  ${({ active }) =>
    active ? `pointer-events: auto;` : `pointer-events: none;`}
  overflow: hidden;

  grid-column: 1 / -1;

  ${breakpoint(`tablet`)} {
    ${({ active, direction }) => {
      if (active) {
        if (direction === `left`) {
          return `cursor: w-resize;`;
        } else {
          return `cursor: e-resize;`;
        }
      }
    }}
    grid-column: 4 / -1;
    width: calc(100% + 0.5rem);
    transform: translateX(0rem);
  }
`;

const SlidesNav = styled.nav`
  grid-column: 1 / -1;
  width: calc(100% + 1rem);
  transform: translateX(-0.5rem);

  padding: 0.5rem;

  background-color: var(--color-white);

  user-select: none;

  ${breakpoint(`tablet`)} {
    grid-column: 4 / -1;
    width: calc(100% + 0.5rem);
    transform: translateX(0);

    padding-right: 1rem;
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

  const {
    onPrevButtonClick,
    onNextButtonClick,
    activeSlideIndex,
    setActiveSlideIndex
  } = usePrevNextButtons(emblaApi);

  const [offsetX, setOffsetX] = useState(
    carouselRef?.current?.getBoundingClientRect()?.left
  );
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorDirection, setCursorDirection] = useState(`right`);

  const [slides, setSlides] = useState([]);

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
    if (activeExpand && slides?.length > 0) {
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
      setSlides(project?.slides || []);
    } else {
      setSlides([]);
    }

    setActiveSlideIndex(0);
  }, [activeExpand]);

  return (
    <Container activeExpand={activeExpand} slidesLength={slides?.length}>
      <Grid
        css={css`
          height: 100%;
          overflow: hidden;
        `}
      >
        <CarouselWrapper
          className={className}
          ref={carouselRef}
          onMouseMove={handleMove}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onMouseOut={handleOut}
          onClick={handleClick}
          active={activeExpand && slides?.length > 0}
          direction={cursorDirection}
        >
          <ExampleCarousel ref={emblaRef} slides={slides || []} />
        </CarouselWrapper>
      </Grid>

      {slides?.length > 0 && (
        <Grid
          css={css`
            pointer-events: ${!activeExpand ? `none` : `auto`};
          `}
        >
          <SlidesNav>
            <button
              onClick={() => setActiveExpand(null)}
              css={css`
                width: 100%;
                display: flex;
                justify-content: space-between;
              `}
              className="b1"
            >
              <span>Close Overlay</span>
              <span>
                {activeSlideIndex + 1}/{slides?.length}
              </span>
            </button>
          </SlidesNav>
        </Grid>
      )}
    </Container>
  );
};

export default ImageCarousel;
