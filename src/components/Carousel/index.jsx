import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useEmblaCarousel from "embla-carousel-react";
import { v4 as uuidv4 } from "uuid";

/** ============================================================================
 * @css
 */
const Embla = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

const EmblaContainer = styled.ul`
  height: 100%;
  position: relative;
  display: flex;

  > * + * {
    margin-left: 6px;
  }
`;

const EmblaSlide = styled.li`
  position: relative;
  max-width: 100%;
  flex: 0 0 auto;
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
              key={uuidv4()}
              css={css`
                flex: 0 0 auto;
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
