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

    ${({ isActive }) =>
      !isActive &&
      `& > button {
      opacity: 0.5;
    }`}
`;

const ProjectName = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;

  text-align: left;

  ${breakpoint(`tablet`)} {
    grid-column: 1 / span 2;
  }
`;

const ClientName = styled.div`
  grid-column: 1 / -1;
  color: var(--color-light-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > ul {
    display: inline-flex;
    gap: 0.5ch;
  }

  ${breakpoint(`tablet`)} {
    grid-column: 3 / span 1;
    display: block;

    & > ul {
      display: none;
    }
  }
`;

const Tag = styled.ul`
  display: none;
  grid-column: 1 / -1;

  color: var(--color-light-grey);
  text-align: right;

  ${breakpoint(`tablet`)} {
    grid-column: 5 / -1;
    display: inline-flex;
    gap: 0.5ch;
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
          padding: 0 0 0.75rem;

          ${breakpoint(`tablet`)} {
            row-gap: 0;
            padding: 0 0 1rem;
          }
        `}
        onClick={handleClick}
        onPointerDown={handleClick}
      >
        <ProjectName>
          <h2 className="b1">{project?.name}</h2>
        </ProjectName>

        <ClientName className="b1">
          <p>{project?.client?.name}</p>

          <ul>
            {project?.tags?.map((tag, tagIndex) => (
              <li key={tag._id}>
                <span>{tag?.name}</span>
                {tagIndex !== project.tags.length - 1 && ","}
              </li>
            ))}
          </ul>
        </ClientName>

        <Tag className="b1">
          {project?.tags?.map((tag, tagIndex) => (
            <li key={tag._id}>
              <span>{tag?.name}</span>
              {tagIndex !== project.tags.length - 1 && ","}
            </li>
          ))}
        </Tag>
      </Grid>

      <Expand project={project} isActive={activeExpand === project?._id} />
    </Container>
  );
};

export default Project;
