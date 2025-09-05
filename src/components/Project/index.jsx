import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useApp, useKeyPress } from "~hooks";
import { Expand, Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.article`
  position: relative;
  width: 100%;

  background-color: ${({ isActive }) =>
    isActive ? `var(--color-stone)` : `var(--color-white)`};

  :hover {
    background-color: var(--color-stone);
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
  opacity: 0.6;

  ${breakpoint(`tablet`)} {
    grid-column: 3 / span 1;
  }
`;

const Tag = styled.p`
  grid-column: 1 / -1;

  color: var(--color-off-black);
  opacity: 0.6;

  > * + * {
    margin-left: 0.5ch;
  }

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
    <Container
      id={project?._id}
      isActive={activeExpand === project?._id}
      className="h1"
    >
      <Grid
        node="button"
        css={css`
          row-gap: 0.125rem;
          padding-bottom: 0.75rem;

          ${breakpoint(`tablet`)} {
            row-gap: 0;
            padding-bottom: 1rem;
          }
        `}
        onClick={handleClick}
        onPointerDown={handleClick}
      >
        <ProjectName>
          <h2 className="b1">{project?.name}</h2>
        </ProjectName>

        <ClientName className="b1">{project?.client?.name}</ClientName>

        <Tag className="b1">
          {project?.tags?.map((tag, tagIndex) => (
            <React.Fragment key={tag._id}>
              <span>{tag?.name}</span>
              {tagIndex !== project.tags.length - 1 && ","}
            </React.Fragment>
          ))}
        </Tag>
      </Grid>

      <Expand project={project} isActive={activeExpand === project?._id} />
    </Container>
  );
};

export default Project;
