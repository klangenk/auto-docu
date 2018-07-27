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

  inspect (index, ...params) {
    if (!this.calls[index]) this.calls[index] = []
    this.calls[index].push(params.map(mapParam))
    fs.writeFileSync(getFilenames(this.filename).inspect, JSON.pruned(this.calls, 10))
  }
}

module.exports = Inspector
