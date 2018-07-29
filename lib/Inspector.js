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
  constructor (filename) {
    this.calls = []
    this.filename = filename
  }

  inspect (index, func, ...params) {
    const returns = func(...params)
    if (!this.calls[index]) this.calls[index] = []
    this.calls[index].push({
      params: params.map(mapParam),
      returns
    })
    fs.writeFileSync(getFilenames(this.filename).inspect, JSON.pruned(this.calls, 10))
    return returns
  }
}

module.exports = Inspector
