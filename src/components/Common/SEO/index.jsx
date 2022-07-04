import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/react";
import { Helmet } from "react-helmet";

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        author
        description
        favicon
        instagram
        image
        keywords
        siteLanguage
        siteUrl
        title
        titleTemplate
      }
    }
  }
`;

const SEO = ({ location, seoTitle, seoDescription, seoKeywords, seoImage }) => {
  const { site } = useStaticQuery(query);

  const {
    buildTime,
    siteMetadata: {
      author,
      description,
      favicon,
      instagram,
      image,
      keywords,
      siteLanguage,
      siteUrl,
      title,
      titleTemplate
    }
  } = site;

  const seo = {
    author,
    title: seoTitle || title,
    titleTemplate,
    description: seoDescription || description,
    keywords: seoKeywords || keywords,
    favicon: `${siteUrl}${favicon}`,
    image: seoImage || `${siteUrl}${image}`,
    url: `${siteUrl}${location?.pathname || ``}`,
    language: siteLanguage
  };

  const schemaOrgWebPage = {
    "@context": `http://schema.org`,
    "@type": `WebPage`,
    url: siteUrl,
    headline: seo.title,
    inLanguage: seo.language,
    mainEntityOfPage: siteUrl,
    description: seo.description,
    name: seo.title,
    author: {
      "@type": `Person`,
      name: seo.author
    },
    copyrightHolder: {
      "@type": `Person`,
      name: seo.author
    },
    copyrightYear: `2022`,
    creator: {
      "@type": `Person`,
      name: seo.author
    },
    publisher: {
      "@type": `Person`,
      name: seo.author
    },
    datePublished: buildTime,
    dateModified: buildTime,
    image: {
      "@type": `ImageObject`,
      url: seo.image
    }
  };

  const breadcrumbs = {
    "@context": `http://schema.org`,
    "@type": `BreadcrumbList`,
    description: `Breadcrumbs list`,
    name: `Breadcrumbs`,
    itemListElement: [
      {
        "@type": `ListItem`,
        item: {
          "@id": siteUrl,
          name: `Homepage`
        },
        position: 1
      }
    ]
  };

  return (
    <Helmet title={seo.title}>
      <html lang={seo.language} />
      <meta name="author" content={seo.author} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:image" content={seo.image} />
      <link rel="icon" type="image/png" href={seo.favicon} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
    </Helmet>
  );
};

export default SEO;
