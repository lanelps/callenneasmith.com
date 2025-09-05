import React from "react";
import { css, Global } from "@emotion/react";

const Colors = () => (
  <Global
    styles={[
      css`
        :root {
          --color-black: #3a3a3a;
          --color-off-black: #5a5a5a;
          --color-dark-grey: #3a3a3a;
          --color-light-grey: #aaaaaa;
          --color-stone: #f6f6f6;
          --color-white: #fff;
          --color-laser: #bdff00;
          --color-blue: #0000ee;
          --color-red: #de1600;
        }
      `
    ]}
  />
);

export default Colors;
