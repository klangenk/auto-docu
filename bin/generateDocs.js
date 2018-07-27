#!/usr/bin/env node
const { getFiles } = require('../lib/helpers')
const getFilenames = require('../lib/filenames')
const JsDoc = require('../lib/JsDoc')

getFiles(process.argv[2]).forEach(file => {
  const filenames = getFilenames(file)
  const meta = require(filenames.meta)
  let inspect = []
  try {  
    inspect = require(filenames.inspect)
  } catch (err) {
    console.log(err)
  }
  new JsDoc(file, meta, inspect).write()

})