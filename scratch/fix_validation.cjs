const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Find the last ]; in the file, and trim everything after it
const lastBracket = code.lastIndexOf('];');
if (lastBracket !== -1) {
  code = code.slice(0, lastBracket + 2) + '\n';
}

fs.writeFileSync('src/lib/games.ts', code);
console.log('Cleaned. Final chars:');
console.log(JSON.stringify(code.slice(-50)));
