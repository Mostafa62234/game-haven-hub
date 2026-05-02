const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Parse current GAMES
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
if (!gamesMatch) {
  console.log('Could not find GAMES array.');
  process.exit(1);
}

let games = eval(gamesMatch[1]);

// First, remove any existing wheely or snail bob games to avoid duplicates or broken ones
games = games.filter(g => !g.slug.includes('wheely') && !g.slug.includes('snail-bob'));

const newGames = [];

// Wheely 1-8
for (let i = 1; i <= 8; i++) {
  const swf = i === 1 ? 'Wheely.swf' : `Wheely${i}.swf`;
  const slug = `wheely-${i}`;
  newGames.push({
    slug,
    title: `Wheely ${i}`,
    description: `Help Wheely the little red car on his adventure in part ${i} of this classic puzzle series.`,
    category: "Flash",
    thumbnail: `https://archive.org/services/img/wheely-games_202205`,
    embed: `ruffle:https://archive.org/cors/wheely-games_202205/${swf}`,
    rating: 4.4 + (Math.random() * 0.4), // 4.4 to 4.8
    plays: Math.floor(2000000 + Math.random() * 5000000),
    tags: ["flash", "puzzle", "classic", "car"],
    source: "Internet Archive"
  });
}

// Snail Bob 1-8
const snailBobSwfs = [
  { num: 1, name: 'snail-bob.swf', title: 'Snail Bob' },
  { num: 2, name: 'snail-bob-2.swf', title: 'Snail Bob 2' },
  { num: 3, name: 'snail-bob-3.swf', title: 'Snail Bob 3' },
  { num: 4, name: 'snail-bob-space.swf', title: 'Snail Bob 4: Space' },
  { num: 5, name: 'snail-bob-5-love-story.swf', title: 'Snail Bob 5: Love Story' },
  { num: 6, name: 'snail-bob-6-winter-story.swf', title: 'Snail Bob 6: Winter Story' },
  { num: 7, name: 'snail-bob-7-fantasy-story.swf', title: 'Snail Bob 7: Fantasy Story' },
  { num: 8, name: 'snail-bob-8-island-story.swf', title: 'Snail Bob 8: Island Story' }
];

for (const sb of snailBobSwfs) {
  newGames.push({
    slug: `snail-bob-${sb.num}`,
    title: sb.title,
    description: `Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.`,
    category: "Flash",
    thumbnail: `https://archive.org/services/img/snail-bob-collection`,
    embed: `ruffle:https://archive.org/cors/snail-bob-collection/${sb.name}`,
    rating: 4.5 + (Math.random() * 0.4),
    plays: Math.floor(3000000 + Math.random() * 6000000),
    tags: ["flash", "puzzle", "classic", "logic"],
    source: "Internet Archive"
  });
}

// Add new games to the top of Flash games (after retro sort logic if we want, or just at the beginning of the array)
// Actually, let's just push them to the end of the array, the search/filter will find them.
games.push(...newGames);

const gamesString = JSON.stringify(games, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"ruffle:/g, '"ruffle:')
  .replace(/"jsdos:/g, '"jsdos:');
  
code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);

fs.writeFileSync('src/lib/games.ts', code);
console.log(`Added 8 Wheely games and 8 Snail Bob games.`);
