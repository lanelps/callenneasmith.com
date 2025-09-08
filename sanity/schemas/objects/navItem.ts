export default {
  name: "navItem",
  title: "Nav Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "navItemItem" }]
    }
  ]
};
