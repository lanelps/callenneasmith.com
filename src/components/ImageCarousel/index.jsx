// ImageCarousel.jsx
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { useApp, useSize } from "~hooks";
import { Grid, Carousel, SlidesNavigation } from "~components";
import { breakpoint } from "~utils/css";

// -----------------------------
// Styled Components
// -----------------------------

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

// -----------------------------
// Constants
// -----------------------------

const DIRECTION_LEFT = "left";
const DIRECTION_RIGHT = "right";

// -----------------------------
// ImageCarousel Component
// -----------------------------

const ImageCarousel = ({ className }) => {
  // -----------------------------
  // Refs
  // -----------------------------

  const carouselRef = useRef(null); // Reference to the carousel container
  const slideRefs = useRef([]); // References to each slide
  const isProgrammaticScrollRef = useRef(false); // Flag to differentiate scroll types
  const isInternalChangeRef = useRef(false); // Flag to track internal vs external changes
  const scrollTimer = useRef(null);

  // -----------------------------
  // Hooks
  // -----------------------------

  const { activeExpand, setActiveExpand, allProjects } = useApp(); // Custom hook for app state
  const size = useSize(carouselRef); // Custom hook to get carousel size
  const { isTablet } = useBreakpoint(); // Determines if the viewport is tablet size

  // -----------------------------
  // State Variables
  // -----------------------------

  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Current active slide index
  const [cursorDirection, setCursorDirection] = useState(DIRECTION_RIGHT); // Direction based on cursor position

  // -----------------------------
  // Derived Data
  // -----------------------------

  // Flatten all slides from all projects
  const allSlides = useMemo(() => {
    return allProjects.flatMap((project) =>
      project.slides.map((slide) => ({
        ...slide,
        projectId: project._id
      }))
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

  // -----------------------------
  // Event Handlers
  // -----------------------------

  /**
   * Handles scroll events on the carousel.
   * Updates the active slide index based on scroll position.
   */
  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;

    if (isProgrammaticScrollRef.current) {
      isProgrammaticScrollRef.current = false;
      return;
    }

    const scrollLeft = carouselRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / size.width);

    isInternalChangeRef.current = true;

    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }
    scrollTimer.current = setTimeout(() => {
      isInternalChangeRef.current = false;
    }, 50);

    if (
      newIndex !== activeSlideIndex &&
      newIndex >= 0 &&
      newIndex < allSlides.length
    ) {
      setActiveSlideIndex(newIndex);

      // Update activeExpand only if crossing into a new project
      const currentProjectId = allSlides[activeSlideIndex]?.projectId;
      const newProjectId = allSlides[newIndex]?.projectId;

      if (newProjectId !== currentProjectId) {
        setActiveExpand(newProjectId || null);
      }
    }
  }, [activeSlideIndex, allSlides, size.width, setActiveExpand]);

  /**
   * Navigates to the previous slide.
   */
  const handlePrev = useCallback(() => {
    const newIndex =
      activeSlideIndex > 0 ? activeSlideIndex - 1 : allSlides.length - 1;
    isInternalChangeRef.current = true; // Mark the change as internal
    setActiveSlideIndex(newIndex);
    setActiveExpand(allSlides[newIndex]?.projectId || null);

    if (slideRefs.current[newIndex]?.current) {
      isProgrammaticScrollRef.current = true;
      slideRefs.current[newIndex].current.scrollIntoView();
    }
  }, [activeSlideIndex, allSlides, setActiveExpand]);

  const handleNext = useCallback(() => {
    const newIndex =
      activeSlideIndex < allSlides.length - 1 ? activeSlideIndex + 1 : 0;
    isInternalChangeRef.current = true; // Mark the change as internal
    setActiveSlideIndex(newIndex);
    setActiveExpand(allSlides[newIndex]?.projectId || null);

    if (slideRefs.current[newIndex]?.current) {
      isProgrammaticScrollRef.current = true;
      slideRefs.current[newIndex].current.scrollIntoView();
    }
  }, [activeSlideIndex, allSlides, setActiveExpand]);

  /**
   * Handles mouse movement over the carousel to determine cursor direction.
   * @param {MouseEvent} e - The mouse event.
   */
  const handleMouseMove = useCallback((e) => {
    if (!carouselRef.current) return;

    const clientX = e.clientX;
    const { left: offsetX, width } =
      carouselRef.current.getBoundingClientRect();
    const halfWidth = width / 2;

    const direction =
      clientX > offsetX && clientX <= offsetX + halfWidth
        ? DIRECTION_LEFT
        : DIRECTION_RIGHT;

    setCursorDirection(direction);
  }, []);

  /**
   * Handles click events on the carousel to navigate slides based on cursor direction.
   */
  const handleClick = useCallback(() => {
    if (!isTablet) return;

    if (cursorDirection === DIRECTION_LEFT) {
      handlePrev();
    } else {
      handleNext();
    }
  }, [cursorDirection, handlePrev, handleNext, isTablet]);

  // -----------------------------
  // Effects
  // -----------------------------

  /**
   * Resets the active slide index and expansion when allProjects change.
   */
  useEffect(() => {
    if (!allProjects.length) return; // Avoid unnecessary resets
    isInternalChangeRef.current = true;
    setActiveSlideIndex(0);
    setActiveExpand(null);

    if (carouselRef.current) {
      isProgrammaticScrollRef.current = true;
      carouselRef.current.scrollTo({ left: 0 });
    }
  }, [allProjects, setActiveExpand]);

  /**
   * Updates the active slide index when activeExpand changes externally.
   */
  useEffect(() => {
    if (isInternalChangeRef.current) {
      isInternalChangeRef.current = false; // Ignore internal changes
      return;
    }

    if (activeExpand) {
      const firstSlideIndex = allSlides.findIndex(
        (slide) => slide.projectId === activeExpand
      );

      if (firstSlideIndex !== -1 && firstSlideIndex !== activeSlideIndex) {
        isProgrammaticScrollRef.current = true;
        setActiveSlideIndex(firstSlideIndex);

        if (slideRefs.current[firstSlideIndex]?.current) {
          slideRefs.current[firstSlideIndex].current.scrollIntoView();
        }
      }
    }
  }, [activeExpand, allSlides, activeSlideIndex]);

  /**
   * Adds keyboard navigation event listeners.
   */
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

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeExpand, handlePrev, handleNext]);

  // -----------------------------
  // Render
  // -----------------------------

  return (
    <Container activeExpand={activeExpand} slidesLength={allSlides.length}>
      <GridStyled>
        {/* Carousel Component */}
        <Carousel
          className={className}
          carouselRef={carouselRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onScroll={handleScroll}
          direction={cursorDirection}
          active={!!activeExpand}
          allSlides={allSlides}
          slideRefs={slideRefs}
        />

        {/* Slides Navigation Component */}
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

// -----------------------------
// PropTypes
// -----------------------------

ImageCarousel.propTypes = {
  className: PropTypes.string
};

export default ImageCarousel;
