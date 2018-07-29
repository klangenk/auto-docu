/**
 * Test1
 * @param {string} a
 * @param {string} b
 * @param {function} cb
 */
function test1 (a, b, cb) {
  cb(null, 25)
}

/**
 * Test2
 * @param {string} a
 * @param {function} cb
 */
function test2 (a, cb) {
  test1(a, 'foo', (err, value) => {
    if (err) return cb (err)
    cb(value + 3)
  })
}

/**
 * Test3
 * @param {string} a
 * @param {function} cb
 */
function test3 (a, cb) {
  test1(a, 'bar', (err) => cb(err, 14))
}

/**
 * Test4
 * @param {string} a
 * @param {function} callback
 */
function test4 (a, callback) {
  test1(a, 'foo', function (err, value) {
    if (err) return callback (err)
    callback(value + 3)
  })
}

/**
 * Test5
 * @param {function} cb
 */
const test5 = (cb) => cb()

/**
 * Test6
 * @param {function} cb
 */
const test6 = (cb) => {
  test5((err) => cb(err))
}

/**
 * Test7
 * @param {function} cb
 */
const test7 = (cb) => {
  test5(err => cb(err))
}

/**
 * Test8
 * @param {function} cb
 */
const test8 = (cb) => {
  test5(function (err) {
    cb(err)
  })
}

module.exports = {
  test1,
  test2,
  test3,
  test4,
  test5,
  test6,
  test7,
  test8
}