import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useKeyPress } from "~hooks";
import { Expand, Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.article`
  position: relative;
  width: 100%;

  background-color: ${({ isActive }) =>
    isActive ? `var(--color-light-grey)` : `var(--color-white)`};

  :hover {
    background-color: var(--color-light-grey);
  }

  transition: background-color 0.3s ease;
`;

const ProjectName = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  align-items: center;

  text-align: left;
`;

const ClientName = styled.p`
  grid-column: 3 / span 2;
  color: var(--color-off-black);

  ${breakpoint(`tablet`)} {
    grid-column: 3 / span 1;
  }
`;

const Tag = styled.p`
  grid-column: 1 / -1;

  color: var(--color-off-black);
  opacity: 0.6;

  ${breakpoint(`tablet`)} {
    grid-column: 5 / -1;
  }
`;

const Project = ({ project }) => {
  const [isActive, setIsActive] = useState(false);
  const loadedRef = useRef(false);

  const handleLoaded = () => {
    if (loadedRef?.current) return;

    loadedRef.current = true;
  };

  const escPressed = useKeyPress(`Escape`);

  useEffect(() => {
    if (escPressed && isActive) {
      setIsActive(false);
    }
  }, [escPressed]);

  // const generateTime = () => {
  //   if (!project?.started) return ``;

  //   if (project?.started === project?.ended) return project?.started;

  //   return `${project?.started} - ${
  //     project?.isOngoing || !project?.ended ? `Ongoing` : project?.ended
  //   }`;
  // };

  // const time = generateTime();

  return (
    <Container
      isActive={isActive}
      onMouseEnter={handleLoaded}
      onPointerDown={handleLoaded}
      className="h1"
    >
      {/* Project Title */}
      <Grid
        node="button"
        css={css`
          row-gap: 0.125rem;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;

          ${breakpoint(`tablet`)} {
            row-gap: 0;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        `}
        onClick={() => setIsActive(!isActive)}
        onPointerDown={() => setIsActive(!isActive)}
      >
        <ProjectName>
          <h2 className="h1">{project?.name}</h2>
        </ProjectName>

        <ClientName className="h1">{project?.client?.name}</ClientName>

        <Tag className="h1">{project?.tags?.map((tag) => tag?.name).join(`, `)}</Tag>
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
