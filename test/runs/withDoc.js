module.exports = (test) => {
  test.test1('test',5)
  test.test2('')
  test.test3('foo')
  test.test4('bar')
  test.test5({a: 'foo', b: 5})
  test.test6({a: 'foo', b: {c: 5}}, {d: false})
}