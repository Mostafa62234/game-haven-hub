const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// 1. Find the broken CATEGORIES block
const catStart = code.indexOf('export const CATEGORIES: GameCategory[] = [');
const catEnd = code.indexOf('];', catStart);

// 2. Extract the content between [ and ];
const catContent = code.slice(catStart + 43, catEnd);

// 3. Separate strings from objects in that block
const items = catContent.split(/,(?!\s*")/); // Split by comma not followed by space and quote
const strings = [];
const objects = [];

// This split might be tricky. Let's try a different approach.
// Let's just find the first { in the CATEGORIES block.
const firstBrace = catContent.indexOf('{');
const categoryStrings = catContent.slice(0, firstBrace).trim().replace(/,$/, '').replace(/,$/, '');

const gameObjects = catContent.slice(firstBrace).trim();

// 4. Reconstruct the file
// The objects should go into the GAMES array.
// Let's find where the GAMES array currently ends.
const gamesEnd = code.lastIndexOf('];', catStart); 

let newGAMES = code.slice(0, gamesEnd).trim();
if (newGAMES.endsWith(',')) newGAMES = newGAMES.slice(0, -1);
newGAMES += ',\n' + gameObjects + '\n];';

const cleanCATEGORIES = `export const CATEGORIES: GameCategory[] = [
  "Arcade",
  "Puzzle",
  "Multiplayer",
  "Strategy",
  "Casual",
  "Retro",
  "Flash",
];`;

const footer = code.slice(catEnd + 2);

const finalCode = newGAMES + '\n\n' + cleanCATEGORIES + footer;

fs.writeFileSync('src/lib/games.ts', finalCode);
console.log('Successfully moved games from CATEGORIES to GAMES and cleaned up!');
