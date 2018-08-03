const fs = require('fs')
const {resolve, join} = require('path')


const getFiles = (root) => {
  let result = []
  fs.readdirSync(root).forEach(file => {
    const path = join(root, file)
    const stat = fs.statSync(path);
    if (!stat.isDirectory()) {
      result.push(file)
    } else {
      result = result.concat(getFiles(path).map(f => join(file, f)))
    }
  })
  return result.filter(file => file.endsWith('.js') && !file.endsWith('.inspect.js') && !file.endsWith('.original.js'))
}

exports.getFiles = (root, shouldResolve = true) => {
  let files = getFiles(root)
  if (shouldResolve) files = files.map(file => resolve(root, file))
  return files
}