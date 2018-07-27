module.exports = (test) => {
  test.test1({
    param1: 'asdf',
    param2: true,
    param3: 1234,
    param4: {},
    param5: () => {},
    param6: false,
    _param7: 1234
  })
  test.test2({
    param1: 'asdf',
    param2: true,
    param3: 1234,
    param4: {},
    param5: () => {},
    param6: false,
    param7: 1234,
    param8: 1234,
    param9: 1234,
    param10: 1234,
    param11: 1234
  })
}