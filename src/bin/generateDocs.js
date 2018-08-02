const getFilenames = require('../filenames')
const JsDoc = require('../JsDoc')
const fs = require('fs')

module.exports = (file) => {
  const filenames = getFilenames(file)
  const meta = require(filenames.meta)
  let inspect = []
  try {  
    inspect = require(filenames.inspect)
  } catch (err) {
    console.log(err)
  }

  if (!meta.length) return 

  const source = fs.readFileSync(filenames.original).toString()
    
  const result = new JsDoc(meta, inspect).write(source)
  fs.writeFileSync(filenames.src, result)

}