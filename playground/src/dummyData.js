exports.definition = `function firstFunction (a, b, c=12) {
  return 'foo'
}

function helperFunction(a) {
  return {}
}

const asyncFunction = async (param) => {
  return helperFunction(param)
}

function destructured ({foo, bar: {batz}}) {
  return 7
}`

exports.calls = `const obj = {foo: '5'}
firstFunction('test', obj, 3)
await asyncFunction('foo')
destructured({foo: 5, bar: {batz: 'test'}})`
