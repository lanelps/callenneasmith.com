/* eslint-disable import/prefer-default-export */

export const crawl = (context, module) => {
  if (!context?.keys()?.[0]) {
    return module.exports;
  }

  context.keys().forEach((filePath) => {
    const componentName = filePath.replace(/^.+\/([^/]+)\/index\.jsx/, `$1`);

    module.exports[componentName] = context(filePath).default;
  });

  return module.exports;
};
