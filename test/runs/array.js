module.exports = (test) => {
  test.test1([])
  test.test2(['asdf'])
  test.test3([['foo']])
  test.test4({ bar: [['test']] })
  test.test5({ bar: [[{}]] })
  test.test6([{foo: 'bar'}])
  test.test7([[{foo: 'bar'}]])
}
