import React from "react";
import { css, Global } from "@emotion/react";

export const COLORS = {
  transparent: `transparent`,
  "black-100": `#000000`,
  "black-90": `#1E1E1E`,
  "black-70": `#323232`,
  "black-60": `#4F4F4F`,
  "black-40": `#919191`,
  "black-20": `#DDDEE2`,
  "black-10": `#F0F0F0`,
  white: `#FFFFFF`,
  "fluro-green": `#00B400`,
  "jade-green": `#00B567`,
  bermuda: `#87CABA`,
  steel: `#468DB5`,
  blizzard: `#AAD3EB`,
  melrose: `#A9B1FF`,
  sapphire: `#343FA4`,
  biloba: `#AB60E5`,
  mauve: `#D4B9FD`,
  almond: `#F8D5CF`,
  "sweet-pink": `#FBA0AA`,
  jaffa: `#F28E46`,
  honey: `#FFD687`,
  lemon: `#FFFACB`,
  travertine: `#FFFDEA`,
  "e-commerce": `#DCD9D0`
};

const Colors = () => (
  <Global
    styles={[
      css`
        :root {
          ${Object.keys(COLORS).map(
            (colorKey) => `
              --color-${colorKey}: ${COLORS[colorKey]};
            `
          )}
        }
      `
    ]}
  />
);

export default Colors;
