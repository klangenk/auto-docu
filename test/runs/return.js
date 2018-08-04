const assert = require('assert')

module.exports = (test) => {
  assert.strictEqual(test.test1('foo'), 5)
  assert.strictEqual(test.test2('foo'), 5)
  assert.deepStrictEqual(test.test3('foo'), {
    foo: 'bar'
  })
  assert.strictEqual(test.test4('foo'), 5)
  assert.strictEqual(test.test4(), 8)
  assert.strictEqual(test.test5(), 5)
  assert.strictEqual(test.test6(), 'test')
}
