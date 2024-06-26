import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Image, Video } from "~components";

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
`;

const EmblaCarousel = (props, ref) => {
  const { slides } = props;

  return (
    <ViewPort ref={ref}>
      <Container>
        {slides.map((slide) => {
          if (!slide) return null;

          if (slide?._type === `cloudinary.asset`) {
            return (
              <Slide key={slide?._key}>
                <Video
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                  videoStyle={{ objectPosition: `top right` }}
                  publicId={slide?.public_id}
                />
              </Slide>
            );
          } else {
            return (
              <Slide key={slide?._key}>
                <Image
                  css={css`
                    width: 100%;
                    height: 100%;
                  `}
                  image={slide}
                  imgStyle={{ objectPosition: `top right` }}
                  alt={slide?.altText}
                  contain
                />
              </Slide>
            );
          }
        })}
      </Container>
    </ViewPort>
  );
};

export default forwardRef(EmblaCarousel);
