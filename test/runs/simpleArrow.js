module.exports = (arrows) => {
  arrows.test1('foo')
  arrows.test2('bar', 1234)
  arrows.test3('bar')
  arrows.test4('bar', 1234)
  arrows.test4('bar', undefined)
}