/**
 * Test1
 * @param {string} a
 * @returns {Promise<number>}
 */
async function test1 (a) {
  return 5
}

const obj = {
  /**
   * Test2
   * @param {string} a
   * @returns {Promise<number>}
   */
  async test2 (a) {
    return 5
  }
}

/**
 * Test3
 * @param {string} a
 * @returns {Promise<number>}
 */
const test3 = (a) => {
  return test1(a)
}

/**
 * Test4
 * @param {string} a
 * @returns {Promise<number>}
 */
const test4 = async (a) => {
  return 5
}

/**
 * Test5
 * @param {string} a
 * @returns {Promise<Object>}
 */
const test5 = async a => {
  return {}
}

/**
 * Test6
 * @param {string} a
 * @returns {Promise<number>}
 */
const test6 = async a => {
  const result = await test1(a)
  return result
}

/**
 * Test7
 * @param {string} a
 * @returns {Promise<number>}
 */
const test7 = a => test1(a)

module.exports = {
  test1,
  test2: obj.test2,
  test3,
  test4,
  test5,
  test6,
  test7
}
