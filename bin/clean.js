#!/usr/bin/env node
const fs = require('fs')
const getFilenames = require('../lib/filenames')
const { getFiles } = require('../lib/helpers')

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

function clean (filename) {
  const filenames = getFilenames(filename)
  remove(filenames.inspect)
  remove(filenames.meta)
  // istanbul ignore else
  if (process.argv.includes('--restore')) copy(filenames.original, filename)
  remove(filenames.original)
}

getFiles(process.argv[2]).forEach(clean)
