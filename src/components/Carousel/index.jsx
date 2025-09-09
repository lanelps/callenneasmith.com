// Carousel.jsx
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { SlideContent } from "~components";
import { breakpoint } from "~utils/css";
import useApp from "~hooks/useApp";

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
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  cursor: none;

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
}) => {
  const { setCursorPosition, setCursorVisible, setCursorDirection } = useApp();

  useEffect(() => {
    setCursorDirection(direction);
  }, [direction, setCursorDirection]);

  const handleMouseEnter = () => {
    setCursorVisible(true);
    setCursorDirection(direction);
  };

  const handleMouseMove = (e) => {
    onMouseMove(e);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  return (
    <CarouselWrapper
      className={className}
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
};

export default Carousel;
