require("babel-core/register");
require("babel-polyfill");

module.exports = {
  Inspector: require('./src/Inspector'),
  putInspect: require('./src/putInspect'),
  JSDoc: require('./src/JSDoc'),
}