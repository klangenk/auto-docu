function test1 (a) {
  return 5
}

function test2 (a) {
  return test1(a)
}

function test3 (a) {
  return {
    foo: 'bar'
  }
}

function test4 (a) {
  if (a) {
    return 5
  }
  return 8
}

module.exports = {
  test1,
  test2,
  test3,
  test4
}