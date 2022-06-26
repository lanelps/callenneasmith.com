import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { Theme, NavBar, Footer } from "~components";

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <div
      css={css`
        gap: 1rem;
      `}
    >
      <NavBar />
      <main id="app-root" className={className}>
        {children}
      </main>
      <Footer />
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
