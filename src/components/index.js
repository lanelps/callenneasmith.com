module.exports = require(`~utils/filesystem`).crawl(
  require.context(`./`, true, /\.\/.*\/index\.jsx$/),
  module
);
