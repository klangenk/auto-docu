const Type = require('./Type')

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

  set parent (parent) {
    this.fullName = parent ? `${parent}.${this.name}` : this.name
  }

  static create (func, name, defaultValue, parent, types, description) {
    const oldParam = func.oldParams[`${parent}.${name}`] || func.oldParams[name]
    if (oldParam) {
      oldParam.parent = parent
      return oldParam
    } 
    return new Param(func, name, defaultValue, parent, types, description)
  }

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

  addExample (example) {
    this.calls++
    if (example === null || example === undefined) {
      this.optional = true
      return
    }

    const type = this.types.addExample(example)

    if (type === 'Object') {
      Object.keys(example)
        .filter(key => !key.startsWith('_'))
        .forEach(key => this.addProp(key, example[key]))
    }

    if (type.includes('[]')) {
      if (type.startsWith('Object')) {
        const depth = (type.match(/\[/g)).length
        let obj = example
        for (let i = 0; i < depth; i++) {
          obj = obj[0]
        }
        const parent = `${this.fullName}${'[]'.repeat(depth)}`
        Object.keys(obj)
          .filter(key => !key.startsWith('_'))
          .forEach(key => this.addProp(key, obj[key], parent))
      }

    }
  }

  checkOptional () {
    Object.values(this.props).forEach(prop => {
      if (prop.calls < this.calls || this.optional) {
        prop.optional = true
      }
    })
  }

  toString () {
    this.checkOptional()
    let name = this.fullName
    if (this.defaultValue !== undefined) name = `${name}=${this.defaultValue.replace(/'|"/g,'')}`
    if (this.optional) name = `[${name}]`
    const param =`@param ${this.types} ${name} ${this.description.trim()}`.trim()
    let doc = [` * ${param}`]

    if (Object.keys(this.props).length <= 10) {
      doc = doc.concat(Object.values(this.props).map(prop => prop.toString()))
    }
    return doc
      .join('\n')
  }
}

module.exports = Param