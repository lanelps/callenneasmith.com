/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

const Container = styled.ul`
  position: relative;
  width: 100%;
  height: 28rem;

  display: flex;
  gap: 6px;

  padding-bottom: 0.75rem;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

const Slide = styled.li`
  position: relative;
  height: 100%;

  scroll-snap-align: start;

  figure {
    height: 100%;

    display: flex;
    flex-direction: column;
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
                  width: auto;
                  height: 100%;
                  user-drag: none;
                  pointer-events: none;
                  user-select: none;
                `}
              />
              <figcaption>
                {index + 1}/{images.length}
              </figcaption>
            </figure>
          </Slide>
        ))}
    </Container>
  );
};

export default ImageCarousel;
