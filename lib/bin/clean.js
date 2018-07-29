const fs = require('fs')
const getFilenames = require('../filenames')

const remove = (file) => {
  try {
    fs.unlinkSync(file)
  } catch (err) {

  }
}

const copy = (from, to) => { 
  try { 
    fs.copyFileSync(from, to) 
  } catch (err) { 
 
  } 
} 

function clean (filename, restore) {
  const filenames = getFilenames(filename)
  remove(filenames.inspect)
  remove(filenames.meta)
  if (restore) copy(filenames.original, filename)
  remove(filenames.original)
}

module.exports = clean

