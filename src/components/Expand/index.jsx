import React from "react";
import { PopOut, Carousel, Grid } from "~components";
import { css } from "@emotion/react";

const Expand = () => (
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
        `}
      >
        A Naarm-Based music and arts initative creating welcoming, surreal
        spaces celebrating music and community. Love Project wishes to share its
        passion for music through beautiful events and sharing performances of
        local and international talent. Love Project branding encaptulates a
        moment of serenity, encouraging its community to take a step back from
        the hustle and bustle of the everyday and to be present in a single
        moment. The graphic system implemented is versatile, reductive yet
        recognisable to represent the bespoke, understated nature of the brand.
      </p>
    </Grid>
    <h5>EXTERNAL LINKS</h5>
    <h5>FIGMA SPRINT FILE</h5>
    <h5>LOVE PROJECT INSTAGRAM</h5>
    <PopOut />
  </div>
);

export default Expand;
