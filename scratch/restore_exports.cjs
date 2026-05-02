const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

const missing = `
export const CATEGORIES = [
  "Arcade",
  "Puzzle",
  "Multiplayer",
  "Strategy",
  "Casual",
  "Retro",
  "Flash",
];

export function getGame(slug) {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelatedGames(game, count = 4) {
  return GAMES.filter((g) => g.slug !== game.slug && g.category === game.category)
    .slice(0, count)
    .concat(GAMES.filter((g) => g.slug !== game.slug && g.category !== game.category))
    .slice(0, count);
}
`;

// Check if exports already exist
if (!code.includes('export function getGame')) {
  code = code + missing;
  fs.writeFileSync('src/lib/games.ts', code);
  console.log('Restored missing exports!');
} else {
  console.log('Exports already present, no changes needed.');
}
