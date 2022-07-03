import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { Grid, ImageCarousel, PopOut } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  height: ${({ height }) => `${height}px`};

  transition: height 0.3s ease;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;

  grid-column: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 1.125rem;

  ${breakpoint(`large-tablet`)} {
    grid-column: 1 / span 3;
    gap: 1.5rem;
  }
`;

const Description = styled.p``;

const ExternalLinks = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  text-transform: uppercase;
  grid-column: 1 / -1;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--color-off-black);
`;

const Expand = ({ project, isActive, setIsActive }) => {
  const ref = useRef();
  const loadedRef = useRef(false);

  const [height, setHeight] = useState(0);

  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (!ref?.current) return;

    if (isActive) {
      setHeight(ref.current.clientHeight);
    } else {
      setHeight(0);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && !loadedRef.current) {
      loadedRef.current = true;
    }
  }, [isActive]);

  return (
    <Container isActive={isActive} height={height}>
      <Grid
        ref={ref}
        css={css`
          padding-bottom: 1.5rem;

          ${breakpoint(`large-tablet`)} {
            padding-bottom: 1.625rem;
          }
        `}
      >
        <ImageCarousel
          images={project?.images}
          css={css`
            grid-column: 1 / -1;
          `}
          loaded={loadedRef?.current}
        />

        <ContentWrapper>
          <Description className="b1">{project?.description}</Description>

          {project?.links?.length > 0 && (
            <ExternalLinks className="caption">
              <h5>EXTERNAL LINKS</h5>
              <Links>
                {project?.links.map((link) => (
                  <a
                    key={link?._key}
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link?.label}
                  </a>
                ))}
              </Links>
            </ExternalLinks>
          )}

          {isDesktop && (
            <PopOut
              id={project?._id}
              image={project?.images?.[0]}
              loaded={loadedRef?.current}
              setIsActive={setIsActive}
            />
          )}
        </ContentWrapper>
      </Grid>
    </Container>
  );
};

export default Expand;
