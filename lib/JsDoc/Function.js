const Param = require('./Param')
const Type = require('./Type')
var changeCase = require('change-case')

class Function {
  constructor (meta, calls) {
    Object.assign(this, meta)
    this.returns = new Type()
    if (this.comment) {
      this.parseComment()
    } else {
      this.oldParams = {}
      this.description = changeCase.sentenceCase(this.name)
    }

    this.params = this.params.map(({ name, defaultValue }, paramIndex) => {
      const param = Param.create(this, name, defaultValue)
      if (calls) {
        calls.forEach(call => {
          param.addExample(call.params[paramIndex])
          this.returns.addExample(call.returns)
        })
      }
      return param
    })
  }

  parseComment () {
    const lines =  this.comment
      .trim()
      .split('\n')
      .map(line => line.replace(/(\/\/|\/\*|\*\/?)\s*/g, '').trim())
    this.description = lines
      .filter(line => !line.startsWith('@'))
      .join('\n')
      .trim()
    
    this.oldParams = lines
      .filter(line => line.startsWith('@param'))
      .map(line => Param.parse(this, line))
      .reduce((acc, curr) => {
        acc[curr.fullName] = curr
        return acc
      }, {})

    
  }

  toString () {
    const lines = [
      `/**`,
      ` * ${this.description.split('\n').join('\n * ')}`,
      ...this.params.map(param => param.toString()),
      this.returns.isDefined && ` * @returns ${this.returns}`,
      ' */'
    ].filter(x => x)
    .map(line => `${this.indentation}${line}\n`)
    return lines.join('')
  }
}


module.exports = Function