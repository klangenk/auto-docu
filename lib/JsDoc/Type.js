class Type {
  constructor (types=[]) {
    this.types = types
  }

  get isDefined () {
    return !!this.types.length
  }

  static parse (string) {
    const types = string.trim().slice(1, -1).split('|').filter(type => type)
    return new Type(types)
  }

  addExample (example) {
    if (example === null || example === undefined) {
      return
    }
    const type = getType(example)
    if (!this.types.includes(type)) this.types.push(type)
    return type
  }

  toString () {
    return `{${this.types.join('|')}}`
  }
}


function getType(example) {
  if (example === '__FUNCTION__') return 'function'
  if (example === '__PROMISE__') return 'Promise'
  let type = typeof example
  if (type === 'object') {
    if (Array.isArray(example)) {
      if (example.length) {
        return `${getType(example[0])}[]`
      }
      return 'Array'
    }
    return 'Object'
  }
  
  return type
}

module.exports = Type