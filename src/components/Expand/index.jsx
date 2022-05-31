import React from "react";
import { PopOut, Carousel, Grid } from "~components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";

const Expand = () => {
  const data = useStaticQuery(graphql`
    query {
      allSanityProject {
        nodes {
          description
          links {
            label
            url
          }
        }
      }
    }
  `);

  const ExternalLinks = styled.div`
    margin: 24px 12px;
    font-size: 10px;
    line-height: 110%;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-weight: 600;
  `;

  const Container = styled.div`
    display: flex;
    margin: 12px 12px 12px 0px;
    color: #595959;
  `;

  return (
    <div>
      {/* <Carousel /> */}
      <h1
        css={css`
          padding: 150px 50px;
          background-color: orange;
        `}
      >
        *CAROUSEL*
      </h1>
      <Grid>
        <p
          css={css`
            grid-column: 1 / span 3;
            margin-top: 29px;
            font-family: "Neue Haas Grotesk Display Pro";
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 110%;
          `}
        >
          {data.allSanityProject.nodes[1].description}
        </p>
      </Grid>
      <ExternalLinks>
        <h5>EXTERNAL LINKS</h5>
        <Container>
          <a href="{data.allSanityProject.nodes[1].links[1].url}">
            {data.allSanityProject.nodes[1].links[1].label}
          </a>
        </Container>
      </ExternalLinks>
      <PopOut />
    </div>
  );
};

export default Expand;
