import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useApp, useKeyPress } from "~hooks";
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
  const { activeExpand, setActiveExpand } = useApp();
  const escPressed = useKeyPress(`Escape`);

  const handleClick = () => {
    const isActive = activeExpand === project?._id;
    setActiveExpand(isActive ? null : project?._id);
  };

  useEffect(() => {
    if (escPressed) {
      setActiveExpand(null);
    }
  }, [escPressed]);

  return (
    <Container isActive={activeExpand === project?._id} className="h1">
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
        onClick={handleClick}
        onPointerDown={handleClick}
      >
        <ProjectName>
          <h2 className="h1">{project?.name}</h2>
        </ProjectName>

        <ClientName className="h1">{project?.client?.name}</ClientName>

        <Tag className="h1">
          {project?.tags?.map((tag) => tag?.name).join(`, `)}
        </Tag>
      </Grid>

      <Expand project={project} isActive={activeExpand === project?._id} />
    </Container>
  );
};

export default Project;
