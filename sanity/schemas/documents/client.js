import React from "react";

const clientIcons = [
  `👴🏽`,
  `👩🏻‍🦰`,
  `👨🏼`,
  `👩🏽`,
  `👵🏼`,
  `👱🏼`,
  `👩🏾‍🦱`,
  `🧔🏾‍♂️`,
  `👱🏼‍♀️`,
  `👨🏻`
];
const randomIcon =
  clientIcons[Math.floor(Math.random() * clientIcons.length - 1)];

export default {
  name: `client`,
  title: `Client`,
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
      name: `name`,
      title: `Name`,
      type: `string`
    },
    {
      name: `seoIcon`,
      title: `Icon`,
      type: `altImage`,
      fieldset: `seo`,
      description: `Icon to show in sanity studio`
    }
  ],
  preview: {
    select: {
      name: `name`,
      icon: `seoIcon`
    },
    prepare: ({ name, icon }) => ({
      title: name,
      media: icon || <span style={{ fontSize: 30 }}>{randomIcon}</span>
    })
  }
};
