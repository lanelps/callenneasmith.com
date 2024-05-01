import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";

import { useApp } from "~hooks";

import { Theme, NavBar, Footer, PopOutImage, ImageCarousel } from "~components";
import SEO from "../SEO";

const Layout = ({ children, className, data, location, colors, site }) => {
  const { popOuts } = useApp();

  const seo = {
    seoTitle: data?.sanitySettings?.seoTitle,
    seoDescription: data?.sanitySettings?.seoDescription,
    seoKeywords: data?.sanitySettings?.seoKeywords,
    seoImage: data?.sanitySettings?.seoImage
  };

  return (
    <>
      <Theme colors={colors} />

      <SEO
        location={location}
        {...seo}
        title={data?.sanitySettings?.title}
        site={site}
      />

      <div
        css={css`
          min-height: 100vh;

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          background-color: var(--color-light-grey);
          color: var(--color-off-black);

          overflow: hidden;
        `}
      >
        <NavBar {...data.sanitySettings} location={location} />
        <main
          id="app-root"
          css={[
            css`
              background-color: var(--color-white);
              margin-bottom: 1.5rem;
            `,
            className
          ]}
        >
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

          <ImageCarousel projects={data.projects} />
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
