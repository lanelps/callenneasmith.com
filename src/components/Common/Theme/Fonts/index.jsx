import { css, Global } from "@emotion/react";

import { breakpoint } from "~utils/css.js";

const SANS_FALLBACKS = `"Helvetica", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

const NEUE_HAAS_DISPLAY_TEXT_GROUP = `"Neue Haas Grotesk Display Pro", ${SANS_FALLBACKS}`;

/** ============================================================================
 * @component
 * Typography files and settings.
 */
const Fonts = () => (
  <Global
    styles={css`
      @import url("https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro");

      * {
        font-weight: 500;
      }

      body,
      main,
      p,
      .h1,
      .b1,
      .caption {
        font-family: ${NEUE_HAAS_DISPLAY_TEXT_GROUP};
        font-weight: 500;
        text-align: left;
      }

      .h1,
      .b1,
      .caption {
        font-size: 0.875rem;
        line-height: 1.1;
      }

      .h1,
      .b1 {
        letter-spacing: 0.04em;
      }

      .caption {
        letter-spacing: 0.05em;
      }

      ${breakpoint(`tablet`)} {
        .h1,
        .b1,
        .caption {
          font-size: 1rem;
        }
      }
    `}
  />
);

export default Fonts;
