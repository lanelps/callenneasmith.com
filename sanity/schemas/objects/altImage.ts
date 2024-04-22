export default {
  name: "altImage",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "altText",
      title: "Alternative Text",
      type: "string"
    },
    {
      name: "mobileImage",
      title: "Mobile Image",
      type: "image",
      description: "Image for mobile devices",
      options: {
        hotspot: false,
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      media: "asset",
      title: "altText"
    }
  }
};
