const fs = require('fs')
const getFilenames = require('./filenames')
require('./prunedJSON')

function mapParam (param) {
  if (typeof param === 'function') {
    return '__FUNCTION__'
  }
  return param
}


class Inspector {
  constructor (filename, onUpdate) {
    this.calls = []
    this.onUpdate = onUpdate || ((calls) => {
      fs.writeFileSync(getFilenames(filename).inspect, JSON.pruned(calls, 10))
    })
  }

  inspect (index, func, ...params) {
    const returns = func(...params)
    if (!this.calls[index]) this.calls[index] = []
    this.calls[index].push({
      params: params.map(mapParam),
      returns
    })
    this.onUpdate(this.calls)
    return returns
  }
}

module.exports = Inspector
