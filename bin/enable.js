#!/usr/bin/env node
const putInspect = require('../lib/putInspect')
const { getFiles } = require('../lib/helpers')

getFiles(process.argv[2]).forEach(putInspect)