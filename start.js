'use strict';

module.exports = function(deps) {
  return function(extpath) {
    var path = require('path');
    var extdir = deps.getPluginPath()(extpath);
    // Save extension dir
    deps.common().extdir = extdir
    deps.main()(extdir);
  }
}
