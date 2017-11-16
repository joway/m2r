const fs = require('fs')
const m2r = require('./m2r')

const text = fs.readFileSync('./test.md', 'utf8')

console.log(m2r(text))
