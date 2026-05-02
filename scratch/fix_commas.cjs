const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Replace instances like },\n\n,{ with },\n{
code = code.replace(/\},\s*,\s*\{/g, '},\n  {');

fs.writeFileSync('src/lib/games.ts', code);
console.log('Fixed double commas array elements.');
