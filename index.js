var parser = require('nomnom');

module.exports = function(deps) {
  var start = require('./start')(deps);
  var addUser = require('./add-user')(deps)
  var runTest = require('./run-test')(deps)
  var pluginManager = require('./plugin_manager')(deps)

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

  parser.command('restart')
  .help("Restart strider if it's running")
  .callback(function() {
    require('./resilient')(deps).restart()
  })

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

  parser.command('init')
  .help('Initialize a new plugin for development')
  .callback(function (opts) {
    pluginManager.createNew(opts)
  })

  parser.command('addUser')
  .option('email', {
    abbr: 'l',
    help: 'User\'s email address'
  })
  .option('password', {
    abbr: 'p',
    help: 'User\'s password'
  })
  .option('admin', {
    abbr: 'a',
    help: 'Specify if this user is an admin',
    'default': false,
    flag: true
  })
  .option('force', {
    abbr: 'f',
    help: 'Force create user, overwrites previous user with the same email address',
    'default': false,
    flag: true
  })
  .callback(function(opts){
    deps.connect(function(err) {
      if (err) {
        throw err;
      }


      if (opts.email) {
        opts.email = opts.email.toString();
      }

      if (opts.password) {
        opts.password = opts.password.toString();
      }

      addUser(opts.email, opts.password, opts.admin, opts.force);
    })
  })
  .help('Create a Strider user');


  parser.command('runTest')
  .option('email', {
    abbr: 'l',
    help: 'User\'s email address'
  })
  .option('password', {
    abbr: 'p',
    help: 'User\'s password'
  })
  .option('project', {
    abbr: 'j',
    help: 'Project name'
  })
  .option('branch', {
    abbr: 'b',
    help: 'Branch name (default: master)'
  })
  .option('message', {
    abbr: 'm',
    help: 'Commit message (optional)'
  })
  .option('deploy', {
    abbr: 'd',
    flag: true,
    help: 'Deploy on green'
  })
  .callback(function(opts){
    if (opts.email) {
      opts.email = opts.email.toString();
    }

    if (opts.password) {
      opts.password = opts.password.toString();
    }

    if (opts.project) {
      opts.project = opts.project.toString();
    }

    if (opts.branch) {
      opts.branch = opts.branch.toString();
    }

    if (opts.message) {
      opts.message = opts.message.toString();
    }

    runTest(opts.email, opts.password, opts.project, opts.branch, opts.message, opts.deploy);
  })
  .help('Run a test and optionally deploy')

  parser.nocommand('start')
  .callback(function(opts) {
    start(opts.extension_path);
  });

  return {
    parser: parser,
    start: start
  }
}
