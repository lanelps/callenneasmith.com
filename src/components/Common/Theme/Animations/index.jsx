import React from "react";
import { css, Global } from "@emotion/react";

const Animations = () => (
  <Global
    styles={[
      css`
        @keyframes appear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes appear-up {
          0% {
            transform: translate3d(0, 1rem, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes appear-down {
          0% {
            transform: translate3d(0, -1rem, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes appear-left {
          0% {
            transform: translate3d(1rem, 0, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes appear-left-more {
          0% {
            transform: translate3d(4rem, 0, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes appear-right {
          0% {
            transform: translate3d(-1rem, 0, 0);
            opacity: 0;
          }
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        :root {
          --cubic-easing: cubic-bezier(0.215, 0.61, 0.355, 1);
          --animation-appear-in: 1s var(--cubic-easing) appear forwards;
          --animation-appear-up: 1s var(--cubic-easing) appear-up forwards;
          --animation-appear-down: 1s var(--cubic-easing) appear-down forwards;
          --animation-appear-left: 1s var(--cubic-easing) appear-left forwards;
          --animation-appear-left-more: 1s var(--cubic-easing) appear-left-more
            forwards;
          --animation-appear-right: 1s var(--cubic-easing) appear-right forwards;
        }
      `
    ]}
  />
);

export default Animations;
