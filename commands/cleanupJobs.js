'use strict';

module.exports = function (deps, parser) {
  var cleanupJobs = require('../lib/cleanup-jobs')(deps);

  parser.command('cleanupJobs')
    .option('project', {
      abbr: 'p',
      help: 'Project to targer, defaults to all projects',
    })
    .option('keep-jobs', {
      abbr: 'k',
      help: 'Number of latest jobs to keep',
      'default': 20
    })
    .callback(function (opts) {
      cleanupJobs(opts.keepJobs, opts.project);
    })
    .help('Cleanup all jobs except for the latest 20 or custom');
};