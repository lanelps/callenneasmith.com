export default {
  name: `project`,
  title: `Project`,
  type: `document`,
  fieldsets: [{ name: `date`, title: `Dates` }],
  fields: [
    {
      name: `name`,
      title: `Name`,
      type: `string`
    },
    {
      name: `client`,
      title: `Client`,
      type: `reference`,
      to: [{ type: `client` }]
    },
    {
      name: `tags`,
      title: `Tags`,
      type: `array`,
      of: [{ type: `reference`, to: [{ type: `tag` }] }]
    },
    {
      name: `isFeatured`,
      title: `Is Featured`,
      type: `boolean`
    },
    {
      name: `isOngoing`,
      title: `Is Ongoing`,
      type: `boolean`,
      fieldset: `date`
    },
    {
      name: `started`,
      title: `Started`,
      type: `date`,
      fieldset: `date`
    },
    {
      name: `ended`,
      title: `Ended`,
      type: `date`,
      fieldset: `date`
    }
  ]
};
