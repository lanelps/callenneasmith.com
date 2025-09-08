export default {
  name: "oneLineContent",
  title: "Content",
  type: "array",
  of: [
    {
      type: "block",
      styles: [],
      lists: [],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
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
          }
        ]
      },
      options: {
        oneLine: true
      }
    }
  ]
};
