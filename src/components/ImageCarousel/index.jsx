/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

const Container = styled.ul`
  position: relative;
  width: 100%;
  height: 428px;

  display: flex;
  gap: 6px;

  padding-bottom: 1rem;

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

const ImageCarousel = ({ images, className, isActive }) => {
  const ref = useRef();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (isActive && !loadedRef.current) {
      loadedRef.current = true;
    }
  }, [isActive]);

  useEffect(() => {
    console.log(`loadedRef`, loadedRef.current);
  }, [loadedRef?.current]);

  return (
    <Container className={className} ref={ref}>
      {loadedRef?.current &&
        images.map((image, index) => (
          <Slide key={image?._key}>
            <figure>
              <Image
                image={image}
                css={css`
                  aspect-ratio: 1/1;
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
