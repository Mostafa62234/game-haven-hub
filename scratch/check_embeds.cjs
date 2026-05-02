const fs = require('fs');
const code = fs.readFileSync('src/lib/games.ts', 'utf8');
const match = code.match(/embed: "https:\/\/archive\.org\/embed\/[^"]+"/g) || [];
console.log('Embed count:', match.length);
if (match.length > 0) {
  match.slice(0, 5).forEach(m => console.log(m));
}
