async function test1 (a) {
  return 5
}

const obj = {
  async test2 (a) {
    return 5
  }
}

const test3 = (a) => {
  return test1(a)
}

const test4 = async (a) => {
  return 5
}

const test5 = async a => {
  return {}
}

const test6 = async a => {
  const result = await test1(a)
  return result
}

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
