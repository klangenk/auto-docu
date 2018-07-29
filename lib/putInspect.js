#!/usr/bin/env node
const fs = require('fs')
const getFilenames = require('./filenames')
const Inserter = require('./Inserter')
const findFunctions = require('./findFunctions')


function putInspect (filename) {

  const filenames = getFilenames(filename)

  const original = fs.existsSync(filenames.original) ?
    filenames.original :
    filename

  let source = fs.readFileSync(original).toString()

  const functions = findFunctions(source)
  
  const inserter = new Inserter(source)

  inserter.insert(`const {Inspector} = require(\'auto-docu\')\nconst inspector = new Inspector('${filename.replace(/\\/g, '\\\\')}')\n\n`, 0)

  


  functions.forEach((func, i) => {
    const cb = `() => { ${inserter.original.slice(func.body.start, func.body.end)} }`
    let after = `inspector.inspect(${[i, cb, ...func.params.map(p=>p.accessor)].join(', ')})`
    if (func.hasBody) {
      after = `return ${after}`
    } else {
      after += " || "
    }

    inserter.insert(after, func.body.start, func.body.end)
  })

  if (original === filename) {
    fs.copyFileSync(original, filenames.original)
  }

  fs.writeFileSync(filename, inserter.source)
  fs.writeFileSync(filenames.meta, JSON.stringify(functions, null, 2))
}

module.exports = putInspect
