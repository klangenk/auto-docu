/**
 * Test1
 * @param {string} a
 * @returns {number}
 */
function test1 (a) {
  return 5
}

/**
 * Test2
 * @param {string} a
 * @returns {number}
 */
function test2 (a) {
  return test1(a)
}

/**
 * Test3
 * @param {string} a
 * @returns {Object}
 */
function test3 (a) {
  return {
    foo: 'bar'
  }
}

/**
 * Test4
 * @param {string} [a]
 * @returns {number}
 */
function test4 (a) {
  if (a) {
    return 5
  }
  return 8
}

/**
 * Test5
 * @returns {number}
 */
function test5 () {
  return 5
}

/**
 * Test6
 * @returns {string}
 */
const test6 = () => 'test'

module.exports = {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6
}
