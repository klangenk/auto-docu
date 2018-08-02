const Inserter = require('./Inserter')
const findFunctions = require('./findFunctions')


function putInspect (source, fileId, skipInit = false) {

  const functions = findFunctions(source)

  if (!functions.length) return { functions }
  
  const inserter = new Inserter(source)

  if (!skipInit) {
    inserter.insert(`const {Inspector} = require(\'auto-docu\')\n`, 0)
    inserter.insert(`var inspector = new Inspector(${`'${fileId}'`})\n\n`, 0)
  }

  functions.forEach((func, i) => {
    let cb = `() => { ${inserter.original.slice(func.body.start, func.body.end)} }`
    if (func.async) cb = `async ${cb}`
    let after = `inspector.inspect(${[i, cb, ...func.params.map(p=>p.accessor)].join(', ')})`
    if (func.hasBody) {
      after = `return ${after}`
    } else {
      after += " || "
    }

    inserter.insert(after, func.body.start, func.body.end)
  })

  return {
    source: inserter.source,
    functions
  }
  
}

module.exports = putInspect
