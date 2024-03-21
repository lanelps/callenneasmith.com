import React from "react";
import { css, Global } from "@emotion/react";

const Colors = () => (
  <Global
    styles={[
      css`
        :root {
          --color-black: #3a3a3a;
          --color-off-black: #292929;
          --color-dark-grey: #3a3a3a;
          --color-light-grey: #e2e2e2;
          --color-white: #fff;
          --color-laser: #bdff00;
          --color-blue: #0000ee;
        }
      `
    ]}
  />
);

export default Colors;
