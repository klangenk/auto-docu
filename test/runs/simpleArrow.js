
const assert = require('assert')

module.exports = (arrows) => {
  arrows.test1('foo')
  assert.strictEqual(arrows.test2('bar', 1234), 5)
  assert.strictEqual(arrows.test3('bar'), 5)
  assert.strictEqual(arrows.test4('bar', 1234), 5)
  assert.strictEqual(arrows.test4('bar', undefined), 5)
}
