const fs = require('fs')
const Inserter = require('../Inserter')
const Function = require('./Function')

class JsDoc {
  constructor (meta, inspect) {
    this.functions = meta.map((func, funcIndex) => new Function(func, inspect[funcIndex]))
  }

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

module.exports = JsDoc
