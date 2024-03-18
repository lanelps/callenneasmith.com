export default {
  name: "tag",
  title: "Tag",
  type: "document",
  icon: () => "🏷",
  fieldsets: [
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
      type: "string"
    }
  ],
  preview: {
    select: {
      name: "name",
      icon: "seoIcon"
    },
    prepare: ({ name }) => ({
      title: name
    })
  }
};
