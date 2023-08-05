import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { useApp } from "~hooks";

import { Theme, NavBar, Footer, PopOutImage } from "~components";
import SEO from "../SEO";

const Layout = ({ children, className, data, location, seo, colors, site }) => {
  const { popOuts } = useApp();

  return (
    <>
      <Theme colors={colors} />

      <SEO location={location} {...seo} site={site} />

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

          {popOuts.map((popOut) => (
            <PopOutImage
              key={popOut?.id}
              id={popOut?.id}
              image={popOut?.image}
              active={popOut?.active}
              setActive={popOut?.setActive}
            />
          ))}
        </main>
        <Footer {...data.sanitySettings} />
      </div>
    </>
  );
};

Layout.defaultProps = {
  className: ``
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Layout;
