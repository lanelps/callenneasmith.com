import React from "react";
import styled from "@emotion/styled";

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

const Intro = () => (
  <Container>
    <p>
      Hey, good to see you. My name is Callen and I am (currently) a London
      based digital and graphic designer with experitise in digital, print, web
      and branding design breadths. In the past I have worked with studios such
      as Studio Mass, Love + Money, Studio TunTun and Salumi Studio. I am
      currently working on a new WWW and in my spare time I am learning Blender.
      Get in touch and let’s make some cool shit.
    </p>
  </Container>
);

export default Intro;
