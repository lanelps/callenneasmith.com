import React from "react";
import { graphql } from "gatsby";

import { Layout, Intro, Projects } from "~components";

const Index = ({
  data: { sanitySettings, allSanityProject, site, allSanityTag },
  location
}) => {
  const projects = allSanityProject.edges.map(({ node }) => node);
  const tags = allSanityTag.edges.map(({ node }) => node);

  return (
    <Layout data={{ sanitySettings }} location={location} site={site}>
      <Intro
        introduction={sanitySettings?._rawIntroduction}
        items={sanitySettings?.navItems}
      />
      <Projects projects={projects} tags={tags} />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query {
    sanitySettings {
      title
      role

      navItems {
        _key
        title
        _rawContent(resolveReferences: { maxDepth: 10 })
      }

      _rawIntroduction(resolveReferences: { maxDepth: 10 })

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

    allSanityProject(sort: { started: DESC }) {
      edges {
        node {
          _id
          name
          client {
            name
          }
          isFeatured
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
          images {
            _key
            altText
            asset {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
