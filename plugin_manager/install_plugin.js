var _ = require('lodash');

module.exports = function(pluginName, cb) {
  var client = require('strider-ecosystem-client')
  client.fetchPlugin(pluginName).then(function(plugin) {
    console.log(plugin);
    cb(null)
  }).error(cb).catch(cb)
}
