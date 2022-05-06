const context = require.context(`./`, true, /\.\/[^/]+\.jsx$/);

context.keys().forEach((filePath) => {
  const componentName = filePath.replace(/^.+\/([^/]+)\.jsx/, `$1`);

  module.exports[componentName] = context(filePath).default;
});
