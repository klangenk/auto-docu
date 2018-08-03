class Type {
  constructor (types=[]) {
    this.types = types
  }

  /**
   * Is defined
   * @returns {boolean}
   */
  get isDefined () {
    return !!this.types.length
  }

  /**
   * Parse
   * @param {string} string
   * @returns {Type}
   */
  static parse (string) {
    const types = string.trim().slice(1, -1).split('|').filter(type => type)
    return new Type(types)
  }

  /**
   * Add example
   * @param {Object} example
   * @param {string} [example.type]
   * @param {Object|Object[]} [example.params]
   * @param {Object} [example.param]
   * @param {string} [example.param.type]
   * @param {Object} [example.param.params]
   * @returns {string}
   */
  addExample (example) {
    
    const type = getType(example)
    if (!type) return
    if (!this.types.includes(type)) this.types.push(type)
    return type
  }

  /**
   * To string
   * @returns {string}
   */
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


/**
 * Get type
 * @param {Object} example
 * @param {string} [example.type]
 * @param {Object|Object[]} [example.params]
 * @param {Object} [example.param]
 * @param {string} [example.param.type]
 * @param {Object} [example.param.params]
 * @returns {string}
 */
function getType(example) {
  if (example === null || example === undefined || !example.type) {
    return null
  }
  if (example.type === 'Array') {
    if (example.params.length) {
      return `${getType(example.params[0])}[]`
    }
  } 
  
  if (example.type === 'Promise') {
    return `Promise<${getType(example.param)}>`
  }
  return typeMap[example.type] || example.type
}

module.exports = Type