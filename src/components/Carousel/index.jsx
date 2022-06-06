import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useEmblaCarousel from "embla-carousel-react";

/** ============================================================================
 * @css
 */
const Embla = styled.div`
  position: relative;
  overflow: visible;
  height: 100%;
`;

const EmblaContainer = styled.ul`
  height: 100%;
  position: relative;
  display: flex;
  gap: 6px;
`;

const EmblaSlide = styled.li`
  position: relative;
  height: 100%;
`;

/** ============================================================================
 * @component Core Embla carousel component
 * Accepts optional useEmblaCarousel object as embla = [ref, api], otherwise
 * initializes one of its own. Returns the current int to slide children.
 */
const Carousel = ({
  embla,
  className = ``,
  // slidesPerView = 1,
  spaceBetween = 0,
  slides = []
}) => {
  // --------------------------------------------------------------------------
  // context / ref / state

  const [current, setCurrent] = useState(0);
  const [defaultEmblaRef, defaultEmblaApi] = useEmblaCarousel({
    align: `start`,
    loop: false
  });

  // --------------------------------------------------------------------------
  // lifecycle

  useEffect(() => {
    if (!embla?.api && !defaultEmblaApi) {
      return;
    }

    if (embla?.api) {
      embla.api.on(`select`, () => setCurrent(embla.api.selectedScrollSnap()));
    } else {
      defaultEmblaApi.on(`select`, () =>
        setCurrent(defaultEmblaApi.selectedScrollSnap())
      );
    }
  }, [embla?.api, defaultEmblaApi]);

  // --------------------------------------------------------------------------
  // render

  if (!embla?.ref && !defaultEmblaRef) {
    return <></>;
  }

  return (
    <>
      <Embla
        ref={embla?.ref || defaultEmblaRef}
        className={`${className} embla`}
      >
        <EmblaContainer className="embla__container">
          {slides({ current }).map((slide) => (
            <EmblaSlide
              css={css`
                flex: 0 0 auto;
                margin-right: ${spaceBetween}px;
              `}
              className="embla__slide"
            >
              {slide}
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </Embla>
    </>
  );
};

export default Carousel;
