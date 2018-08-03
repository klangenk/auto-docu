#!/usr/bin/env node
const enableInspection = require('../src/bin/enableInspection')
const { getFiles } = require('../src/helpers')

getFiles(process.argv[2]).forEach(enableInspection)