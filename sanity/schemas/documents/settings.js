import React from "react";
import { IntentLink } from "@sanity/base/router";
import { CogIcon } from "@sanity/icons";

export default {
  name: `settings`,
  title: `Settings`,
  type: `document`,
  fieldsets: [
    {
      name: `seo`,
      title: `SEO`,
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: `title`,
      title: `Site Title`,
      type: `string`
    },
    {
      name: `role`,
      title: `Role`,
      type: `string`
    },
    {
      name: `contact`,
      title: `Contact links`,
      type: `array`,
      of: [{ type: `link` }]
    },
    {
      name: `introduction`,
      title: `Introduction`,
      type: `blockContent`
    },
    {
      name: `seoTitle`,
      title: `Title`,
      type: `string`,
      fieldset: `seo`,
      validation: (Rule) =>
        Rule.max(50).warning(`Longer titles may be truncated by search engines`)
    },
    {
      name: `seoDescription`,
      title: `Description`,
      type: `text`,
      rows: 2,
      fieldset: `seo`,
      validation: (Rule) =>
        Rule.max(150).warning(
          `Longer descriptions may be truncated by search engines`
        )
    },
    {
      name: `seoKeywords`,
      title: `Keywords`,
      type: `array`,
      of: [{ type: `string` }],
      options: { layout: `tags` },
      fieldset: `seo`
    },
    {
      name: `seoImage`,
      title: `Image`,
      type: `image`,
      fieldset: `seo`,
      // TODO: create separate component / clean this up further with sanity-ui
      description: (
        <>
          Used for both search engine results and social cards.
          <br />
          If empty, displays the image defined in{` `}
          <IntentLink
            intent="edit"
            params={{ id: `settings` }}
            style={{ marginLeft: `0.2em`, whiteSpace: `nowrap` }}
          >
            <CogIcon />
            <span style={{ marginLeft: `0.3em` }}>Settings</span>
          </IntentLink>
          .
        </>
      )
    }
  ]
};
