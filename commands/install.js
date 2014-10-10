module.exports = function(deps, parser) {
  var pluginManager = require('../plugin_manager')(deps)
  parser.command('install')
  .help('Install a plugin from the ecosystem.')
  .callback(function(opts){
    var plugin = opts._[1];
    if (plugin) {
      pluginManager.install(plugin, function(err) {
        if (err) {
          console.error(err.stack);
        } else {
          console.log("Install successful -- restarting Strider")
          require('../resilient')(deps).restart()
        }
      })
    } else {
      console.error("Please pass in a plugin name. Find plugins with `strider list --all`.")
    }
  })
}
