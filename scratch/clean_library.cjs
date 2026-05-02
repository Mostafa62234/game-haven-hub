const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
if (gamesMatch) {
  let games = eval(gamesMatch[1]);
  const originalLength = games.length;

  // 1. Remove duplicates
  const uniqueGames = [];
  const seenSlugs = new Set();
  
  for (const game of games) {
    if (!seenSlugs.has(game.slug)) {
      seenSlugs.add(game.slug);
      uniqueGames.push(game);
    }
  }
  games = uniqueGames;

  // 2. Remove Prince of Persia, Snake, and Impossible Quiz 2
  games = games.filter(g => {
    const slug = g.slug.toLowerCase();
    const title = g.title.toLowerCase();
    
    if (slug.includes('prince-of-persia') || title.includes('prince of persia')) return false;
    if (slug === 'snake' || title === 'snake') return false;
    if (slug === 'the-impossible-quiz-2') return false;
    
    return true;
  });

  const gamesString = JSON.stringify(games, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"ruffle:/g, '"ruffle:')
    .replace(/"jsdos:/g, '"jsdos:');
    
  code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
  
  fs.writeFileSync('src/lib/games.ts', code);
  console.log(`Original count: ${originalLength}`);
  console.log(`New count: ${games.length}`);
  console.log(`Removed ${originalLength - games.length} games (duplicates, broken, etc.)`);
} else {
  console.log("Could not find GAMES array.");
}
