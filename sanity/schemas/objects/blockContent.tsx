import React from "react";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [{ title: "Normal", value: "normal" }],
      lists: [{ title: "Bullet", value: "bullet" }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url"
              }
            ]
          },
          {
            title: "Hover Image",
            name: "hoverImage",
            type: "object",
            icon: () => `🖼️`,
            component: {
              render: ({ children }) => (
                <span
                  style={{
                    backgroundColor: "#0f0",
                    color: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {children}
                </span>
              )
            },

            fields: [
              {
                title: "Image",
                name: "image",
                type: "altImage"
              }
            ]
          },
          {
            title: "Hover Video",
            name: "hoverVideo",
            type: "object",
            icon: () => `🎥`,
            component: {
              render: ({ children }) => (
                <span
                  style={{
                    backgroundColor: "#0f0",
                    color: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {children}
                </span>
              )
            },

            fields: [
              {
                title: "Video",
                name: "video",
                type: "mux.video"
              }
            ]
          }
        ]
      }
    }
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {
    //   type: "image",
    //   options: { hotspot: true }
    // }
  ]
};
