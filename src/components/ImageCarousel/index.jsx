// ImageCarousel.jsx
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
import styled from "@emotion/styled";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useApp, useSize } from "~hooks";
import { Grid, Carousel, SlidesNavigation } from "~components";
import { breakpoint } from "~utils/css";

// Styled Components
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

  ${breakpoint("tablet")} {
    z-index: 50;
    flex-direction: column;
  }
`;

const GridStyled = styled(Grid)`
  width: calc(100% + 1rem);
  transform: translateX(-0.5rem);
  height: 100%;

  ${breakpoint("tablet")} {
    width: calc(100% + 0.5rem);
    transform: unset;
  }
`;

const ImageCarousel = ({ className }) => {
  const carouselRef = useRef();
  const { activeExpand, setActiveExpand, allProjects } = useApp();
  const size = useSize(carouselRef);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { isTablet } = useBreakpoint();
  const [cursorDirection, setCursorDirection] = useState("right");

  // Create refs for each slide
  const slideRefs = useRef([]);

  // Ref to track if navigation is in progress
  const isNavigatingRef = useRef(false);

  // Ref to track if scroll is programmatic
  const isProgrammaticScrollRef = useRef(false);

  // Combine all slides from allProjects
  const allSlides = useMemo(() => {
    return allProjects.flatMap((project) =>
      project.slides.map((slide) => ({ ...slide, projectId: project._id }))
    );
  }, [allProjects]);

  // Initialize refs for each slide
  useEffect(() => {
    slideRefs.current = allSlides.map(
      (_, i) => slideRefs.current[i] ?? React.createRef()
    );
  }, [allSlides]);

  // Determine the current project and the active slide's index within that project
  const { currentIndexWithinProject, slidesInCurrentProject } = useMemo(() => {
    let count = 0;
    for (const project of allProjects) {
      if (activeSlideIndex < count + project.slides.length) {
        return {
          currentIndexWithinProject: activeSlideIndex - count,
          slidesInCurrentProject: project.slides
        };
      }
      count += project.slides.length;
    }
    return {
      currentIndexWithinProject: 0,
      slidesInCurrentProject: []
    };
  }, [activeSlideIndex, allProjects]);

  // Update activeSlideIndex based on scroll position
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;

    if (isProgrammaticScrollRef.current) {
      // Reset the flag and skip navigation handling
      isProgrammaticScrollRef.current = false;
      return;
    }

    isNavigatingRef.current = true;

    const scrollLeft = carouselRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / size.width);

    if (newIndex !== activeSlideIndex) {
      setActiveSlideIndex(newIndex);
      setActiveExpand(allSlides[newIndex]?.projectId || null);
    }
  }, [activeSlideIndex, allSlides, size.width, setActiveExpand]);

  // Navigation Handlers
  const handlePrev = useCallback(() => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : allSlides.length - 1;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);

      // Indicate that the upcoming scroll is programmatic
      isProgrammaticScrollRef.current = true;
      if (slideRefs.current[newIndex]?.current) {
        slideRefs.current[newIndex].current.scrollIntoView();
      }

      return newIndex;
    });
  }, [allSlides, setActiveExpand]);

  const handleNext = useCallback(() => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex < allSlides.length - 1 ? prevIndex + 1 : 0;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);

      // Indicate that the upcoming scroll is programmatic
      isProgrammaticScrollRef.current = true;
      if (slideRefs.current[newIndex]?.current) {
        slideRefs.current[newIndex].current.scrollIntoView();
      }

      return newIndex;
    });
  }, [allSlides, setActiveExpand]);

  // Handle Mouse Move
  const handleMove = useCallback(
    (e) => {
      if (!carouselRef.current) return;
      const clientX = e.clientX;
      const { left: offsetX } = carouselRef.current.getBoundingClientRect();
      const halfWidth = size.width / 2;
      setCursorDirection(
        clientX > offsetX && clientX <= halfWidth + offsetX ? "left" : "right"
      );
    },
    [size.width]
  );

  // Handle Click
  const handleClick = useCallback(() => {
    if (!isTablet) return;
    cursorDirection === "left" ? handlePrev() : handleNext();
  }, [cursorDirection, handlePrev, handleNext, isTablet]);

  // Reset activeSlideIndex and activeExpand when allProjects changes
  useEffect(() => {
    setActiveSlideIndex(0);
    setActiveExpand(null);
    if (carouselRef.current) {
      carouselRef.current.scrollTo(0, 0);
    }
  }, [allProjects, setActiveExpand]);

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
        setActiveSlideIndex((prevIndex) => {
          if (prevIndex !== slideIndex) {
            // Indicate that the upcoming scroll is programmatic
            isProgrammaticScrollRef.current = true;
            if (slideRefs.current[slideIndex]?.current) {
              slideRefs.current[slideIndex].current.scrollIntoView();
            }
          }
          return slideIndex;
        });
      }
    }
  }, [activeExpand, allSlides]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeExpand) return; // Only navigate when overlay is active

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrev, handleNext]);

  return (
    <Container activeExpand={activeExpand} slidesLength={allSlides.length}>
      <GridStyled>
        <Carousel
          className={className}
          carouselRef={carouselRef}
          onMouseMove={handleMove}
          onClick={handleClick}
          onScroll={handleScroll}
          direction={cursorDirection}
          active={!!activeExpand}
          allSlides={allSlides}
          slideRefs={slideRefs}
        />

        {allSlides.length > 0 && (
          <SlidesNavigation
            active={!!activeExpand}
            onClose={() => setActiveExpand(null)}
            currentIndex={currentIndexWithinProject}
            totalSlides={slidesInCurrentProject.length}
          />
        )}
      </GridStyled>
    </Container>
  );
};

export default ImageCarousel;
