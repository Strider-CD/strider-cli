var parser = require('nomnom');

module.exports = function(deps) {
  var start = require('./start')(deps);

  parser
  .option('version', {
    abbr: 'v',
    flag: true,
    help: 'Print version and exit',
    callback: function() {
      return deps.version;
    }
  })
  .option('plugin_path', {
    abbr: 'm',
    help: 'Specify path to plugins (defaults to node_modules)'
  })

  var commands = require('./commands')
  commands.setup(deps, parser)




  parser.nocommand('start')
  .callback(function(opts) {
    start(opts.extension_path);
  });

  return {
    parser: parser,
    start: start
  }
}
