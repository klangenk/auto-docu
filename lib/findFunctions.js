#!/usr/bin/env node

const regexParts = {
  indentation: `([ \t]*)`,
  fName: `([\\w\\.]+)`,
  paramList: `\\(([\\w,='"\\{\\} ]*?)\\)`,
  paramListArrow: `\\(?([\\w,='"\\{\\} ]*?)\\)?`
 
}

function findFunctions (source) {
  const {indentation, fName, paramList, paramListArrow} = regexParts 
  let regex = new RegExp(`${indentation}.*?${fName}\\s*?${paramList}\\s*?\\{`, 'g')
  
  let match

  const functions = []

  while (match = regex.exec(source)) {
    functions.push({
      pos: match.index,
      full: match[0],
      name: match[2].split('.').pop(),
      indentation: match[1],
      params: extractParams(match[3]),
      paramString: match[3],
      hasBody: true
    })
  }

  regex = new RegExp(`${indentation}.*?${fName}\\s*?=\\s*${paramListArrow}\\s*?=>\\s*(\\{?)`, 'g')

  while (match = regex.exec(source)) {
    functions.push({
      pos: match.index,
      full: match[0],
      name: match[2].split('.').pop(),
      indentation: match[1],
      params: extractParams(match[3]),
      paramString: match[3],
      hasBody: !!match[4]
    })
  }

  return functions
    .filter(({name}) => !name.match(/^(for|if|while}|catch)/))
    .sort((a,b) => a.pos - b.pos)
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
      case ' ':
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