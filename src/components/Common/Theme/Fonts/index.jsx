import React from "react";
import { css, Global } from "@emotion/react";

import { breakpoint } from "~utils/css.js";

import NEUE_HAAS_DISPLAY_ROMAN_WOFF2 from "~assets/fonts/NeueHaasDisplayRoman.woff2";
import NEUE_HAAS_DISPLAY_ROMAN_WOFF from "~assets/fonts/NeueHaasDisplayRoman.woff";
import NEUE_HAAS_DISPLAY_MEDIUM_WOFF2 from "~assets/fonts/NeueHaasDisplayMedium.woff2";
import NEUE_HAAS_DISPLAY_MEDIUM_WOFF from "~assets/fonts/NeueHaasDisplayMedium.woff";

const SANS_FALLBACKS = `"Helvetica Neue", "Helvetica", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const NEUE_HAAS_DISPLAY_TEXT_GROUP = `"Neue Haas Display", ${SANS_FALLBACKS}`;

/** ============================================================================
 * @component
 * Typography files and settings.
 */
const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Neue Haas Display";
        src: url(${NEUE_HAAS_DISPLAY_ROMAN_WOFF2}) format("woff2"),
          url(${NEUE_HAAS_DISPLAY_ROMAN_WOFF}) format("woff");
        font-display: block;
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Neue Haas Display";
        src: url(${NEUE_HAAS_DISPLAY_MEDIUM_WOFF2}) format("woff2"),
          url(${NEUE_HAAS_DISPLAY_MEDIUM_WOFF}) format("woff");
        font-display: block;
        font-weight: 500;
        font-style: normal;
      }

      //
      // common //

      .h1,
      .b1 {
        font-family: ${NEUE_HAAS_DISPLAY_TEXT_GROUP};
        font-weight: 400;
      }

      .caption {
        font-family: ${NEUE_HAAS_DISPLAY_TEXT_GROUP};
        font-weight: 500;
      }

      //
      // headings //

      .h1 {
        font-size: 1.25rem;
        line-height: 1.45rem;
        letter-spacing: -0.02em;
      }

      //
      // body //

      .b1 {
        font-size: 0.875rem;
        line-height: 0.9275rem;
        letter-spacing: -0.01em;
      }

      //
      // other //

      .caption {
        font-size: 0.5625rem;
        line-height: 0.59625rem;
      }

      //
      // breakpoints (ASC) //

      ${breakpoint(`large-tablet`)} {
        // .h1,
        // .b1 {
        //   font-family: ${NEUE_HAAS_DISPLAY_TEXT_GROUP};
        //   font-weight: 400;
        // }

        //
        // headings //

        .h1 {
          font-size: 2rem;
          line-height: 2.4rem;
          letter-spacing: -0.01em;
        }

        //
        // body //

        .b1 {
          font-size: 1.125rem;
          line-height: 1.2375rem;
        }

        //
        // other //

        .caption {
          font-size: 0.625rem;
          line-height: 0.6875rem;
          letter-spacing: 0.01em;
        }
      }
    `}
  />
);
export default Fonts;
