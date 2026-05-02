const fs = require('fs');
const code = fs.readFileSync('src/lib/games.ts', 'utf8');
const match = code.match(/slug: "stick-rpg-complete"[\s\S]+?\}/);
console.log(match ? match[0] : 'not found');
