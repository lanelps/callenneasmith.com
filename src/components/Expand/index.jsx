import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { PopOut, Grid, ImageCarousel } from "~components";

const Expand = ({ project }) => {
  const ExternalLinks = styled.div`
    margin: 24px 0px;
    font-size: 10px;
    line-height: 110%;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-weight: 600;
    grid-column: 1 / -1;
  `;

  const Container = styled.div`
    display: flex;
    margin: 12px 12px 12px 0px;
    color: #595959;
  `;

  return (
    <div>
      <Grid>
        <ImageCarousel
          images={project?.images}
          css={css`
            grid-column: 1 / -1;
          `}
        />
        <p
          css={css`
            grid-column: 1 / span 3;
            margin-top: 29px;
            font-family: "Neue Haas Grotesk Display Pro";
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 110%;
          `}
        >
          {project?.description}
        </p>
        {project?.links?.length > 0 && (
          <ExternalLinks>
            <h5>EXTERNAL LINKS</h5>
            <Container>
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
            </Container>
          </ExternalLinks>
        )}
        {/* <PopOut /> */}
      </Grid>
    </div>
  );
};

export default Expand;
