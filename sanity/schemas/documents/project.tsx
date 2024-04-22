import React from "react";

export default {
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    { name: "date", title: "Dates" },
    {
      name: "seo",
      title: "SEO",
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      name: "client",
      title: "Client",
      type: "reference",
      to: [{ type: "client" }]
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }]
    },
    {
      name: "isFeatured",
      title: "Featured",
      type: "boolean"
    },
    {
      name: "isOngoing",
      title: "Ongoing",
      type: "boolean",
      fieldset: "date"
    },
    {
      name: "started",
      title: "Started",
      type: "date",
      fieldset: "date"
    },
    {
      name: "ended",
      title: "Ended",
      type: "date",
      fieldset: "date",
      hidden: ({ parent }) => parent?.isOngoing
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "altImage" }, { title: "Video", type: "cloudinary.asset" }]
    },
    {
      name: "links",
      title: "External Links",
      type: "array",
      of: [{ type: "link" }]
    },
    {
      name: "seoIcon",
      title: "Icon",
      type: "altImage",
      fieldset: "seo",
      description: "Icon to show in sanity studio"
    }
  ],
  preview: {
    select: {
      name: "name",
      client: "client.name",
      icon: "seoIcon"
    },
    prepare: ({ name, client, icon }) => ({
      title: name,
      subtitle: client,
      media: icon || <span style={{ fontSize: 30 }}>👾</span>
    })
  }
};
