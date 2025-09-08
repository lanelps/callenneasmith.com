import { toPlainText } from "@portabletext/react";

export default {
  name: "navItemItem",
  title: "Item",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "oneLineContent",
      validation: (Rule) => Rule.required()
    },
    {
      name: "tag",
      title: "Tag",
      type: "string"
    }
  ],
  preview: {
    select: {
      text: "text",
      tag: "tag"
    },
    prepare: ({ text, tag }) => ({
      title: text && tag ? `${toPlainText(text)} (${tag})` : toPlainText(text)
    })
  }
};
