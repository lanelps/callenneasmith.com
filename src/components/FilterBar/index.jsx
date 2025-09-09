import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { useApp } from "~hooks";
import { Grid } from "~components";

import { breakpoint } from "~utils/css";

const Container = styled.div`
  padding: 0.5rem 0 0.75rem;
  margin-bottom: 0.5rem;

  ${breakpoint(`tablet`)} {
    padding: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  padding: 0;
  > * + * {
    margin-left: 0.5ch;
  }

  overflow-x: scroll;

  ${breakpoint(`tablet`)} {
    padding: 0.625rem 0;
  }
`;

const FilterBar = ({ tags }) => {
  const { activeFilters, setActiveFilters } = useApp();

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
          display: flex !important;
          align-items: center;
          justify-content: space-between;

          & > * {
            width: 100%;
          }

          ${breakpoint(`tablet`)} {
            display: grid !important;
          }
        `}
      >
        <h2
          css={css`
            grid-column: 1 / -1;
            color: var(--color-light-grey);

            ${breakpoint(`tablet`)} {
              grid-column: 1 / span 3;
            }
          `}
          className="caption"
        >
          Selected Projects
        </h2>
        <Buttons
          css={css`
            grid-column: 1 / -1;

            ${breakpoint(`tablet`)} {
              grid-column: 5 / -1;
            }
          `}
        >
          {tags.map((tag, tagIndex) => (
            <React.Fragment key={tag.id}>
              <Button
                tag={tag}
                activeFilters={activeFilters}
                onPointerDown={() => handleClick(tag.name)}
              />
              {tagIndex !== tags.length - 1 && ","}
            </React.Fragment>
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
