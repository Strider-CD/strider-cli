var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , rimraf = require('rimraf')

module.exports = function(deps) {
  var localPlugins = require('./local_plugins')(deps)

  /*
   * Callback signature:
   *   cb(Error anyError, Boolean restartOrNot)
   */
  return function(name, cb) { 
    localPlugins.listAll(function (err, plugins) {
      var plugin = _.find(plugins, { name: name });
      if (plugin) {
        rimraf(plugin.path, function(err) {
          cb(err, true)
        })
      } else {
        cb(new Error(name+' not found'))
      }
    })
  }
}

function afterDelete(pluginPath, cb) {
  if (err) return cb(err);
  else return cb(null, true)
}
