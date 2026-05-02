const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
let games = eval(gamesMatch[1]);

const sushiCats = [
  { slug: 'sushi-cat', title: 'Sushi Cat', swf: 'sushi-cat.swf' },
  { slug: 'sushi-cat-honeymoon', title: 'Sushi Cat: Honeymoon', swf: 'sushicatthehoneymoon.swf' },
  { slug: 'sushi-cat-2', title: 'Sushi Cat 2', swf: 'sushicat2ag.swf' },
  { slug: 'sushi-cat-2-purrade', title: 'Sushi Cat 2: The Great Purrade', swf: 'sushicat2thegreatpurrade.swf' }
];

for (const sc of sushiCats) {
  if (!games.find(g => g.slug === sc.slug)) {
    games.push({
      slug: sc.slug,
      title: sc.title,
      description: "Feed the blue cat as much sushi as possible to help him reach his true love!",
      category: "Flash",
      thumbnail: "https://archive.org/services/img/sushi-cat-flash-game-series",
      embed: `ruffle:https://archive.org/cors/sushi-cat-flash-game-series/${sc.swf}`,
      rating: 4.8,
      plays: 2500000,
      tags: ["flash", "physics", "puzzle", "classic"],
      source: "Internet Archive"
    });
  }
}

if (!games.find(g => g.slug === 'age-of-war-2')) {
  games.push({
    slug: "age-of-war-2",
    title: "Age of War 2",
    description: "The epic strategy game returns with more units, ages, and upgrades. Battle through time to destroy your enemy's base!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/ageofwar2_202401",
    embed: "ruffle:https://archive.org/cors/ageofwar2_202401/age-of-war-2-publicOTM3.swf",
    rating: 4.9,
    plays: 10000000,
    tags: ["flash", "strategy", "defense", "classic"],
    source: "Internet Archive"
  });
}

const gamesString = JSON.stringify(games, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"ruffle:/g, '"ruffle:')
  .replace(/"jsdos:/g, '"jsdos:');

code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
fs.writeFileSync('src/lib/games.ts', code);
console.log('Added Sushi Cat and Age of War 2.');
