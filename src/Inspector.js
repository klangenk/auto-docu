const fs = require('fs')
const getFilenames = require('./filenames')
require('./prunedJSON')

function mapParam (value) {
  if (value === null || value === undefined) {
    return {}
  }
  let type = typeof value

  if (value.constructor && value.constructor.name) {
    type = value.constructor.name
  }

  if (type === 'Object') {
    return {
      type,
      params: Object.keys(value).reduce((result, key) => {
        result[key] = mapParam(value[key])
        return result
      }, {})
    }
  }

  if (type === 'Array') {
    return {
      type,
      params: value.map(mapParam)
    }
  }

  return {
    type
  }
  
  
}


class Inspector {
  constructor (filename, onUpdate) {
    this.calls = []
    this.onUpdate = onUpdate || ((calls) => {
      fs.writeFileSync(getFilenames(filename).inspect, JSON.stringify(calls))
    })
  }

  inspect (index, func, ...params) {
    const returns = func(...params)
    if (!this.calls[index]) this.calls[index] = []
    this.calls[index].push({
      params: params.map(mapParam),
      returns: mapParam(returns)
    })
    this.onUpdate(this.calls)
    return returns
  }


}

module.exports = Inspector
