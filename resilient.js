var cluster = require('cluster')
var path = require('path')
var chokidar = require('chokidar')
var touch = require('touch')
var watcher = null

module.exports = function (flag, work) {
  if(cluster.isMaster){
    if (flag) {
      touch.sync(flag)
      watcher = chokidar.watch(flag)
    }

    cluster.on('online', function(worker) {
      console.log(worker.process.pid +' forked')
      if (watcher) {
        watcher.removeAllListeners().on('change', function() {
          console.log('restart flag touched')
          worker.kill()
        })
      }
    });

    cluster.on('exit', function(worker, code, signal) {
      console.log(worker.process.pid + ' died', code, signal);
      cluster.fork()
    });

    cluster.fork();
  } else {
    work()
  }
}

