module.exports = function(deps, parser) {
  var pluginManager = require('../plugin_manager')(deps)
  parser.command('init')
  .help('Initialize a new plugin for development')
  .callback(function (opts) {
    pluginManager.createNew(opts)
  })
}
