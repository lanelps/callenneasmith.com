import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PortableText from "react-portable-text";
import SanityImage from "gatsby-plugin-sanity-image";
import { useInView } from "react-intersection-observer";

import { useApp } from "~hooks";
import { Grid, Go } from "~components";

// import { sanityConfig } from "~utils/sanity";
import { breakpoint } from "~utils/css";

const Container = styled.div`
  // max-width: 1440px;
  min-height: 107.2vw;

  margin: 0 auto;
  padding: 0.25rem 0.5rem;

  overflow: hidden;

  ${breakpoint(`large-mobile`)} {
    min-height: 50vw;
  }

  ${breakpoint(`large-tablet`)} {
    min-height: 25vw;
  }
`;

const NavItems = styled.ul`
  width: 100%;

  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;

  row-gap: 1.5rem;

  ${breakpoint(`tablet`)} {
    grid-column: 1 / span 4;
  }
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  ${breakpoint(`tablet`)} {
    flex-direction: row;
    column-gap: 0.25rem;
  }

  & > * {
    width: 100%;
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

const HoverImage = ({ image, isActive, setIsActive }) => {
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
        <HoverFigure isActive={isActive}>
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
    const { children, image } = props;
    const [isActive, setIsActive] = useState(false);

    return (
      <>
        <span
          className="h1"
          css={css`
            color: var(--color-blue);
            transition: color 0.3s ease-in-out;

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

        <HoverImage
          image={image}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </>
    );
  }
};

const simpleComponents = {
  link: ({ children, href }) => {
    return (
      <Go
        to={href}
        css={css`
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        `}
      >
        {children}
      </Go>
    );
  }
};

const Intro = ({ introduction, items }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { setIntroInView } = useApp();

  useEffect(() => {
    setIntroInView(inView);
  }, [inView]);

  return (
    <Container ref={ref}>
      <Grid
        css={css`
          row-gap: 1.5rem !important;
          padding: 0 !important;
        `}
      >
        <PortableText
          css={css`
            grid-column: 1 / -1;
          `}
          content={introduction}
          serializers={portableComponents}
        />
        <NavItems className="h1">
          {items.map((item) => (
            <NavItem key={item._key}>
              <h3 className="h1">{item.title}</h3>
              <PortableText
                css={css`
                  display: flex;
                  flex-direction: column;
                  row-gap: 0.125rem;
                `}
                content={item._rawContent}
                serializers={simpleComponents}
              />
            </NavItem>
          ))}
        </NavItems>
      </Grid>
    </Container>
  );
};

export default Intro;
