require('babel-core/register')
require('babel-polyfill')

module.exports = {
  Inspector: require('./lib/Inspector'),
  putInspect: require('./lib/putInspect'),
  JSDoc: require('./lib/JSDoc')
}
