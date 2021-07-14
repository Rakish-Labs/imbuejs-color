const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const argv = require('minimist')(process.argv.slice(2))

const targetPath = join(__dirname, '../package.json')
const pkg = JSON.parse(readFileSync(targetPath))

let bump
if (argv.version === undefined) {
  console.log('No version specified, bumping patch by 1')
  const [major, minor, patch] = pkg.version.split('.')
  bump = [major, minor, (parseInt(patch) + 1).toString()].join('.')
} else {
  console.log(`Bumping to version ${argv.version}`)
  bump = argv.version
}

pkg.version = bump
writeFileSync(targetPath, JSON.stringify(pkg, null, 2))
