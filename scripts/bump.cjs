#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const yargs = require('yargs')

let argVersion

yargs
  .scriptName('Bump npm version')
  .usage('$0 <cmd> [args]')
  .command(
    'Bump npm version',
    yargs => {
      yargs.positional('version', {
        usage: '--version 1.0.0',
        type: 'string',
        describe:
          'The semver version number to publish; if no version specified, bumping the patch number is default behavior',
      })
    },
    function (argv) {
      argVersion = argv.version
    },
  )
  .help().argv

const targetPath = join(__dirname, '../package.json')

const pkg = JSON.parse(readFileSync(targetPath))

const version = argVersion ? argVersion : pkg.version

const [major, minor, patch] = version.split('.')
pkg.version = [major, minor, (parseInt(patch) + 1).toString()].join('.')

writeFileSync(targetPath, JSON.stringify(pkg, null, 2))
