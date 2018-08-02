const fs = require('fs')
const getFilenames = require('./filenames')

async function mapParam (value) {
  if (value === null || value === undefined) {
    return {}
  }
  let type = typeof value

  if (value.constructor && value.constructor.name) {
    type = value.constructor.name
  }

  if (type === 'Object') {
    let result = {
      type,
      params: {}
    }
    for (const key in value) {
      result.params[key] = await mapParam(value[key])
    }
    return result
  }

  if (type === 'Array') {
    return {
      type,
      params: await Promise.all(value.map(mapParam))
    }
  }

  if (type === 'Promise') {
    return {
      type,
      param: await mapParam(await value)
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

 

  async handleCall(index, params, returns) {
    if (!this.calls[index]) this.calls[index] = []
    this.calls[index].push({
      params: await Promise.all(params.map(mapParam)),
      returns: await mapParam(returns)
    })
    this.onUpdate(this.calls)
  }

  inspect (index, func, ...params) {
    const returns = func(...params)
    Inspector.promises.push(this.handleCall(index, params, returns))
    return returns
  }
}

Inspector.promises = []

module.exports = Inspector
