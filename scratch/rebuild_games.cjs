const fs = require('fs');

// Read the original clean file (from git)
const original = fs.readFileSync('src/lib/games_original.ts', 'utf8');

// Read the current broken file to extract the 100 new games
const current = fs.readFileSync('src/lib/games.ts', 'utf8');

// The original ends with the CATEGORIES and helper function exports
// Find where the original GAMES array closes - look for the exports section
const originalEndMarker = '\r\nexport const CATEGORIES: GameCategory[]';
const originalArrayEnd = original.indexOf(originalEndMarker);

// Extract the original base (without closing ];\n) - up to but not including ];
// Find the last game entry end before CATEGORIES
const originalGamesSection = original.slice(0, originalArrayEnd);

// Find where the original games array ends (last game entry)
const origLastGameEnd = originalGamesSection.lastIndexOf('  },\r\n];');
const origBase = originalGamesSection.slice(0, origLastGameEnd + 4); // include '  },'

// Extract the exports footer from original
const exportsFooter = original.slice(originalArrayEnd);

console.log('Original base ends with:', JSON.stringify(origBase.slice(-60)));
console.log('Exports footer starts with:', JSON.stringify(exportsFooter.slice(0, 80)));

// Now extract new games from current broken file
// The new games were added between the two CATEGORIES markers
// The first CATEGORIES appears at char 79352 (inside the broken array)
// The new games are between the original array close and the duplicate CATEGORIES

// Find all ruffle: games that have the "flash", "classic" tags pattern (new games)
const newGameRegex = /  \{\n    slug: "[^"]+",\n    title: "[^"]+",\n    description: "[^"]+",\n    category: "Flash",\n    thumbnail: "https:\/\/archive\.org\/services\/img\/[^"]+",\n    embed: "ruffle:[^"]+",\n    rating: \d+\.\d+,\n    plays: \d+,\n    tags: \["flash", "classic"\],\n    source: "Internet Archive"\n  \}/g;

const newGames = current.match(newGameRegex);
console.log('\nNew games found:', newGames ? newGames.length : 0);

if (newGames && newGames.length > 0) {
  // Build the merged file
  const merged = origBase + ',\n' + newGames.join(',\n') + '\n];\n' + exportsFooter;
  fs.writeFileSync('src/lib/games.ts', merged);
  console.log('Merged file written successfully!');
  
  // Cleanup temp file
  fs.unlinkSync('src/lib/games_original.ts');
} else {
  console.log('ERROR: Could not extract new games!');
}
