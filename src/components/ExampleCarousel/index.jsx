import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

import { breakpoint } from "~utils/css";

const ViewPort = styled.ul`
  --slide-spacing: 1rem;
  --slide-height: 428px;
  overflow: hidden;

  ${breakpoint(`tablet`)} {
    pointer-events: none;
    user-select: none;
  }}
`;

const Container = styled.div`
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const Slide = styled.div`
  flex: 0 0 auto;
  min-width: 0;
  padding-left: var(--slide-spacing);
  position: relative;

  figure {
    height: 100%;

    display: flex;
    flex-direction: column;
    > * + * {
      margin-top: 0.375rem;
    }
  }
`;

const EmblaCarousel = (props, ref) => {
  const { slides } = props;

  return (
    <ViewPort ref={ref}>
      <Container>
        {slides.map((image, index) => {
          if (!image) return null;

          const { width, height } = image.asset.gatsbyImageData;
          const widthRatio = width / height;

          return (
            <Slide key={image?._key}>
              <figure>
                <Image
                  css={css`
                    display: block;
                    height: var(--slide-height);
                    width: 100%;
                    object-fit: cover;

                    width: calc(${widthRatio} * 60.55vw);
                    height: 60.55vw;
                    ${breakpoint(`tablet`)} {
                      width: calc(${widthRatio} * 29.72vw);
                      height: 29.72vw;
                    }
                    ${breakpoint(`desktop`)} {
                      width: calc(${widthRatio} * var(--slide-height));
                      height: var(--slide-height);
                    }
                  `}
                  image={image}
                  alt="Your alt text"
                />
                <figcaption className="caption">
                  {index + 1}/{slides.length}
                </figcaption>
              </figure>
            </Slide>
          );
        })}
      </Container>
    </ViewPort>
  );
};

export default forwardRef(EmblaCarousel);
