// Carousel.jsx
import React from "react";
import styled from "@emotion/styled";
import { SlideContent } from "~components";
import { breakpoint } from "~utils/css";

const CarouselWrapper = styled.div`
  grid-column: 1 / -1;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  display: flex;
  transition: transform 0.3s ease-in-out;
  cursor: ${({ direction }) =>
    direction === "left" ? "w-resize" : "e-resize"};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  touch-action: none;

  /* Hide scrollbar for a cleaner look */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  ${breakpoint("tablet")} {
    grid-column: 4 / -1;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
`;

const Carousel = ({
  className,
  carouselRef,
  onMouseMove,
  onClick,
  onScroll,
  direction,
  active,
  allSlides,
  slideRefs
}) => (
  <CarouselWrapper
    className={className}
    ref={carouselRef}
    onMouseMove={onMouseMove}
    onClick={onClick}
    onScroll={onScroll}
    direction={direction}
    active={active}
  >
    {allSlides.map((slide, index) => (
      <Slide key={slide.projectId + index} ref={slideRefs.current[index]}>
        <SlideContent slide={slide} />
      </Slide>
    ))}
  </CarouselWrapper>
);

export default Carousel;
