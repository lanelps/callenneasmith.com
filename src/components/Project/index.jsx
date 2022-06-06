import React from "react";
import { Expand, Grid } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Container = styled.div`
  font-size: 18px;
  padding: 12px 0px;
  border: 0.5px solid #000000;
`;

const Circles = styled.div`
  display: flex;
  margin-left: 8.5px;
`;

const Project = ({ project }) => (
  <div>
    <Container>
      <Grid>
        <div
          css={css`
            grid-column: 1 / span 3;
            display: flex;
          `}
        >
          <h2>{project?.name}</h2>
          <Circles>
            {project?.tags.map((tag) => (
              <div
                key={tag?._id}
                css={css`
                  border-radius: 100%;
                  width: 12px;
                  height: 12px;
                  background-color: ${tag?.colour?.value?.hex};
                  margin: 4px 1.5px 4px 1.5px;
                `}
              />
            ))}
          </Circles>
        </div>
        <h2
          css={css`
            grid-column: 4 / span 2;
            color: #595959;
          `}
        >
          {project?.client?.name}
        </h2>
        {project?.started && (
          <h2
            css={css`
              grid-column: 6 / span 1;
              color: #595959;
            `}
          >
            {project?.started} -{" "}
            {project?.isOngoing || !project?.ended ? `Ongoing` : project?.ended}
          </h2>
        )}
      </Grid>
      <Expand />
    </Container>
  </div>
);

export default Project;
