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

const Container = styled.div`
  padding: 0.5rem 0.75rem;
  height: 25vw;

  overflow: hidden;
`;

const HoverFigure = styled.figure`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ background }) =>
    background && `box-shadow: 0px 0px 30px 15px ${background};`}

  opacity: ${({ isActive }) => (isActive ? `1` : `0`)};
  transition: opacity 0.3s ease;

  pointer-events: none;
`;

const HoverImage = ({ background, image, isActive }) => {
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
    { maxWidth: 1920 },
    sanityConfig
  );

  if (doucmentExists) {
    return createPortal(
      <HoverFigure background={background} isActive={isActive}>
        <Image image={imageSrc} css={css``} />
      </HoverFigure>,
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
              cursor: pointer;
            `}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
          >
            {children}
          </span>

          <HoverImage
            image={value?.image}
            background={value?.backgroundColour?.value?.hex}
            isActive={isActive}
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
