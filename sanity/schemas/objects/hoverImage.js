export default {
  name: `hoverImage`,
  title: `Hover image`,
  type: `object`,
  fields: [
    {
      title: `Image`,
      name: `image`,
      type: `altImage`
    },
    {
      name: `backgroundColour`,
      title: `Background Colour`,
      type: `reference`,
      to: [{ type: `colour` }]
    }
  ]
};
