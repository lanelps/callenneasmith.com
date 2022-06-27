import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { Theme, NavBar, Footer } from "~components";

const Layout = ({ children, className, data }) => (
  <>
    <Theme />
    <div
      css={css`
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        background-color: var(--color-off-white);

        overflow: hidden;
      `}
    >
      <NavBar {...data.sanitySettings} />
      <main id="app-root" className={className}>
        {children}
      </main>
      <Footer {...data.sanitySettings} />
    </div>
  </>
);

Layout.defaultProps = {
  className: ``
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
