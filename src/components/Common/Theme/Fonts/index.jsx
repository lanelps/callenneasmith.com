import React from "react";
import { css, Global } from "@emotion/react";
import FK_GROTESK_REGULAR_WOFF from "~assets/fonts/FKGrotesk-Regular.woff";
import FK_GROTESK_REGULAR_WOFF2 from "~assets/fonts/FKGrotesk-Regular.woff2";
import { breakpoint } from "~utils/css.js";

const SANS_FALLBACKS = `"Helvetica Neue", "Helvetica", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const FK_GROTESK_TEXT_GROUP = `"FK Grotesk", ${SANS_FALLBACKS}`;

/** ============================================================================
 * @component
 * Typography files and settings.
 */
const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: "FK Grotesk";
        src: url(${FK_GROTESK_REGULAR_WOFF2}) format("woff2"),
          url(${FK_GROTESK_REGULAR_WOFF}) format("woff");
        font-display: block;
        font-weight: normal;
        font-style: normal;
      }

      //
      // common //

      .d1,
      .h1,
      .b1,
      .caption {
        font-family: ${FK_GROTESK_TEXT_GROUP};
        font-weight: normal;
      }

      //
      // display //

      .d1 {
        font-size: max(13.33vw, 48px);
        line-height: 1.1;
        letter-spacing: -0.01em;
      }

      //
      // headings //

      .h1 {
        font-size: 28px;
        line-height: 1;
        letter-spacing: -0.03em;
      }

      //
      // body //

      .b1 {
        font-size: 16px;
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      //
      // other //

      .caption {
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: 0.02em;
      }

      //
      // breakpoints (ASC) //

      ${breakpoint(`tablet`)} {
        .d1 {
          font-size: 13.48vw;
        }
      }

      ${breakpoint(`large-tablet`)} {
        //
        // display //

        .d1 {
          font-size: min(10.42vw, 150px);
        }

        //
        // headings //

        .h1 {
          font-size: 60px;
          line-height: 1.2;
          letter-spacing: -0.03em;
        }

        //
        // body //

        .b1 {
          font-size: 28px;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        //
        // other //

        .caption {
          font-size: 14px;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }
      }
    `}
  />
);
export default Fonts;
