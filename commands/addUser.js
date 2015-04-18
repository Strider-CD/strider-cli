module.exports = function(deps, parser) {
  var addUser = require('../add-user')(deps)
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
}
