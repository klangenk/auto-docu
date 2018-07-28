const Param = require('./Param')
var changeCase = require('change-case')

class Function {
  constructor (meta, calls) {
    Object.assign(this, meta)
    if (this.comment) {
      this.parseComment()
    } else {
      this.description = changeCase.sentenceCase(this.name)
    }
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

  parseComment () {
    this.description = this.comment.trim().split('\n')
      .map(line => line.replace(/(\/\/|\/\*|\*\/?)\s*/g, '').trim())
      .join('\n')
      .trim()
  }

  toString () {
    const lines = [
      `/**`,
      ` * ${this.description.split('\n').join('\n * ')}`,
      ...this.params.map(param => param.toString()),
      ' */'
    ].map(line => `${this.indentation}${line}\n`)
    return lines.join('')
  }
}


module.exports = Function