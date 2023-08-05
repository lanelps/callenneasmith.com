import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";
// import { useSanityTags } from "~hooks";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  background-color: var(--color-white);
  border-top: 0.5px solid var(--color-off-black);

  padding: 0.75rem 0;

  ${breakpoint(`tablet`)} {
    padding: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  padding: 0;
  > * + * {
    margin-left: 0.75rem;
  }

  overflow-x: scroll;

  ${breakpoint(`tablet`)} {
    padding: 0.625rem 0;
  }
`;

const FilterBar = ({ activeFilters, setActiveFilters, tags }) => {
  // const tags = useSanityTags();

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
            grid-column: 1 / -1;
            margin-bottom: 0.75rem;

            ${breakpoint(`tablet`)} {
              grid-column: 1 / span 3;
              margin-bottom: 0;
            }
          `}
          className="caption"
        >
          SELECTED PROJECTS
        </h2>
        <Buttons
          css={css`
            grid-column: 1 / -1;

            ${breakpoint(`tablet`)} {
              grid-column: 4 / span 3;
            }
          `}
        >
          {tags.map((tag) => (
            <Button
              key={tag.id}
              tag={tag}
              activeFilters={activeFilters}
              onPointerDown={() => handleClick(tag.name)}
            />
          ))}
        </Buttons>
      </Grid>
    </Container>
  );
};

export default FilterBar;

const ButtonContainer = styled.button`
  border-radius: 2.5rem;
  padding: 0.25rem 0.375rem;

  color: ${({ isActive, color }) => (isActive && `white`) || color};
  border: 1px solid ${({ color }) => color};
  background-color: ${({ isActive, color }) =>
    (isActive && color) || `transparent`};

  :hover {
    background-color: ${({ color }) => color};
    color: var(--color-white);
  }

  text-transform: uppercase;

  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`;

const Button = ({ activeFilters, onPointerDown, tag }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (activeFilters?.includes(tag.name)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeFilters]);

  return (
    <ButtonContainer
      key={tag.id}
      onPointerDown={onPointerDown}
      color={tag.colour.value.hex}
      isActive={isActive}
      name={tag.name}
      className="caption"
    >
      <span>{tag.name}</span>
    </ButtonContainer>
  );
};
