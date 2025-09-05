import React, { useState, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PortableText from "react-portable-text";
import SanityImage from "gatsby-plugin-sanity-image";
import { useInView } from "react-intersection-observer";

import { useApp } from "~hooks";
import { Grid, Go, Video } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  min-height: 107.2vw;

  margin: 0 auto;
  padding: 0.25rem 0.5rem;
  color: var(--color-light-grey);

  overflow: hidden;

  ${breakpoint(`large-mobile`)} {
    min-height: 50vw;
  }

  ${breakpoint(`large-tablet`)} {
    min-height: 25vw;
  }
`;

const NavItem = styled(Grid)`
  padding: 0 !important;

  & > h4 {
    grid-column: 2 / -1;

    ${breakpoint(`tablet`)} {
      grid-column: 2 / span 1;
    }
  }

  & > div {
    grid-column: 2 / -1;

    ${breakpoint(`tablet`)} {
      grid-column: 3 / -1;
    }
  }
`;

const NavHeading = styled.h4`
  opacity: 0.8;
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

  display: ${({ isActive }) => (isActive ? `flex` : `none`)};
  align-items: center;
  justify-content: center;

  transition: background-color 0.3s ease;

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

  ${breakpoint(`tablet`)} {
    width: auto;
    max-width: 50vw;
  }
`;

const HoverMedia = memo(({ src, isActive, setIsActive, type }) => {
  const [documentExists, setDocumentExists] = useState(false);

  useEffect(() => {
    const DOCUMENT_MAIN =
      typeof document !== `undefined`
        ? document.getElementById(`app-root`)
        : null;

    if (!DOCUMENT_MAIN) return null;

    setDocumentExists(true);
  }, []);

  if (documentExists) {
    return createPortal(
      <HoverContainer
        isActive={isActive}
        onPointerDown={() => setIsActive(false)}
      >
        <HoverFigure>
          {type === `video` ? (
            <Video
              css={css`
                display: block;
                height: auto;
                max-height: 100%;
                width: auto;
                max-width: 100%;
              `}
              videoStyle={{ objectPosition: `top right` }}
              playbackId={src?.asset?.playbackId}
            />
          ) : (
            <SanityImage
              asset={src?.asset}
              alt={src?.altText || ``}
              width={720}
              sizes="(max-width: 720px) 75vw, 50vw, 720px"
              css={css`
                display: block;
                height: auto;
                max-height: 100%;
                width: auto;
                max-width: 100%;
              `}
            />
          )}
        </HoverFigure>
      </HoverContainer>,
      document.getElementById(`app-root`)
    );
  }

  return null;
});

const portableComponents = {
  normal: ({ children }) => <p>{children}</p>,
  hoverImage: (props) => {
    const { children, image } = props;
    const [isActive, setIsActive] = useState(false);

    return (
      <>
        <span
          css={css`
            color: var(--color-blue);
            text-decoration: underline;

            :hover {
              color: var(--color-laser);
            }
          `}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onPointerDown={() => setIsActive(true)}
        >
          {children}
        </span>

        <HoverMedia src={image} isActive={isActive} setIsActive={setIsActive} />
      </>
    );
  },
  hoverVideo: (props) => {
    const { children, video } = props;
    const [isActive, setIsActive] = useState(false);

    return (
      <>
        <span
          css={css`
            color: var(--color-blue);
            text-decoration: underline;

            :hover {
              color: var(--color-laser);
            }
          `}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onPointerDown={() => setIsActive(true)}
        >
          {children}
        </span>

        <HoverMedia
          src={video}
          type="video"
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </>
    );
  }
};

const simpleComponents = {
  link: ({ children, href }) => {
    return <Go to={href}>{children}</Go>;
  }
};

const Intro = ({ introduction, items }) => {
  const { ref, inView } = useInView({ threshold: 1 });
  const { setIntroInView } = useApp();

  useEffect(() => {
    setIntroInView(inView);
  }, [inView]);

  return (
    <Container ref={ref} className="h1">
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 1.5rem;
        `}
      >
        <Grid
          node="li"
          css={css`
            padding: 0 !important;
          `}
        >
          <h3>1</h3>
          <PortableText
            css={css`
              grid-column: 2 / -1;
              color: var(--color-off-black);

              ${breakpoint(`tablet`)} {
                grid-column: 3 / -1;
              }
            `}
            content={introduction}
            serializers={portableComponents}
          />
        </Grid>

        {items.map((item, index) => (
          <NavItem node="li" key={item._key}>
            <h3>{index + 2}</h3>
            <NavHeading>{item.title}</NavHeading>
            <PortableText
              css={css`
                display: flex;
                flex-direction: column;
                row-gap: 0.125rem;
                color: var(--color-off-black);
              `}
              content={item._rawContent}
              serializers={simpleComponents}
            />
          </NavItem>
        ))}
      </ul>
    </Container>
  );
};

export default Intro;
