import React, { useRef, useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useApp, useSize } from "~hooks";
import { Grid, Image, Video } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  opacity: ${({ activeExpand, slidesLength }) =>
    activeExpand && slidesLength > 0 ? 1 : 0};
  pointer-events: none;
  z-index: 101;
  overflow: hidden;

  ${breakpoint(`tablet`)} {
    z-index: 50;
    flex-direction: column;
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  transition: transform 0.3s ease-in-out;
  cursor: ${({ direction }) =>
    direction === `left` ? `w-resize` : `e-resize`};
  pointer-events: ${({ active }) => (active ? `auto` : `none`)};
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

const SlidesNav = styled.nav`
  grid-column: 1 / -1;
  width: calc(100% + 1rem);
  transform: translateX(-0.5rem);
  padding: 0.5rem;
  background-color: var(--color-white);
  user-select: none;

  ${breakpoint(`tablet`)} {
    padding-right: 1rem;
  }
`;

const ImageCarousel = ({ className }) => {
  const carouselRef = useRef();
  const { activeExpand, setActiveExpand, allProjects } = useApp();
  const size = useSize(carouselRef);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { isTablet } = useBreakpoint();
  const [cursorDirection, setCursorDirection] = useState(`right`);

  // Ref to track if navigation is in progress
  const isNavigatingRef = useRef(false);

  // Combine all slides from allProjects
  const allSlides = useMemo(() => {
    return allProjects.flatMap((project) =>
      project.slides.map((slide) => ({ ...slide, projectId: project._id }))
    );
  }, [allProjects]);

  useEffect(() => {
    setActiveSlideIndex(0);
    setActiveExpand(null);
  }, [allProjects]);

  // Update activeSlideIndex when activeExpand changes
  useEffect(() => {
    // If navigation is in progress, skip this effect
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }

    if (activeExpand) {
      const slideIndex = allSlides.findIndex(
        (slide) => slide.projectId === activeExpand
      );
      if (slideIndex !== -1) {
        setActiveSlideIndex(slideIndex);
      }
    }
  }, [activeExpand, allSlides]);

  // Handle Previous Slide
  const handlePrev = () => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : allSlides.length - 1;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);
      return newIndex;
    });
  };

  // Handle Next Slide
  const handleNext = () => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex < allSlides.length - 1 ? prevIndex + 1 : 0;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);
      return newIndex;
    });
  };

  useEffect(() => {
    if (carouselRef.current) {
      const offset = activeSlideIndex * size.width;
      carouselRef.current.scrollTo({
        left: offset
      });
    }
  }, [activeSlideIndex, size.width]);

  const handleMove = (e) => {
    if (!carouselRef.current) return;
    const clientX = e.clientX;
    const { left: offsetX } = carouselRef.current.getBoundingClientRect();
    const halfWidth = size.width / 2;
    setCursorDirection(
      clientX > offsetX && clientX <= halfWidth + offsetX ? "left" : "right"
    );
  };

  const handleClick = () => {
    if (!isTablet) return;
    cursorDirection === "left" ? handlePrev() : handleNext();
  };

  // Handle touch events for swipe functionality
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) {
      handleNext();
    } else if (delta < -50) {
      handlePrev();
    }
  };

  const renderSlideContent = (slide) => {
    if (slide?._type === `cloudinary.asset`) {
      return (
        <Video
          css={css`
            width: 100%;
            height: 100%;
          `}
          videoStyle={{
            objectPosition: `top right`,
            objectFit: `contain`
          }}
          publicId={slide?.public_id}
        />
      );
    } else {
      return (
        <Image
          css={css`
            width: 100%;
            height: 100%;
          `}
          image={slide}
          imgStyle={{ objectPosition: `top right`, objectFit: `contain` }}
          alt={slide?.altText}
          contain
        />
      );
    }
  };

  return (
    <Container activeExpand={activeExpand} slidesLength={allSlides.length}>
      <CarouselWrapper
        className={className}
        ref={carouselRef}
        onMouseMove={handleMove}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        direction={cursorDirection}
        active={!!activeExpand}
      >
        {allSlides.map((slide, index) => (
          <Slide key={index}>{renderSlideContent(slide)}</Slide>
        ))}
      </CarouselWrapper>

      {allSlides.length > 0 && (
        <Grid
          css={css`
            pointer-events: ${!activeExpand ? "none" : "auto"};
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
              className="h1"
            >
              <span>Close Overlay</span>
              <span>
                {activeSlideIndex + 1}/{allSlides.length}
              </span>
            </button>
          </SlidesNav>
        </Grid>
      )}
    </Container>
  );
};

export default ImageCarousel;
