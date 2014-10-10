'use strict';

module.exports = function(deps) {
  var resilient = require('./resilient')

  return function(extpath) {
    var path = require('path');
    var extdir = deps.getPluginPath()(extpath);
    // Save extension dir
    deps.common().extdir = extdir

    resilient({
      restartFile: deps.restartFile
    }, function() {
      deps.main()(extdir);
    })
  }
}
