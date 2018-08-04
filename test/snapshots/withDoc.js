/**
 * Awesome description
 * @param {string} a first parameter
 * @param {number} b second parameter
 */
function test1 (a, b) {

}

/**
 * Awesome description 2
 * @param {string} a first parameter
 */
function test2 (a) {

}

/**
 * Awesome description 3
 * @param {string} a
 */
function test3 (a) {

}

/**
 * Awesome description 4
 * @param {string} a
 */
function test4 (a) {

}

/**
 * Awesome description 5
 * @param {Object} param0
 * @param {string} param0.a the first parameter
 * @param {number} param0.b the second parameter
 */
function test5 ({a, b}) {

}

/**
 * Awesome description 6
 * @param {Object} param0
 * @param {string} param0.a the first parameter
 * @param {Object} param0.b
 * @param {number} param0.b.c the second parameter
 * @param {Object} param1
 * @param {boolean} param1.d the third parameter
 */
function test6 ({a, b: { c }}, {d}) {

}

module.exports = {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6
}
