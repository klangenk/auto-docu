class Inserter {
  /**
   * Constructor
   * @param {string} source
   */
  constructor (source) {
    this.offset = 0
    this.source = source
    this.original = source
  }

  /**
   * Insert
   * @param {string} string
   * @param {number} startPos
   * @param {number} [endPos=startPos]
   */
  insert (string, startPos, endPos = startPos) {
    this.source = `${this.source.slice(0, startPos + this.offset)}${string}${this.source.slice(endPos + this.offset)}`
    this.offset += (string.length - endPos + startPos)
  }
}

module.exports = Inserter
