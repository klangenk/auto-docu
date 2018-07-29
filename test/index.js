
const util = require('util');
const path = require('path');
const fs = require('fs')
const assert = require('assert')
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const moveFile = util.promisify(fs.rename)
const src = path.resolve(__dirname, 'src')
const snapshots = path.resolve(__dirname, 'snapshots')
const runs = path.resolve(__dirname, 'runs')
const files = fs.readdirSync(src)
const changeCase = require('change-case')

function formatFilename(file) {
  return changeCase.sentenceCase(
    file.split('.').slice(0, -1).join('.')
  )
}

before(async function() {
  this.timeout(10000);

  // Test if the original file is used if it exists
  await moveFile(path.resolve(src, 'simple.js'), path.resolve(src, 'simple.original'))
  await writeFile(path.resolve(src, 'simple.js'), '')

  await exec(`enable-inspection ${src}`)
  for (const file of files) {
    try {
      const run = require(path.resolve(runs, file))
      const test = require(path.resolve(src, file))
      run(test)
    } catch (err) {}
  }
  const {stdout} = await exec(`generate-doc ${src}`)
  console.log(stdout)
})

after(async() => {
  await exec(`cleanup-inspection ${src} --restore`)
})

describe('Check snapshots', () => {
  for (const file of files) {
    it(formatFilename(file), async () => {
      const [actual, expected] = await Promise.all([
        readFile(path.resolve(src, file), 'utf-8'),
        readFile(path.resolve(snapshots, file), 'utf-8')
      ])

      assert.equal(actual, expected)
    })
  }
  
})