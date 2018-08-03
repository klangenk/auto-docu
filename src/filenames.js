/**
 * Exports
 * @param {string} filename
 * @returns {Object}
 */
module.exports = filename => {
  const parts = filename.split('.')
  parts.pop()
  const name = parts.join('.')

  return {
    src: filename,
    meta: `${name}.meta.json`,
    original: `${name}.original`,
    inspect: `${name}.inspect.json`
  }
}
