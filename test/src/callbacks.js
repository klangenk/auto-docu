function test1 (a, b, cb) {
  cb(null, 25)
}

function test2 (a, cb) {
  test1(a, 'foo', (err, value) => {
    if (err) return cb(err)
    cb(null, value + 3)
  })
}

function test3 (a, cb) {
  test1(a, 'bar', (err) => cb(err, 14))
}

function test4 (a, callback) {
  test1(a, 'foo', function (err, value) {
    if (err) return callback(err)
    callback(null, value + 3)
  })
}

const test5 = (cb) => cb()

const test6 = (cb) => {
  test5((err) => cb(err))
}

const test7 = (cb) => {
  test5(err => cb(err))
}

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
