import React from "react";
import { graphql } from "gatsby";

import { Layout, Intro, Projects, ImageCarousel } from "~components";

const Index = ({
  data: { sanitySettings, allSanityProject, site, allSanityTag },
  location
}) => {
  const projects = sanitySettings.projects;
  const tags = allSanityTag.edges.map(({ node }) => node);

  return (
    <Layout data={{ sanitySettings }} location={location} site={site}>
      <Intro
        introduction={sanitySettings?._rawIntroduction}
        items={sanitySettings?.navItems}
      />
      <Projects projects={projects} tags={tags} />
      <ImageCarousel projects={projects} />
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
        _rawContent(resolveReferences: { maxDepth: 10 })
      }

      projects {
        _id
        name
        client {
          name
        }
        order
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

          ... on SanityCloudinaryAsset {
            _key
            _type
            public_id
            secure_url
            url
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

    allSanityTag {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
