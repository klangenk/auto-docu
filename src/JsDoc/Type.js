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
    
    const type = getType(example)
    if (!type) return
    if (!this.types.includes(type)) this.types.push(type)
    return type
  }

  toString () {
    return `{${this.types.join('|')}}`
  }
}

const typeMap = {
  'String': 'string',
  'Function': 'function',
  'Boolean': 'boolean',
  'Number': 'number'
}


function getType(example) {
  if (example === null || example === undefined || !example.type) {
    return null
  }
  if (example.type === 'Array') {
    if (example.params.length) {
      return `${getType(example.params[0])}[]`
    }
  }  
  return typeMap[example.type] || example.type
}

module.exports = Type