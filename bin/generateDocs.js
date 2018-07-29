#!/usr/bin/env node
const generateDocs = require('../lib/bin/generateDocs')
const { getFiles } = require('../lib/helpers')

getFiles(process.argv[2]).forEach(generateDocs)