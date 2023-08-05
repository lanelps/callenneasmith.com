import React from "react";
import { Helmet } from "react-helmet";

// import { useSiteMetadata } from "~hooks";

const SEO = ({
  site,
  location,
  title,
  seoTitle,
  seoDescription,
  seoKeywords,
  seoImage
}) => {
  // const site = useSiteMetadata();

  const seo = {
    author: site?.siteMetadata?.author,
    title: seoTitle || title || site?.siteMetadata?.title,
    titleTemplate: site?.siteMetadata?.titleTemplate,
    description: seoDescription || site?.siteMetadata?.description,
    keywords: seoKeywords || site?.siteMetadata?.keywords,
    favicon: `${site?.siteMetadata?.siteUrl}${site?.siteMetadata?.favicon}`,
    image:
      seoImage || `${site?.siteMetadata?.siteUrl}${site?.siteMetadata?.image}`,
    url: `${site?.siteMetadata?.siteUrl}${location?.pathname || ``}`,
    language: site?.siteMetadata?.siteLanguage
  };

  const schemaOrgWebPage = {
    "@context": `http://schema.org`,
    "@type": `WebPage`,
    url: site?.siteMetadata?.siteUrl,
    headline: seo.title,
    inLanguage: seo.language,
    mainEntityOfPage: site?.siteMetadata?.siteUrl,
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
    datePublished: site?.buildTime,
    dateModified: site?.buildTime,
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
          "@id": site?.siteMetadata?.siteUrl,
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
