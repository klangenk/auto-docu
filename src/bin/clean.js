const fs = require('fs')
const getFilenames = require('../filenames')

/**
 * Remove
 * @param {string} file
 */
const remove = (file) => {
  try {
    fs.unlinkSync(file)
  } catch (err) {

  }
}

/**
 * Copy
 * @param {string} from
 * @param {string} to
 */
const copy = (from, to) => { 
  try { 
    fs.copyFileSync(from, to) 
  } catch (err) { 
 
  } 
} 

/**
 * Clean
 * @param {string} filename
 * @param {boolean} restore
 */
function clean (filename, restore) {
  const filenames = getFilenames(filename)
  remove(filenames.inspect)
  remove(filenames.meta)
  if (restore) copy(filenames.original, filename)
  remove(filenames.original)
}

module.exports = clean

