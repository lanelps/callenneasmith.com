import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { html as beautifyHtml } from "js-beautify";

import useApp from "~hooks/useApp";

import { Theme, NavBar, Footer } from "~components";
import SEO from "../SEO";

const Layout = ({ children, className = "", data, location, colors, site }) => {
  const { cursorVisible } = useApp();

  const [viewPageSource, setViewPageSource] = useState(false);
  const [pageSource, setPageSource] = useState("");

  const seo = {
    seoTitle: data?.sanitySettings?.seoTitle,
    seoDescription: data?.sanitySettings?.seoDescription,
    seoKeywords: data?.sanitySettings?.seoKeywords,
    seoImage: data?.sanitySettings?.seoImage
  };

  useEffect(() => {
    const gatsbyElement = document.getElementById("___gatsby");
    if (gatsbyElement) {
      // Create a new DOM parser
      const parser = new DOMParser();

      // Parse the document.documentElement.outerHTML into a document
      const doc = parser.parseFromString(
        document.documentElement.outerHTML,
        "text/html"
      );

      // Find the ___gatsby div in the parsed document
      const parsedGatsbyElement = doc.getElementById("___gatsby");

      // Replace the content of the ___gatsby div in the parsed document
      if (parsedGatsbyElement) {
        parsedGatsbyElement.innerHTML = gatsbyElement.innerHTML;
      }

      // Get the outerHTML of the parsed document
      const newPageSource = doc.documentElement.outerHTML;

      // Set the new page source
      setPageSource(newPageSource);
    }
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "/") {
      event.preventDefault();
      // Use a function inside setViewPageSource to get the current state
      setViewPageSource((currentState) => !currentState);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    window?.addEventListener("keydown", handleKeyDown);

    return () => {
      window?.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // The dependency array is still empty as we don't need to re-run this effect due to state changes

  if (viewPageSource) {
    return (
      <p
        css={css`
          white-space: pre;
          font-family: "Neue Haas Grotesk Display Pro";
          font-size: 1rem;
          margin: 0;
        `}
      >
        {beautifyHtml(pageSource, {
          indent_with_tabs: true,
          preserve_newlines: true,
          max_preserve_newlines: 10,
          brace_style: "collapse",
          indent_inner_html: true
        })}
      </p>
    );
  }

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

          background-color: var(--color-white);
          color: var(--color-off-black);

          overflow: hidden;

          ${cursorVisible ? "cursor: none;" : ""}
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
        </main>
        <Footer {...data.sanitySettings} />
      </div>
    </>
  );
};

export default Layout;
