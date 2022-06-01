import React from "react";
import { Expand, Grid } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";

const Container = styled.div`
  font-size: 18px;
  padding: 12px 0px;
  border: 0.5px solid #000000;
`;

const Circles = styled.div`
  display: flex;
  margin-left: 8.5px;
`;

const Project = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityProject {
        nodes {
          name
          client {
            name
          }
          isFeatured
          isOngoing
          ended(formatString: "y")
          started(formatString: "y")
          tags {
            _id
            colour {
              name
              value {
                hex
              }
            }
          }
        }
      }
    }
  `);

  return (
    <div>
      <Container>
        <Grid>
          <div
            css={css`
              grid-column: 1 / span 3;
              display: flex;
            `}
          >
            <h2>{data.allSanityProject.nodes[1].name}</h2>
            <Circles>
              {data.allSanityProject.nodes[1].tags.map((tag) => (
                <div
                  key={tag._id}
                  css={css`
                    border-radius: 100%;
                    width: 12px;
                    height: 12px;
                    background-color: ${tag.colour.value.hex};
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
            {data.allSanityProject.nodes[1].client.name}
          </h2>
          <h2
            css={css`
              grid-column: 6 / span 1;
              color: #595959;
            `}
          >
            {data.allSanityProject.nodes[1].started} -{" "}
            {data.allSanityProject.nodes[1].isOngoing ||
            !data.allSanityProject.nodes[1].ended
              ? `Ongoing`
              : data.allSanityProject.nodes[1].ended}
          </h2>
        </Grid>
      </Container>
      {/*  <Expand /> */}
    </div>
  );
};

export default Project;
