var spawn = require('spawn-cmd').spawn;

module.exports = {
  clone: function(repo, tag, path, cb) {

    var proc = spawn('git', [
      'clone',
      '--branch', tag,
      '--depth', '1',
      repo, path
    ]);

    var errors = []

    proc.stderr.on('data', function(chk) {
      errors.push(chk.toString());
    })

    proc.on('close', function (code) {
      if (code !== 0) {
        return cb(new Error('git clone failed with non-zero status '+code+".\n"+errors.join('\n')))
      } else {
        return cb(null)
      }
    })
  }
}
