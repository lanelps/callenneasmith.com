import React from "react";
import styled from "@emotion/styled";
import { useStaticQuery, graphql } from "gatsby";

const Container = styled.div`
  color: #000000;
  font-family: "Neue Haas Grotesk Display Pro";
  font-weight: 500;
  font-size: 32px;
  line-height: 120%;
  letter-spacing: -0.01em;
  padding: 10px;
  background-color: #e5e5e5;
  height: 304px; //TO BE CONFIRMED
`;

const Intro = () => {
  const data = useStaticQuery(graphql`
    query {
      sanitySettings {
        introduction {
          children {
            text
          }
        }
      }
    }
  `);

  return (
    <Container>
      <p>{data.sanitySettings.introduction.children}</p>
    </Container>
  );
};

export default Intro;
