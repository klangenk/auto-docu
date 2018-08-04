const Inserter = require('./Inserter')
const findFunctions = require('./findFunctions')

/**
 * Put inspect
 * @param {string} source
 * @param {string} fileId
 * @param {boolean} [skipInit=false]
 * @returns {Object}
 */
function putInspect (source, fileId, skipInit = false) {
  const functions = findFunctions(source)

  if (!functions.length) return { functions }

  const inserter = new Inserter(source)

  if (!skipInit) {
    inserter.insert(`const {Inspector} = require('auto-docu')\n`, 0)
    inserter.insert(`var inspector = new Inspector(${`'${fileId}'`})\n\n`, 0)
  }

  functions.forEach((func, i) => {
    let cb = `() => { ${inserter.original.slice(func.body.start, func.body.end)} }`
    if (func.async) cb = `async ${cb}`
    let inspect
    if (func.hasBody) {
      inspect = `return inspector.inspect(${[i, cb, ...func.params.map(p => p.accessor)].join(', ')})`
    } else {
      inspect = `inspector.inspectInline(${[i, ...func.params.map(p => p.accessor)].join(', ')}).returns = `
    }

    inserter.insert(inspect, func.body.start, func.body.end)
  })

  return {
    source: inserter.source,
    functions
  }
}

module.exports = putInspect
