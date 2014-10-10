'use strict';

module.exports = function(deps) {
  var resilient = require('./resilient')

  return function(extpath) {
    var path = require('path');
    var extdir = deps.getPluginPath()(extpath);
    // Save extension dir
    deps.common().extdir = extdir

    // pass a filepath here instead of null
    // and you touch it to restart strider
    resilient(null, function() {
      deps.main()(extdir);
    })
  }
}
