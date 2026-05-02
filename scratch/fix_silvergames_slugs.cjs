const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// The file exports an array called GAMES. We can use a regex to match objects.
// Since the structure is consistent:
// slug: "run-3",
// ...
// embed: "https://www.silvergames.com/en//iframe",
// We can replace the embed line by looking for the slug.

let inGamesArray = false;
let currentSlug = null;
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
  if (slugMatch) {
    currentSlug = slugMatch[1];
  }
  
  if (line.includes('silvergames.com/en//iframe') && currentSlug) {
    lines[i] = line.replace('https://www.silvergames.com/en//iframe', `https://www.silvergames.com/en/${currentSlug}/iframe`);
  }
}

fs.writeFileSync('src/lib/games.ts', lines.join('\n'));
console.log('Fixed missing slugs in SilverGames URLs!');
