import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";
import { useSanityTags } from "~hooks";

const Container = styled.div`
  background-color: var(--color-white);
  border-top: 0.5px solid var(--color-rich-black);
`;

const Buttons = styled.div`
  display: flex;
  padding: 0.625rem 0;
  gap: 0.75rem;
`;

const Button = styled.button`
  border-radius: 2.5rem;
  padding: 0.25rem 0.375rem;

  color: ${({ color }) => color || ``};
  border: 1px solid ${({ color }) => color || ``};

  :hover {
    background-color: ${({ color }) => color || ``};
    color: var(--color-white);
  }

  ${({ activeFilters, color, name }) =>
    activeFilters?.includes(name) &&
    `background-color: ${color || ``};
    color: var(--color-white);
    `}

  text-transform: uppercase;

  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FilterBar = ({ activeFilters, setActiveFilters }) => {
  const tags = useSanityTags();

  const handleClick = (name) => {
    if (activeFilters?.includes(name)) {
      const index = activeFilters?.indexOf(name);
      const copyFilters = [...activeFilters];
      copyFilters.splice(index, 1);
      setActiveFilters(copyFilters);
      return;
    }
    setActiveFilters([...activeFilters, name]);
  };

  return (
    <Container>
      <Grid
        css={css`
          align-items: center;
        `}
      >
        <h2
          css={css`
            grid-column: 1 / span 3;
          `}
          className="caption"
        >
          SELECTED PROJECTS
        </h2>
        <Buttons
          css={css`
            grid-column: 4 / span 3;
          `}
        >
          {tags.map((tag) => (
            <Button
              key={tag.id}
              onClick={() => handleClick(tag.name)}
              color={tag.colour.value.hex}
              activeFilters={activeFilters}
              name={tag.name}
              className="caption"
            >
              <span>{tag.name}</span>
            </Button>
          ))}
        </Buttons>
      </Grid>
    </Container>
  );
};

export default FilterBar;
