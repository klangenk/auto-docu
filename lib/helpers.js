const fs = require('fs')
const {resolve, join} = require('path')


const getFiles = (root) => {
  let result = []
  fs.readdirSync(root).forEach(file => {
    const path = join(root, file)
    const stat = fs.statSync(path);
    if (!stat.isDirectory()) {
      result.push(path)
    } else {
      result = result.concat(getFiles(path))
    }
  })
  return result.filter(file => file.endsWith('.js') && !file.endsWith('.inspect.js') && !file.endsWith('.original.js'))
}

exports.getFiles = (root) => getFiles(resolve(root))