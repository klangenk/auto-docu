const fs = require('fs')
const getFilenames = require('../filenames')
const putInspect = require('../putInspect')

/**
 * Enable inspection
 * @param {string} filename
 */
function enableInspection (filename) {
  const filenames = getFilenames(filename)

  const originalFile = fs.existsSync(filenames.original)
    ? filenames.original
    : filename

  const original = fs.readFileSync(originalFile).toString()

  const { functions, source } = putInspect(original, filename.replace(/\\/g, '\\\\'))

  fs.writeFileSync(filenames.meta, JSON.stringify(functions, null, 2))

  if (!functions.length) return

  if (originalFile === filename) {
    fs.copyFileSync(filename, filenames.original)
  }

  fs.writeFileSync(filename, source)
}

module.exports = enableInspection
