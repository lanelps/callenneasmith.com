import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";
import { GRID_GAP_REM } from "~components/Common/Grid";

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

const Description = styled.div`
  white-space: pre-line;
  min-height: 2.5rem;

  ${breakpoint(`tablet`)} {
    min-height: 2.9375rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: ${GRID_GAP_REM}rem;

    & > h3 {
      font-weight: 500;
      color: var(--color-light-grey);
    }

    & > p {
      grid-column: 2 / -1;
      color: var(--color-off-black);
    }
  }
`;

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

  ${breakpoint(`tablet`)} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: ${GRID_GAP_REM}rem;
  }
`;

const Links = styled.div`
  display: flex;
  > * + * {
    margin-left: 1.5rem;
  }
  color: var(--color-off-black);

  ${breakpoint(`tablet`)} {
    grid-column: 2 / -1;
  }
`;

const Expand = ({ project, isActive }) => {
  const descriptions = project?.description?.split(`\n\n`).filter(Boolean);

  return (
    <Container isActive={isActive}>
      <Wrapper>
        <Grid
          css={css`
            padding: 0 0 1.5rem;

            ${breakpoint(`tablet`)} {
              padding: 0 0 0.75rem;
            }
          `}
        >
          <ContentWrapper>
            {descriptions.map((desc, i) => (
              <Description key={i} className="b1">
                <h3>{String.fromCharCode(65 + i)}</h3>
                <p>{desc}</p>
              </Description>
            ))}

            {project?.links?.length > 0 && (
              <ExternalLinks className="caption">
                <Links>
                  {project?.links.map((link) => (
                    <a
                      key={link?._key}
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 0.125rem;
                        color: var(--color-blue);
                        text-decoration: underline;

                        :hover {
                          text-decoration: none;
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
          </ContentWrapper>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default Expand;
