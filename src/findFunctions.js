const regexParts = {
  indentation: `^([ \t]*)`,
  fName: `([\\w\\.]+)`,
  paramList: `\\(([\\w,='"\\{\\}: ]*?)\\)`,
  paramListArrow: `\\(?([\\w,='"\\{\\}: ]*?)\\)?`,
  comment: `((?:(?:[^\n]*(?:\\/\\/|\\/\\*|\\*)\\s*.*\n)+)?)`,
  async: '(?:(async)?)'
}



function findFunctions (source) {
  const {indentation, fName, paramList, paramListArrow, comment, async} = regexParts 
  let regex = new RegExp(`${comment}${indentation}${async}[^,\n\(]*?${fName}\\s*?${paramList}\\s*?\\{`, 'gm')
  
  let match

  const functions = []

  while (match = regex.exec(source)) {
    const func = {
      pos: match.index,
      full: match[0],
      async: !!match[3],
      name: match[4].split('.').pop(),
      indentation: match[2],
      params: extractParams(match[5]),
      paramString: match[5],
      hasBody: true,
      comment: match[1],
      body: {
        start: match.index + match[0].length,
        end: findEnd(source, match.index + match[0].length)
      }
    }
    functions.push(func)
  }

  regex = new RegExp(`${comment}${indentation}.*?${fName}\\s*?=\\s*${async}\\s*${paramListArrow}\\s*?=>\\s*(\\{?)`, 'gm')
  while (match = regex.exec(source)) {
    const func = {
      pos: match.index,
      full: match[0],
      async: !!match[4],
      name: match[3].split('.').pop(),
      indentation: match[2],
      params: extractParams(match[5]),
      paramString: match[5],
      hasBody: !!match[6],
      comment: match[1],
      body: {
        start: match.index + match[0].length,
        end: match[6] ? findEnd(source, match.index + match[0].length) : match.index + match[0].length
      }
    }
    functions.push(func)
  }

  return functions
    .filter(({name}) => !name.match(/^(for|if|while}|catch)/))
    .sort((a,b) => a.pos - b.pos)
}

function findEnd(src, bodyStart) {
  const stack = ['{']
  let lastStringStart
  for (let i = bodyStart; i < src.length; i++) {
    switch (src[i]) {
      case '\\':
        i++
        break
      case '`':
      case '\'':
      case '"':
      case '/':
        if (lastStringStart) {
          if (lastStringStart === src[i]) {
            lastStringStart = null
          }
        } else {
          lastStringStart = src[i]
        }
        break;
      case '{':
        if (lastStringStart) break;
        stack.push('{')
        break
      case '}':
        if (lastStringStart) break;
        stack.pop()
        if (!stack.length) return i
        break
    }
  }
}


function extractParams (params) {
  if (!params.trim().length) return []
  const stack = []
  let actParam = ''
  const result = []
  for (let i = 0; i < params.length; i++) {
    switch (params[i]) {
      case '{':
        stack.push('{')
        actParam += params[i]
        break
      case '}':
        stack.pop()
        actParam += params[i]
        break
      case ',':
        if (!stack.length) {
          result.push(actParam)
          actParam = ''
          break
        }        
      
      default:
        actParam += params[i]
    }
  }

  result.push(actParam)
  
  let destructIndex = 0
  return result.map(param => {
    const [name, defaultValue] = param.split('=').map(part => part.trim())
    return {
      accessor: name,
      name: name.includes('{') ? `param${destructIndex++}` : name,
      defaultValue
    }
  })
}

module.exports = findFunctions