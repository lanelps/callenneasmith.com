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

const Button = styled.button`
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

            :hover {
              background-color: #c7578f;
              color: #ffffff;
            }
          `}
        >
          <span type="button">DIGITAL</span>
        </Button>
        <Button
          css={css`
            color: #f5a300;
            border: 1px solid #f5a300;

            :hover {
              background-color: #f5a300;
              color: #ffffff;
            }
          `}
        >
          <span type="button">PRINT</span>
        </Button>
        <Button
          css={css`
            color: #235789;
            border: 1px solid #235789;

            :hover {
              background-color: #235789;
              color: #ffffff;
            }
          `}
        >
          <span type="button">WEBSITE</span>
        </Button>
        <Button
          css={css`
            color: #28a472;
            border: 1px solid #28a472;

            :hover {
              background-color: #28a472;
              color: #ffffff;
            }
          `}
        >
          <span type="button">PASSION</span>
        </Button>
        <Button
          css={css`
            color: #c1292e;
            border: 1px solid #c1292e;

            :hover {
              background-color: #c1292e;
              color: #ffffff;
            }
          `}
        >
          <span type="button">UNDISCLOSED</span>
        </Button>
      </Buttons>
    </Grid>
  </Container>
);

export default FilterBar;
