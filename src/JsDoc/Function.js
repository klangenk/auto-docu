const Param = require('./Param')
const Type = require('./Type')
const { flatten } = require('../helpers')
const changeCase = require('change-case')

class Function {
  /**
   * Constructor
   * @param {Object} meta
   * @param {Object[]} [calls]
   */
  constructor (meta, calls) {
    Object.assign(this, meta)
    this.returns = new Type()
    if (this.comment) {
      this.parseComment()
    } else {
      this.oldParams = {}
      this.description = changeCase.sentenceCase(this.name)
    }

    this.params = this.params.map(({ name, defaultValue }) => Param.create(this, name, defaultValue))

    if (calls) {
      calls.forEach(call => {
        this.params.forEach((param, index) => {
          param.addExample(call.params[index])
        })

        this.returns.addExample(call.returns)
      })
    }
  }

  /**
   * Parse comment
   */
  parseComment () {
    const lines = this.comment
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

  /**
   * To string
   * @returns {string}
   */
  toString () {
    const lines = [
      `/**`,
      ` * ${this.description.split('\n').join('\n * ')}`,
      ...flatten(this.params.map(param => param.toArray())),
      this.returns.isDefined && ` * @returns ${this.returns}`,
      ' */'
    ].filter(x => x)
      .map(line => `${this.indentation}${line}\n`)
    return lines.join('')
  }
}

module.exports = Function
