var order = [
  require('./addUser')
  , require('./restart')
  , require('./list')
  //, require('./install')
  //, require('./uninstall')
  , require('./init')
  , require('./runTest')
]

module.exports.setup = function(deps, parser) {
  order.forEach(function(fn) {
    fn(deps, parser)
  })
}
