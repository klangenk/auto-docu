const Type = require('./Type')
const { flatten } = require('../helpers')

class Param {
  constructor (func, name, defaultValue, parent = '', types = new Type(), description = '') {
    this.types = types
    this.name = name
    this.parent = parent
    this.optional = !!defaultValue
    this.defaultValue = defaultValue
    this.description = description
    this.props = {}
    this.calls = 0
    this.func = func
  }

  /**
   * Parent
   * @param {string} [parent]
   */
  set parent (parent) {
    this.fullName = parent ? `${parent}.${this.name}` : this.name
  }

  /**
   * Create
   * @param {function} func
   * @param {string} name
   * @param {string} [defaultValue]
   * @param {string} [parent]
   * @param {} [types]
   * @param {} [description]
   * @returns {Param}
   */
  static create (func, name, defaultValue, parent, types, description) {
    const oldParam = func.oldParams[`${parent}.${name}`] || func.oldParams[name]
    if (oldParam) {
      oldParam.parent = parent
      return oldParam
    } 
    return new Param(func, name, defaultValue, parent, types, description)
  }

  /**
   * Parse
   * @param {function} func
   * @param {string} string
   * @returns {Param}
   */
  static parse (func, string) {
    const regex = /@\S+((?: \{.*\})?) (\S+)(.*)/
    const match = string.match(regex)
    return new Param(func, match[2], undefined, undefined, Type.parse(match[1]), match[3])
  }

  addProp (key, value, parent = this.fullName) {
    if(!this.props[key]) {
      this.props[key] = Param.create(this.func, key, undefined, parent)
    }
    this.props[key].addExample(value)
  }

  /**
   * Add example
   * @param {Object} example
   * @param {string} [example.type]
   * @param {Object|Object[]} [example.params]
   */
  addExample (example) {
    this.calls++
    if (!example.type) {
      this.optional = true
      return
    }

    const type = this.types.addExample(example)

    if (example.type === 'Object') {
      Object.keys(example.params)
        .filter(key => !key.startsWith('_'))
        .forEach(key => this.addProp(key, example.params[key]))
    }

    if (type.includes('[]')) {
      if (type.startsWith('Object')) {
        const depth = (type.match(/\[/g)).length
        let obj = example
        for (let i = 0; i < depth; i++) {
          obj = obj.params[0]
        }
        const parent = `${this.fullName}${'[]'.repeat(depth)}`
        Object.keys(obj.params)
          .filter(key => !key.startsWith('_'))
          .forEach(key => this.addProp(key, obj.params[key], parent))
      }

    }
  }

  /**
   * Check optional
   */
  checkOptional () {
    Object.values(this.props).forEach(prop => {
      if (prop.calls < this.calls || this.optional) {
        prop.optional = true
      }
    })
  }

  /**
   * To array
   * @returns {string[]}
   */
  toArray () {
    this.checkOptional()
    let name = this.fullName
    if (this.defaultValue !== undefined) name = `${name}=${this.defaultValue.replace(/'|"/g,'')}`
    if (this.optional) name = `[${name}]`
    const param =`@param ${this.types} ${name} ${this.description.trim()}`.trim()
    let doc = [` * ${param}`]

    const subDoc = flatten(Object.values(this.props).map(prop => prop.toArray()))

    if (subDoc.length > 10) {
      return doc
    }

    return doc.concat(subDoc)
  }
}

module.exports = Param