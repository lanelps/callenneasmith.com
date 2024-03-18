import React from "react";
import { css, Global } from "@emotion/react";
import { Animations, Colors, Fonts } from "~components";

import "~node_modules/modern-normalize/modern-normalize.css";

const Theme = ({ colors }) => (
  <>
    <Global
      styles={css`
        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          font-size: inherit;
        }

        button {
          background-color: transparent;
          color: inherit;
          border-width: 0;
          padding: 0;
          cursor: pointer;
          font-size: inherit;
        }

        a:focus,
        button:focus,
        input:focus,
        textarea:focus {
          outline: none;
        }

        input:not[type="checkbox"],
        textarea {
          appearance: none;
          border-radius: 0;
        }

        figure {
          margin: 0;
        }

        input::-moz-focus-inner {
          border: 0;
          padding: 0;
          margin: 0;
        }

        ul,
        ol,
        dd {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-size: inherit;
        }

        p {
          margin: 0;
        }

        fieldset {
          border-width: 0;
          padding: 0;
          margin: 0;
        }

        :root {
          --browser-height: 100%;
        }
      `}
    />

    <Animations />
    <Colors colors={colors} />
    <Fonts />
  </>
);

export default Theme;
