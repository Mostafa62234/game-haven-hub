const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Replace the untyped JS exports with proper TypeScript
code = code.replace(
  `export function getGame(slug) {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelatedGames(game, count = 4) {`,
  `export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelatedGames(game: Game, count = 4): Game[] {`
);

fs.writeFileSync('src/lib/games.ts', code);
console.log('Fixed TypeScript types!');
