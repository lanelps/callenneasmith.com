import React from "react";
import { css, Global } from "@emotion/react";

import { useSanityColours } from "~hooks";

const Colors = () => {
  const colors = useSanityColours();

  return (
    <Global
      styles={[
        css`
          :root {
            ${colors.map((color) => {
              const name = color.name.toLowerCase().split(` `).join(`-`);
              return `--color-${name}: ${color.value.hex}`;
            })}
          }
        `
      ]}
    />
  );
};

export default Colors;
