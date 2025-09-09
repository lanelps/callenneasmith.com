import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import { Layout, Intro, Projects, ImageCarousel } from "~components";
import useApp from "~hooks/useApp";
import { ReactComponent as Arrow } from "~assets/svg/arrow.svg";

const ArrowCursor = styled(Arrow)`
  position: fixed;
  ${({ position: { x, y } }) => `top: ${y}px; left: ${x}px;`}
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  transform: translate(-50%, -50%)
    ${({ direction }) =>
      direction === "left"
        ? "rotate(180deg)"
        : "rotate(0deg)"}; /* Center the arrow on the cursor */

  pointer-events: none; /* Ensure it doesn't interfere with clicks */
  z-index: 1000; /* Make sure it's on top of everything */
  width: 142.71px;
  height: 143.71px;
  mix-blend-mode: difference;
`;

const Index = ({ data: { sanitySettings, site, allSanityTag }, location }) => {
  const projects = sanitySettings.projects;
  const tags = allSanityTag.edges.map(({ node }) => node);
  const { cursorPosition, cursorVisible, cursorDirection } = useApp();

  return (
    <Layout data={{ sanitySettings }} location={location} site={site}>
      <ArrowCursor
        position={cursorPosition}
        isVisible={cursorVisible}
        direction={cursorDirection}
      />
      <Intro
        introduction={sanitySettings?._rawIntroduction}
        items={sanitySettings?.navItems}
      />
      <Projects projects={projects} tags={tags} />
      <ImageCarousel />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query {
    sanitySettings {
      title
      role

      _rawIntroduction(resolveReferences: { maxDepth: 10 })

      navItems {
        _key
        title
        items {
          _key
          _rawText(resolveReferences: { maxDepth: 10 })
          tag
        }
      }

      projects {
        _id
        name
        client {
          name
        }
        isOngoing
        ended(formatString: "y")
        started(formatString: "y")
        tags {
          _id
          name
        }
        description
        links {
          _key
          label
          url
        }
        slides {
          ... on SanityAltImage {
            _key
            _type
            altText
            asset {
              gatsbyImageData(
                width: 1440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
            mobileImage {
              asset {
                gatsbyImageData(
                  width: 360
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }

          ... on SanityMuxVideo {
            _key
            _type
            _rawAsset(resolveReferences: { maxDepth: 10 })
          }
        }
      }

      contact {
        _key
        label
        url
      }

      seoTitle
      seoDescription
      seoKeywords
      seoImage {
        asset {
          gatsbyImageData(
            width: 720
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }

    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        author
        description
        facebook
        instagram
        image
        keywords
        siteLanguage
        siteUrl
        title
        titleTemplate
      }
    }

    allSanityTag(sort: { name: ASC }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
