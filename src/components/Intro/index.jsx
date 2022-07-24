import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PortableText } from "@portabletext/react";
import { getGatsbyImageData } from "gatsby-source-sanity";
import { useInView } from "react-intersection-observer";

import { Image } from "~components";
import { useApp } from "~hooks";

import { sanityConfig } from "~utils/sanity";
import { breakpoint } from "~utils/css";

const Container = styled.div`
  padding: 0.5rem 0.75rem;
  max-width: 1440px;
  min-height: 107.2vw;

  margin: 0 auto;

  overflow: hidden;

  ${breakpoint(`large-mobile`)} {
    min-height: 50vw;
  }

  ${breakpoint(`large-tablet`)} {
    min-height: 25vw;
  }
`;

const HoverContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  padding: 4rem 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ isActive }) =>
    isActive ? `rgba(0,0,0,0.4)` : `rgba(0,0,0,0)`};

  transition: background-color 0.3s ease;

  pointer-events: ${({ isActive }) => (isActive ? `auto` : `none`)};
  cursor: pointer;
  z-index: 100;

  ${breakpoint(`tablet`)} {
    pointer-events: none;
  }
`;

const HoverFigure = styled.figure`
  position: relative;
  width: max-content;
  max-width: 50vw;
  height: 100%;
  max-height: 100%;

  opacity: ${({ isActive }) => (isActive ? `1` : `0`)};
  transition: opacity 0.3s ease;
`;

const HoverImage = ({ background, image, isActive, setIsActive }) => {
  const [doucmentExists, setDocumentExists] = useState(false);

  useEffect(() => {
    const DOCUMENT_MAIN =
      typeof document !== `undefined`
        ? document.getElementById(`app-root`)
        : null;

    if (!DOCUMENT_MAIN) return null;

    setDocumentExists(true);
  }, []);

  const imageSrc = getGatsbyImageData(
    image.asset._id,
    { maxWidth: 1440 },
    sanityConfig
  );

  if (doucmentExists) {
    return createPortal(
      <HoverContainer
        isActive={isActive}
        onPointerDown={() => setIsActive(false)}
      >
        <HoverFigure background={background} isActive={isActive}>
          <Image
            image={imageSrc}
            css={css`
              height: 100%;
              ${background && `box-shadow: 0px 0px 30px 15px ${background};`}

              > div:first-child {
                height: 100%;
              }
            `}
            imgStyle={{ width: `auto`, height: `aut0`, maxHeight: `100%` }}
            contain
          />
        </HoverFigure>
      </HoverContainer>,
      document.getElementById(`app-root`)
    );
  }

  return null;
};

const portableComponents = {
  block: {
    normal: ({ children }) => <p className="h1">{children}</p>
  },
  marks: {
    hoverImage: ({ children, value }) => {
      const [isActive, setIsActive] = useState(false);

      return (
        <>
          <span
            className="h1"
            css={css`
              color: var(--color-off-black);
            `}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onPointerDown={() => setIsActive(true)}
          >
            {children}
          </span>

          <HoverImage
            image={value?.image}
            background={value?.backgroundColour?.value?.hex}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </>
      );
    }
  }
};

const Intro = ({ introduction }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { setIntroInView } = useApp();

  useEffect(() => {
    setIntroInView(inView);
  }, [inView]);

  return (
    <Container ref={ref}>
      <PortableText value={introduction} components={portableComponents} />
    </Container>
  );
};

export default Intro;
