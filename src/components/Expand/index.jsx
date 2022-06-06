import React from "react";
import { PopOut, Carousel, Grid, Image } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Expand = ({ project }) => {
  const ExternalLinks = styled.div`
    margin: 24px 0px;
    font-size: 10px;
    line-height: 110%;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-weight: 600;
    grid-column: 1 / span 12;
  `;

  const Container = styled.div`
    display: flex;
    margin: 12px 12px 12px 0px;
    color: #595959;
  `;

  return (
    <div>
      <Grid>
        {/* <Carousel
          slides={() =>
            project.images.map((image) => (
              <Image
                key={image._key}
                image={image}
                contain
                css={css`
                  height: 100%;
                  width: 100%;
                `}
              />
            ))
          }
          css={css`
            width: 100%;
            grid-column: 1 / span 12;
            overflow: hidden;
            height: 428px;
          `}
        /> */}
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
        {project?.links && (
          <ExternalLinks>
            <h5>EXTERNAL LINKS</h5>
            <Container>
              <a
                href={`${project?.links[0]?.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project?.links[0]?.label}
              </a>
            </Container>
          </ExternalLinks>
        )}
        {/* <PopOut /> */}
      </Grid>
    </div>
  );
};

export default Expand;
