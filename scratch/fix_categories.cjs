const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');
code = code.replace('  "Retro",\r\n];', '  "Retro",\r\n  "Flash",\r\n];');
code = code.replace('  "Retro",\n];', '  "Retro",\n  "Flash",\n];');
fs.writeFileSync('src/lib/games.ts', code);
console.log('Fixed CATEGORIES array successfully.');
