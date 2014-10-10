module.exports = function(deps, parser) {
  parser.command('restart')
  .help("Restart strider (touch .strider)")
  .callback(function() {
    require('../resilient')(deps).restart()
  })
}
