const fs = require('fs');
const code = fs.readFileSync('src/lib/games.ts', 'utf8');
const match = code.match(/embed: "https:\/\/archive\.org\/embed\/[^"]+"/g) || [];
match.forEach(m => { if (!m.includes('msdos_')) console.log(m); });
