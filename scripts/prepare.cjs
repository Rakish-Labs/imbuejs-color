const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const targetPath = path => join(__dirname, path)

const pkg = JSON.parse(readFileSync(targetPath('../package.json')))

/** Remove unnecessary fields from the package.json to be packaged */
delete pkg.scripts
delete pkg.type
delete pkg.devDependencies

writeFileSync(targetPath('../pkg.json'), JSON.stringify(pkg, null, 2))
