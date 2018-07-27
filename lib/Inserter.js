class Inserter {
  constructor (source) {
    this.offset = 0
    this.source = source
  }

  insert(string, pos) {
    this.source = `${this.source.slice(0, pos + this.offset)}${string}${this.source.slice(pos + this.offset)}`
    this.offset += string.length
  }
}

module.exports = Inserter