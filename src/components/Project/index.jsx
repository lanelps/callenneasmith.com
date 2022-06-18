import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Expand, Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.article`
  font-size: 18px;
  border: 0.5px solid #000000;
`;

const Circles = styled.div`
  display: flex;
  margin-left: 8.5px;
`;

const Circle = styled.div`
  border-radius: 100%;
  width: 12px;
  height: 12px;
  background-color: ${({ color }) => color || `#000000`};
  margin: 4px 1.5px 4px 1.5px;
`;

const ClientName = styled.p`
  grid-column: 4 / span 2;
  color: #595959;
`;

const Time = styled.p`
  grid-column: 6 / span 1;
  color: #595959;
`;

const Project = ({ project }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      {/* Project Title */}
      <Grid
        node="button"
        css={css`
          ${breakpoint(`large-tablet`)} {
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
          }
        `}
        onClick={() => setIsActive(!isActive)}
      >
        <div
          css={css`
            grid-column: 1 / span 3;
            display: flex;
          `}
        >
          <h2>{project?.name}</h2>
          <Circles>
            {project?.tags.map((tag) => (
              <Circle key={tag?._id} color={tag?.colour?.value?.hex} />
            ))}
          </Circles>
        </div>

        <ClientName>{project?.client?.name}</ClientName>

        {project?.started && (
          <Time>
            {project?.started} -{` `}
            {project?.isOngoing || !project?.ended ? `Ongoing` : project?.ended}
          </Time>
        )}
      </Grid>

      <Expand project={project} isActive={isActive} />
    </Container>
  );
};

export default Project;
