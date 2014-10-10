module.exports = function(deps) {
  var _ = require('lodash')
  var Table = require('cli-table');
  var table = new Table({
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    head: ['name', 'stable', 'installed']
  });
  var getPluginPath = deps.getPluginPath()
  var path = require('path')
  var local = require('./local_plugins')(deps)

  var client = require('strider-ecosystem-client')

  client.fetchPlugins().then(function(remotePlugins) {
    local.listAll(function (err, localPlugins) {
      localPlugins = local.zip(localPlugins)
      remotePlugins.forEach(function (plugin) {
        var local = localPlugins[plugin.name]
        table.push([
          plugin.name,
          plugin.version,
          local ? local.version : ''
        ])
      })
      console.log(table.toString());
    })
  }).error(errHandle).catch(errHandle)
}

function errHandle(err) {
  console.error('Error!\n'+err.message+'\n'+err.stack)
}
