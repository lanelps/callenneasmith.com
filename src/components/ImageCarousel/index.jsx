/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

const Container = styled.article`
  position: relative;
  width: 100%;
  height: 428px;

  display: flex;
  gap: 6px;

  padding-bottom: 1rem;

  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

const Slide = styled.figure`
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;

  scroll-snap-align: start;
`;

const ImageCarousel = ({ images, className }) => {
  const ref = useRef();

  return (
    <Container className={className} ref={ref}>
      {images.map((image, index) => (
        <Slide key={image?._id}>
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
        </Slide>
      ))}
    </Container>
  );
};

export default ImageCarousel;
