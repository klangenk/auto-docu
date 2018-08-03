const fs = require('fs')
const Inserter = require('../Inserter')
const Function = require('./Function')

class JSDoc {
  /**
   * Constructor
   * @param {Object[]} meta
   * @param {Object[][]} inspect
   * @param {Object[]} [inspect[][].params]
   * @param {string} [inspect[][].params[].type]
   * @param {Array|Object} [inspect[][].params[].params]
   * @param {Object} [inspect[][].returns]
   * @param {string} [inspect[][].returns.type]
   * @param {Object} [inspect[][].returns.param]
   * @param {string} [inspect[][].returns.param.type]
   */
  constructor (meta, inspect) {
    this.functions = meta.map((func, funcIndex) => new Function(func, inspect[funcIndex]))
  }

  /**
   * Write
   * @param {string} source
   * @returns {string}
   */
  write (source) {
    if (!this.functions.length) {
      return source
    }
    const inserter = new Inserter(source)
    this.functions.forEach(func => {
      inserter.insert(func.toString(), func.pos, func.pos + func.comment.length)
    })
    return inserter.source
  }
}

module.exports = JSDoc
