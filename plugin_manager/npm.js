var spawn = require('spawn-cmd').spawn;

module.exports = function(cwd) {
  return {
    install: function(cb) {
      var proc = spawn('npm', [ 'install', '--production' ], {
        stdio: 'inherit',
        cwd: cwd
      })
      proc.on('close', function (code) {
        if (code !== 0) {
          return cb(new Error('npm install failed with non-zero status '+code))
        } else {
          return cb(null)
        }
      })
    }
  }
}
