module.exports = filename => {
  const parts = filename.split('.')
  const ext = parts.pop()
  const name = parts.join('.')

  return {
    src: filename,
    meta: `${name}.meta.json`,
    original: `${name}.original`,
    inspect: `${name}.inspect.json`,
  }
}
