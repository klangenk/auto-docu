const assert = require('assert')

module.exports = async (test) => {
  assert.strictEqual(await test.test1('test'), 5)
  assert.strictEqual(await test.test2('test'), 5)
  assert.strictEqual(await test.test3('test'), 5)
  assert.strictEqual(await test.test4('test'), 5)
  assert.deepStrictEqual(await test.test5('test'), {})
  assert.strictEqual(await test.test6('test'), 5)
  assert.strictEqual(await test.test7('test'), 5)
}
