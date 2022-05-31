import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Grid } from "~components";

const Container = styled.div`
  font-size: 10px;
  line-height: 110%;
  border: 0.5px solid #000000;
`;
const Buttons = styled.div`
  display: flex;
  padding: 10px 0px;
  gap: 12px;
`;

const Button = styled.div`
  border-radius: 40px;
  padding: 4px 6px;
  font-size: 10px;
`;

const FilterBar = () => (
  <Container>
    <Grid>
      <h2
        css={css`
          grid-column: 1 / span 3;
          padding: 14px 0px;
          font-weight: 500;
        `}
      >
        SELECTED PROJECTS
      </h2>
      <Buttons
        css={css`
          grid-column: 4 / span 3;
        `}
      >
        <Button
          css={css`
            color: #c7578f;
            border: 1px solid #c7578f;
          `}
        >
          <button type="button">DIGITAL</button>
        </Button>
        <Button
          css={css`
            color: #f5a300;
            border: 1px solid #f5a300;
          `}
        >
          <button type="button">PRINT</button>
        </Button>
        <Button
          css={css`
            color: #235789;
            border: 1px solid #235789;
          `}
        >
          <button type="button">WEBSITE</button>
        </Button>
        <Button
          css={css`
            color: #28a472;
            border: 1px solid #28a472;
          `}
        >
          <button type="button">PASSION</button>
        </Button>
        <Button
          css={css`
            color: #c1292e;
            border: 1px solid #c1292e;
          `}
        >
          <button type="button">UNDISCLOSED</button>
        </Button>
      </Buttons>
    </Grid>
  </Container>
);

export default FilterBar;
