#!/usr/bin/env node
const generateDocs = require('../src/bin/generateDocs')
const { getFiles } = require('../src/helpers')

getFiles(process.argv[2]).forEach(generateDocs)