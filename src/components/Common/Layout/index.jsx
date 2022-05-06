import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { Theme } from "~components";

const Layout = ({ children, className }) => (
  <>
    <Theme />
    <div
      css={css`
        display: flex;
        gap: 1rem;
      `}
    >
      <main className={className}>{children}</main>
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
