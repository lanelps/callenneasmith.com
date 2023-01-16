import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PortableText from "react-portable-text";
import SanityImage from "gatsby-plugin-sanity-image";
import { useInView } from "react-intersection-observer";

// import { Image } from "~components";
import { useApp } from "~hooks";

// import { sanityConfig } from "~utils/sanity";
import { breakpoint } from "~utils/css";

const Container = styled.div`
  padding: 0.5rem 0.75rem;
  // max-width: 1440px;
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
  width: 100%;
  max-width: 75vw;
  height: 100%;
  max-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ isActive }) => (isActive ? `1` : `0`)};
  transition: opacity 0.3s ease;

  ${breakpoint(`tablet`)} {
    width: auto;
    max-width: 50vw;
  }
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

  if (doucmentExists) {
    return createPortal(
      <HoverContainer
        isActive={isActive}
        onPointerDown={() => setIsActive(false)}
      >
        <HoverFigure background={background} isActive={isActive}>
          <SanityImage
            asset={image?.asset}
            alt={image?.altText}
            width={720}
            sizes="(max-width: 720px) 75vw, 50vw, 720px"
            css={css`
              display: block;
              height: auto;
              max-height: 100%;
              width: auto;
              max-width: 100%;
              ${background && `box-shadow: 0px 0px 30px 15px ${background};`}
            `}
          />
        </HoverFigure>
      </HoverContainer>,
      document.getElementById(`app-root`)
    );
  }

  return null;
};

const portableComponents = {
  normal: ({ children }) => <p className="h1">{children}</p>,
  hoverImage: (props) => {
    const { children, image, backgroundColour } = props;
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
          image={image}
          background={backgroundColour?.value?.hex}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </>
    );
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
      <PortableText content={introduction} serializers={portableComponents} />
    </Container>
  );
};

export default Intro;
