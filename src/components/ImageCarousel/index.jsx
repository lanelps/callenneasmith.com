import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";
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
    direction === `left` ? `w-resize` : `e-resize`};
  pointer-events: ${({ active }) => (active ? `auto` : `none`)};
  touch-action: none;

  /* Hide scrollbar for a cleaner look */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }

  ${breakpoint(`tablet`)} {
    grid-column: 4 / -1;
  }
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
`;

const SlidesNav = styled.nav`
  grid-column: 1 / -1;
  padding: 0.5rem;
  background-color: var(--color-white);
  user-select: none;
  pointer-events: ${({ active }) => (active ? `auto` : `none`)};

  ${breakpoint(`tablet`)} {
    grid-column: 4 / -1;
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

  // Create refs for each slide
  const slideRefs = useRef([]);

  // Ref to track if navigation is in progress
  const isNavigatingRef = useRef(false);

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

    const scrollLeft = carouselRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / size.width);

    if (newIndex !== activeSlideIndex) {
      setActiveSlideIndex(newIndex);
      setActiveExpand(allSlides[newIndex]?.projectId || null);
    }
  }, [activeSlideIndex, allSlides, size.width]);

  const handlePrev = () => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : allSlides.length - 1;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);

      // Scroll to the new slide
      if (slideRefs.current[newIndex]?.current) {
        slideRefs.current[newIndex].current.scrollIntoView();
      }

      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveSlideIndex((prevIndex) => {
      const newIndex = prevIndex < allSlides.length - 1 ? prevIndex + 1 : 0;
      isNavigatingRef.current = true;
      setActiveExpand(allSlides[newIndex].projectId);

      // Scroll to the new slide
      if (slideRefs.current[newIndex]?.current) {
        slideRefs.current[newIndex].current.scrollIntoView();
      }

      return newIndex;
    });
  };

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

  // Reset activeSlideIndex and activeExpand when allProjects changes
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
  }, [activeExpand, handlePrev, handleNext]);

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
      <Grid
        css={css`
          width: calc(100% + 1rem);
          transform: translateX(-0.5rem);
          height: 100%;

          ${breakpoint(`tablet`)} {
            width: calc(100% + 0.5rem);
            transform: unset;
          }
        `}
      >
        <CarouselWrapper
          className={className}
          ref={carouselRef}
          onMouseMove={handleMove}
          onClick={handleClick}
          onScroll={handleScroll}
          direction={cursorDirection}
          active={!!activeExpand}
        >
          {allSlides.map((slide, index) => (
            <Slide key={index} ref={slideRefs.current[index]}>
              {renderSlideContent(slide)}
            </Slide>
          ))}
        </CarouselWrapper>

        {allSlides.length > 0 && (
          <SlidesNav active={!!activeExpand}>
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
                {currentIndexWithinProject + 1}/{slidesInCurrentProject.length}
              </span>
            </button>
          </SlidesNav>
        )}
      </Grid>
    </Container>
  );
};

export default ImageCarousel;
