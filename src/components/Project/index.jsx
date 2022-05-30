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
`;

const Project = () => (
  <div>
    <Container>
      <Grid>
        <div
          css={css`
            grid-column: 1 / span 3;
            display: flex;
            padding: 0px 10px;
          `}
        >
          <h2>Love Project Australia</h2>
          <Circles>
            <div
              css={css`
                border-radius: 100%;
                width: 12px;
                height: 12px;
                background-color: #c7578f;
                margin: 4px 1.5px 4px 10px;
              `}
            />
            <div
              css={css`
                border-radius: 100%;
                width: 12px;
                height: 12px;
                background-color: #f5a300;
                margin: 4px 1.5px;
              `}
            />
            <div
              css={css`
                border-radius: 100%;
                width: 12px;
                height: 12px;
                background-color: #28a472;
                margin: 4px 1.5px;
              `}
            />
            <div
              css={css`
                border-radius: 100%;
                width: 12px;
                height: 12px;
                background-color: #235789;
                margin: 4px 1.5px;
              `}
            />
            <div
              css={css`
                border-radius: 100%;
                width: 12px;
                height: 12px;
                background-color: #c1292e;
                margin: 4px 1.5px;
              `}
            />
          </Circles>
        </div>

        <h2
          css={css`
            grid-column: 4 / span 2;
            color: #595959;
          `}
        >
          Love Project AU
        </h2>
        <h2
          css={css`
            grid-column: 6 / span 1;
            color: #595959;
          `}
        >
          2020-Ongoing
        </h2>
      </Grid>
    </Container>
    <Expand />
  </div>
);

export default Project;
