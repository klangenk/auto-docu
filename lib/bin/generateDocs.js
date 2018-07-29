const getFilenames = require('../filenames')
const JsDoc = require('../JsDoc')

module.exports = (file) => {
  const filenames = getFilenames(file)
  const meta = require(filenames.meta)
  let inspect = []
  try {  
    inspect = require(filenames.inspect)
  } catch (err) {
    console.log(err)
  }
  new JsDoc(file, meta, inspect).write()

}