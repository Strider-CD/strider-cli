var spawn = require('child_process').spawn

module.exports = {
  clone: function(repo, path, cb) {
    var proc = spawn('git', [ 'clone', repo, path ], { stdio: 'inherit' })
    proc.on('close', function (code) {
      if (code !== 0) {
        return cb(new Error('git clone failed with non-zero status '+code))
      } else {
        return cb(null)
      }
    })
  }
}
