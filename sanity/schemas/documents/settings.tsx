import React from "react";
import { Link } from "sanity/router";
import { EarthGlobeIcon } from "@sanity/icons";

export default {
  name: "settings",
  title: "Globals",
  type: "document",
  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string"
    },
    {
      name: "role",
      title: "Role",
      type: "string"
    },
    {
      name: "introduction",
      title: "Introduction",
      type: "blockContent"
    },
    {
      name: `navItems`,
      title: `Nav Items`,
      type: `array`,
      of: [{ type: `navItem` }]
    },
    {
      name: "contact",
      title: "Contact links",
      type: "array",
      of: [{ type: "link" }]
    },
    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }]
    },
    {
      name: "errorPage",
      title: "404 Page",
      type: "image"
    },
    {
      name: "seoTitle",
      title: "Title",
      type: "string",
      fieldset: "seo",
      validation: (Rule) =>
        Rule.max(50).warning("Longer titles may be truncated by search engines")
    },
    {
      name: "seoDescription",
      title: "Description",
      type: "text",
      rows: 2,
      fieldset: "seo",
      validation: (Rule) =>
        Rule.max(150).warning(
          "Longer descriptions may be truncated by search engines"
        )
    },
    {
      name: "seoKeywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      fieldset: "seo"
    },
    {
      name: "seoImage",
      title: "Image",
      type: "image",
      fieldset: "seo",
      // TODO: create separate component / clean this up further with sanity-ui
      description: (
        <>
          Used for both search engine results and social cards.
          <br />
          If empty, displays the image defined in{" "}
          <Link
            href="/structure/globals"
            style={{ marginLeft: "0.2em", whiteSpace: "nowrap" }}
          >
            <EarthGlobeIcon />
            <span style={{ marginLeft: "0.3em" }}>Globals</span>
          </Link>
          .
        </>
      )
    }
  ]
};
