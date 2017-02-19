module.exports = function(pluginsPath) {
  var _ = require('lodash')
  var Table = require('cli-table');
  var table = new Table({
    chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
    head: ['name', 'description', 'stable', 'installed']
  });

  var local = require('./local_plugins')(pluginsPath)

  var client = require('strider-ecosystem-client')

  client.fetchPlugins().then(function(remotePlugins) {
    local.listAllZipped(function (err, localPlugins) {
      Object.keys(remotePlugins).forEach(function (name) {
        var remote = remotePlugins[name]
        var local = localPlugins[name]
        console.log(remote);
        table.push([
          name,
          remote.description,
          remote.tag,
          local ? local.version : 'no'
        ])
      })
      console.log(table.toString());
    })
  }).error(errHandle).catch(errHandle)
}

function errHandle(err) {
  console.error('Error!\n'+err.message+'\n'+err.stack)
}
