import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
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
            display: none;

            ${breakpoint(`tablet`)} {
              grid-column: 5 / -1;
              display: block;
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
  color: var(--color-dark-grey);

  text-transform: capitalize;
  ${({ isActive }) => isActive && `text-decoration: underline;`}

  transition: color 0.3s ease;

  :hover {
    text-decoration: underline;
  }
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
      isActive={isActive}
      name={tag.name}
      className="b1"
    >
      <span>{tag.name}</span>
    </ButtonContainer>
  );
};
