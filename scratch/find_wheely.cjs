const fs = require('fs');
const code = fs.readFileSync('src/lib/games.ts', 'utf8');
const match = code.match(/slug: "wheely-1"[\s\S]+?\}/);
console.log(match ? match[0] : 'not found');
