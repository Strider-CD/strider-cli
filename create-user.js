'use strict';

var readline = require('readline');

module.exports = function(deps) {
  var User = deps.models().User;

  function createUser(email, password, admin) {
    User.findByEmail(email, function (err, users) {
      if (err) {
        console.error('Failed to lookup users, please let us know at https://github.com/Strider-CD/strider-cli/issues: ', err);
        process.exit(1);
      }

      if (users.length) {
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question('User already exists, overwrite? (y/n) [n]: ', function (overwrite) {
          if (overwrite) {
            User.update({ email: email }, {
              password: password,
              account_level: admin
            }, function (err) {
              if (err) {
                console.log('Error updating user:', err);
                process.exit(1);
              }

              console.log('User updated successfully! Enjoy.');
              process.exit();
            });
          } else {
            console.log('addUser cancelled');
            process.exit();
          }
        });
      } else {
        var u = new User();

        u.email = email;
        u.created = new Date();
        u.set('password', password);
        u.account_level = admin;

        u.save(function(err) {
          if (err) {
            console.log('Error adding user:', err);
            process.exit(1);
          }

          console.log('User created successfully! Enjoy.');
          process.exit();
        });
      }
    });
  }

  return createUser;
}

