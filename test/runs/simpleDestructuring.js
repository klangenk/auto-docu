module.exports = (simple) => {
  simple({
    foo: 'asdf',
    bar: true,
    batz: 1234
  })
  simple({
    foo: 'test',
    bar: false
  })
}