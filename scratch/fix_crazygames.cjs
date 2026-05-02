const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Replace all CrazyGames embed URLs with the direct games domain URL
code = code.replace(/https:\/\/www\.crazygames\.com\/embed\/([^"]+)/g, 'https://games.crazygames.com/en_US/$1/index.html');

fs.writeFileSync('src/lib/games.ts', code);
console.log('Successfully updated CrazyGames embed URLs to bypass the iframe block!');
