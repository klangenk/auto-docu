#!/usr/bin/env node
const enableInspection = require('../lib/bin/enableInspection')
const { getFiles } = require('../lib/helpers')

getFiles(process.argv[2]).forEach(enableInspection)