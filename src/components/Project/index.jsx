import React, { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Expand, Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.article`
  border-top: 0.5px solid var(--color-rich-black);
`;

const Circles = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Circle = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ color }) => color || `#000000`};
  border-radius: 100%;
`;

const ProjectName = styled.div`
  grid-column: 1 / span 3;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const ClientName = styled.p`
  grid-column: 4 / span 2;
  color: var(--color-off-black);
  text-align: left;
`;

const Time = styled.p`
  grid-column: 6 / span 1;
  color: var(--color-off-black);
  text-align: left;
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
        <ProjectName>
          <h2>{project?.name}</h2>
          <Circles>
            {project?.tags.map((tag) => (
              <Circle key={tag?._id} color={tag?.colour?.value?.hex} />
            ))}
          </Circles>
        </ProjectName>

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
