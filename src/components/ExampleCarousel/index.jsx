import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image } from "~components";

import { breakpoint } from "~utils/css";

const ViewPort = styled.ul`
  --slide-spacing: 0.25rem;
  height: 100%;
  overflow: hidden;

  ${breakpoint(`tablet`)} {
    pointer-events: none;
    user-select: none;
  }}
`;

const Container = styled.div`
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  touch-action: pan-y;
  margin-left: calc(var(--slide-spacing) * -1);
`;

const Slide = styled.div`
  flex-shrink: 0;
  width: 100%;
  min-width: 0;
  padding-left: var(--slide-spacing);
  position: relative;
  height: 100%;

  figure {
    width: 100%;
    height: auto;

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

          return (
            <Slide key={image?._key}>
              <Image
                css={css`
                  height: 100%;
                  width: 100%;
                `}
                image={image}
                alt="Your alt text"
                contain
              />
            </Slide>
          );
        })}
      </Container>
    </ViewPort>
  );
};

export default forwardRef(EmblaCarousel);
