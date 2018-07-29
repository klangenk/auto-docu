/**
 * Test1
 * @param {string} a
 * @returns {Promise}
 */
async function test1 (a) {
  return 5
}

const obj = {
  /**
   * Test2
   * @param {string} a
   * @returns {Promise}
   */
  async test2 (a) {
    return 5
  }
}

/**
 * Test3
 * @param {string} a
 * @returns {Promise}
 */
const test3 = (a) => {
  return test1(a)
}

/**
 * Test4
 * @param {string} a
 * @returns {Promise}
 */
const test4 = async (a) => {
  return 5
}

/**
 * Test5
 * @param {string} a
 * @returns {Promise}
 */
const test5 = async a => {
  return 5
}

module.exports = {
  test1,
  test2: obj.test2,
  test3,
  test4,
  test5
}