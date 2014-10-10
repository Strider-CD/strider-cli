var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , git = require('./git')
  , npm = require('./npm')

module.exports = function(deps) {
  var home = deps.getPluginPath()()[0]

  /*
   * Callback signature:
   *   cb(Error anyError, Boolean restartOrNot)
   */
  return function(name, cb) { 
    var pluginPath = path.join(home, name)
    console.log(pluginPath)
    if (fs.existsSync(pluginPath)) {
      afterCloned(pluginPath, cb)
    } else {
      var client = require('strider-ecosystem-client')
      client.fetchPlugin(name).then(function(plugin) {
        git.clone(plugin.git_url, pluginPath, function(err) {
          if (err) throw err;
          console.log('cloned')
          afterCloned(pluginPath, cb)
        })
      }).error(cb).catch(cb)
    }
  }
}

function afterCloned(pluginPath, cb) {
  npm(pluginPath).install(function(err) {
    if (err) return cb(err);
    else return cb(null, true)
  })
}
