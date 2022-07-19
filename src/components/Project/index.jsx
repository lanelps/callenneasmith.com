import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Expand, Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.article`
  position: relative;
  width: 100%;

  background-color: ${({ isActive }) =>
    isActive ? `var(--color-off-white)` : `var(--color-white)`};
  border-top: 0.5px solid var(--color-off-black);

  :hover {
    background-color: var(--color-off-white);
  }

  transition: background-color 0.3s ease;
`;

const ProjectName = styled.div`
  grid-column: 1 / span 4;
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 0.375rem;
  }

  text-align: left;

  ${breakpoint(`tablet`)} {
    grid-column: 1 / span 3;
    > * + * {
      margin-left: 0.625rem;
    }
  }
`;

const Circles = styled.div`
  display: flex;
  > * + * {
    margin-left: 0.1875rem;
  }

  ${breakpoint(`tablet`)} {
    > * + * {
      margin-left: 0.25rem;
    }
  }
`;

const Circle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ color }) => color || `#000000`};
  border-radius: 100%;

  ${breakpoint(`tablet`)} {
    width: 0.75rem;
    height: 0.75rem;
  }
`;

const ClientName = styled.p`
  grid-column: 5 / span 2;
  color: var(--color-off-black);
  text-align: right;

  ${breakpoint(`tablet`)} {
    grid-column: 4 / span 2;
    text-align: left;
  }
`;

const Time = styled.p`
  grid-column: 1 / -1;

  margin-top: 0.125rem;

  color: var(--color-off-black);
  text-align: left;

  ${breakpoint(`tablet`)} {
    grid-column: 6 / span 1;
    margin-top: 0;
  }
`;

const Project = ({ project }) => {
  const [isActive, setIsActive] = useState(false);
  const loadedRef = useRef(false);

  const handleLoaded = () => {
    if (loadedRef?.current) return;

    loadedRef.current = true;
  };

  return (
    <Container
      isActive={isActive}
      onMouseEnter={handleLoaded}
      onPointerDown={handleLoaded}
    >
      {/* Project Title */}
      <Grid
        node="button"
        css={css`
          padding: 0.75rem;

          ${breakpoint(`tablet`)} {
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
          }
        `}
        onClick={() => setIsActive(!isActive)}
        onPointerDown={() => setIsActive(!isActive)}
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

      <Expand
        project={project}
        isActive={isActive}
        setIsActive={setIsActive}
        loaded={loadedRef?.current}
      />
    </Container>
  );
};

export default Project;
