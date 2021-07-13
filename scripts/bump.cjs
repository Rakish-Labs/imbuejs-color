const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const targetPath = join(__dirname, '../package.json')

const pkg = JSON.parse(readFileSync(targetPath))

const [major, minor, patch] = pkg.version.split('.')
pkg.version = [major, minor, (parseInt(patch) + 1).toString()].join('.')

writeFileSync(targetPath, JSON.stringify(pkg, null, 2))
