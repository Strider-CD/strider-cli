module.exports = function(deps, parser) {
  var pluginManager = require('../plugin_manager')(deps)
  parser.command('list')
  .option('all', {
    abbr: 'a',
    flag: true,
    help: 'Include remote plugins available for install'
  })
  .help('List local plugins. Use --all to fetch all.')
  .callback(function(opts){
    if (opts.all) {
      pluginManager.listRemote(opts)
    } else {
      console.log("Listing only installed plugins. Use flag '-a' to show all")
      pluginManager.listLocal(opts)
    }
  })
}
