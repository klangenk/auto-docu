#!/usr/bin/env node
const clean = require('../src/bin/clean')
const { getFiles } = require('../src/helpers')

const restore = process.argv.includes('--restore')

getFiles(process.argv[2]).forEach(file => clean(file, restore))