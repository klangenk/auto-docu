const getFilenames = require('../filenames')
const fs = require('fs')
const Inserter = require('../Inserter')
const Function = require('./Function')

class JsDoc {
  constructor (filename, meta, inspect) {
    this.filenames = getFilenames(filename)
    this.functions = meta.map((func, funcIndex) => new Function(func, inspect[funcIndex]))
  }

  write () {
    if (!this.functions.length) {
      return
    }
    const source = fs.readFileSync(this.filenames.original).toString()
    const inserter = new Inserter(source)
    this.functions.forEach(func => {
      inserter.insert(func.toString(), func.pos)
    })
    fs.writeFileSync(this.filenames.src, inserter.source)
  }
}

module.exports = JsDoc
