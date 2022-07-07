/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.ul`
  position: relative;
  width: 100%;

  display: flex;
  gap: 0.375rem;

  padding-bottom: 1rem;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  ${breakpoint(`tablet`)} {
    padding-bottom: 0.75rem;
  }
`;

const Slide = styled.li`
  position: relative;
  height: 100%;

  scroll-snap-align: start;

  figure {
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
`;

const ImageCarousel = ({ images, className, loaded }) => {
  const ref = useRef();

  return (
    <Container className={className} ref={ref}>
      {loaded &&
        images.map((image, index) => (
          <Slide key={image?._key}>
            <figure>
              <Image
                image={image}
                css={css`
                  aspect-ratio: 1/1;
                  width: max-content;
                  height: 60.55vw;

                  user-drag: none;
                  pointer-events: none;
                  user-select: none;

                  ${breakpoint(`tablet`)} {
                    height: 29.72vw;
                  }
                `}
              />
              <figcaption className="caption">
                {index + 1}/{images.length}
              </figcaption>
            </figure>
          </Slide>
        ))}
    </Container>
  );
};

export default ImageCarousel;
