#!/usr/bin/env node
const clean = require('../lib/bin/clean')
const { getFiles } = require('../lib/helpers')

const restore = process.argv.includes('--restore')

getFiles(process.argv[2]).forEach(file => clean(file, restore))