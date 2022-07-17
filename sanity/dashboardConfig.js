export default {
  widgets: [
    {
      name: `netlify`,
      options: {
        title: `callenneasmith`,
        sites: [
          {
            title: `Website`,
            apiId: process.env.SANITY_STUDIO_NETLIFY_SITE_ID,
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID,
            name: `callenneasmith`,
            url: `https://callenneasmith.com`
          }
        ]
      },
      layout: {
        width: `auto`,
        height: `small`
      }
    }
  ]
};
