var spawn = require('child_process').spawn

module.exports = {
  clone: function(repo, tag, path, cb) {

    var proc = spawn('git', [
      'clone',
      '--branch', tag,
      '--depth', '1',
      repo, path
    ], { stdio: 'inherit' })
    proc.on('close', function (code) {
      if (code !== 0) {
        return cb(new Error('git clone failed with non-zero status '+code))
      } else {
        return cb(null)
      }
    })
  }
}
