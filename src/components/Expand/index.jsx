import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { PopOut, Grid, ImageCarousel } from "~components";

const Container = styled.div`
  height: ${({ height }) => `${height}px`};

  transition: height 0.3s ease;
  overflow: hidden;
`;

const ExternalLinks = styled.div`
  margin: 24px 0px;
  font-size: 10px;
  line-height: 110%;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-weight: 600;
  grid-column: 1 / -1;
`;

const Links = styled.div`
  display: flex;
  margin: 12px 12px 12px 0px;
  color: #595959;
`;

const Description = styled.p`
  grid-column: 1 / span 3;
  margin-top: 29px;
  font-family: "Neue Haas Grotesk Display Pro";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 110%;
`;

const Expand = ({ project, isActive }) => {
  const [height, setHeight] = useState(0);

  const ref = useRef();

  useEffect(() => {
    if (!ref?.current) return;

    if (isActive) {
      setHeight(ref.current.clientHeight);
    } else {
      setHeight(0);
    }
  }, [isActive]);

  return (
    <Container isActive={isActive} height={height}>
      <Grid ref={ref}>
        <ImageCarousel
          images={project?.images}
          css={css`
            grid-column: 1 / -1;
          `}
          isActive={isActive}
        />

        <Description>{project?.description}</Description>

        {project?.links?.length > 0 && (
          <ExternalLinks>
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
        {/* <PopOut /> */}
      </Grid>
    </Container>
  );
};

export default Expand;
