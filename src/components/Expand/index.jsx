import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useBreakpoint } from "gatsby-plugin-breakpoints";

import { Grid, PopOut, ImageCarousel } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  display: grid;
  grid-template-rows: ${({ isActive }) => (isActive && `1fr`) || `0fr`};
  pointer-events: auto;

  transition: grid-template-rows 0.3s ease;
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;

  grid-column: 1 / -1;

  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 1.125rem;
  }

  ${breakpoint(`tablet`)} {
    grid-column: 1 / span 3;
    > * + * {
      margin-top: 1.5rem;
    }
  }
`;

const Description = styled.p``;

const ExternalLinks = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: 0.75rem;
  }

  text-transform: uppercase;
  grid-column: 1 / -1;
`;

const Links = styled.div`
  display: flex;
  > * + * {
    margin-left: 1.5rem;
  }
  color: var(--color-off-black);
`;

const Expand = ({ project, isActive, setIsActive, loaded }) => {
  const { isDesktop } = useBreakpoint();

  return (
    <Container isActive={isActive}>
      <Wrapper>
        <div
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            max-height: 100vh;

            display: ${isActive ? `flex` : `none`};
            flex-direction: column;
            justify-content: space-between;

            pointer-events: ${isActive ? `auto` : `none`};

            pointer-events: none;

            z-index: 50;
          `}
        >
          {project?.images?.length > 0 && (
            <ImageCarousel
              expandIsActive={isActive}
              images={project?.images}
              loaded={loaded}
            />
          )}
        </div>

        <Grid
          css={css`
            padding-bottom: 1.5rem;

            ${breakpoint(`tablet`)} {
              padding-bottom: 1.625rem;
            }
          `}
        >
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
                      css={css`
                        :hover {
                          color: var(--color-rich-black);
                        }

                        transition: color 0.3s ease;
                      `}
                    >
                      {link?.label}
                    </a>
                  ))}
                </Links>
              </ExternalLinks>
            )}

            {isDesktop && project?.images?.length > 0 && (
              <PopOut
                id={project?._id}
                image={project?.images?.[0]}
                loaded={loaded}
                setIsActive={setIsActive}
              />
            )}
          </ContentWrapper>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Expand;
