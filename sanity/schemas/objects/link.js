import React from "react";

export default {
  name: `link`,
  title: `Link`,
  type: `object`,
  fields: [
    {
      name: `label`,
      title: `Label`,
      type: `string`
    },
    {
      name: `url`,
      title: `url`,
      type: `url`,
      description: `e.g https://example.com, mailto:text@example.com or tel:555123456`,
      validation: (Rule) =>
        Rule.uri({
          scheme: [`http`, `https`, `mailto`, `tel`]
        })
    }
  ],
  preview: {
    select: {
      label: `label`,
      url: `url`
    },

    prepare: ({ label, url }) => ({
      title: label,
      subtitle: url,
      media: <span style={{ fontSize: 30 }}>🔗</span>
    })
  }
};
