const fs = require('fs');
const content = fs.readFileSync('src/lib/games.ts', 'utf8');
const matches = [...content.matchAll(/slug:\s*"([^"]+)"[\s\S]*?embed:\s*"([^"]+)"/g)];
matches.forEach(m => console.log(`${m[1]} => ${m[2]}`));
