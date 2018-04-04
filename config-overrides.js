const rewireLess = require('react-app-rewire-less');
const path = require('path');

module.exports = function override(config, env) {
  // LESS support
  config = rewireLess(config, env);

  // For import with absolute path
  config.resolve.modules = [
    path.resolve('src'),
  ].concat(config.resolve.modules);

  return config;
}
