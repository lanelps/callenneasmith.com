import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";
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

const FilterBar = ({ activeFilters, setActiveFilters }) => {
  const data = useStaticQuery(graphql`
    query Tags {
      allSanityTag {
        edges {
          node {
            id
            name
            colour {
              value {
                hex
              }
            }
          }
        }
      }
    }
  `);

  const {
    allSanityTag: { edges: tags }
  } = data;

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
          {tags.map((tag) => (
            <Button
              key={tag.node.id}
              onClick={() => handleClick(tag.node.name)}
              css={css`
                color: ${tag.node.colour.value.hex};
                border: 1px solid ${tag.node.colour.value.hex};

                :hover {
                  background-color: ${tag.node.colour.value.hex};
                  color: #ffffff;
                }

                ${activeFilters?.includes(tag.node.name) &&
                `background-color: ${tag.node.colour.value.hex};
                  color: #ffffff;
                  `}
              `}
            >
              <span>
                {tag.node.name} {activeFilters?.includes(tag.node.name) && `X`}
              </span>
            </Button>
          ))}
        </Buttons>
      </Grid>
    </Container>
  );
};

export default FilterBar;
