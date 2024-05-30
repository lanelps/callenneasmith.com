import React from "react";
import { css, Global } from "@emotion/react";

import { breakpoint } from "~utils/css.js";

import HELVETICA_NEUE_NORMAL_WOFF2 from "~assets/fonts/helveticaneue.woff2";
import HELVETICA_NEUE_MEDIUM_WOFF2 from "~assets/fonts/helveticaneue-medium.woff2";

const SANS_FALLBACKS = `"Helvetica", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const NEUE_HAAS_DISPLAY_TEXT_GROUP = `"Helvetica Neue", ${SANS_FALLBACKS}`;

/** ============================================================================
 * @component
 * Typography files and settings.
 */
const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Helvetica Neue";
        src: url(${HELVETICA_NEUE_NORMAL_WOFF2}) format("woff2");
        font-display: block;
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: "Helvetica Neue";
        src: url(${HELVETICA_NEUE_MEDIUM_WOFF2}) format("woff2");
        font-display: block;
        font-weight: 500;
        font-style: normal;
      }

      //
      // common //

      body,
      main,
      p,
      .h1,
      .b1,
      .b2,
      .caption {
        font-family: ${NEUE_HAAS_DISPLAY_TEXT_GROUP};
        font-weight: 500;
        text-align: left;
      }

      //
      // headings //

      .h1 {
        font-size: 0.875rem; // 14px
        line-height: 1.1; // 15.4px
        letter-spacing: -0.01em;
      }

      //
      // body //

      .b1 {
        font-size: 0.875rem; // 14px
        line-height: 1.1; // 15.4px
        letter-spacing: -0.01em;
      }

      .b2 {
        font-size: 0.75rem; // 12px
        line-height: 1.1;
        letter-spacing: -0.01em;
      }

      //
      // other //

      .caption {
        font-size: 0.5625rem; // 9px
        line-height: 1.1;
        letter-spacing: 0.04em;
      }

      //
      // breakpoints (ASC) //

      ${breakpoint(`tablet`)} {
        .h1 {
          font-size: 1rem; // 16px
          line-height: 1.08;
          letter-spacing: -0.02em;
        }

        .b1 {
          font-size: 1rem; // 16px
        }
      }
    `}
  />
);
export default Fonts;
