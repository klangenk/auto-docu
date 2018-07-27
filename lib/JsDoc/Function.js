const Param = require('./Param')
var changeCase = require('change-case')

class Function {
  constructor (meta, calls) {
    Object.assign(this, meta)
    this.params = this.params.map(({ name, defaultValue }, paramIndex) => {
      const param = new Param(name, defaultValue)
      if (calls) {
        param.addExamples(
          calls.map(call => call[paramIndex])
        )
      }
      return param
    })
  }

  toString () {
    const lines = [
      `/**`,
      ` * ${changeCase.sentenceCase(this.name)}`,
      ...this.params.map(param => param.toString()),
      ' */'
    ].map(line => `${this.indentation}${line}\n`)
    return lines.join('')
  }
}


module.exports = Function