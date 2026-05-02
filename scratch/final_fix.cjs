const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
let games = eval(gamesMatch[1]);

// 1. Remove duplicates and Prince of Persia
const seen = new Set();
games = games.filter(g => {
  if (seen.has(g.slug)) return false;
  if (g.slug.includes('prince-of-persia')) return false;
  if (g.slug === 'snake') return false;
  seen.add(g.slug);
  return true;
});

// 2. Add Gunball Reloaded
if (!games.find(g => g.slug === 'gunball-reloaded')) {
  games.push({
    slug: "gunball-reloaded",
    title: "Gunball Reloaded",
    description: "The upgraded version of the action-packed shooter. Battle enemies and upgrade your gunball!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/gunball-reloaded",
    embed: "ruffle:https://archive.org/cors/gunball-reloaded/gunball-reloaded.swf",
    rating: 4.6,
    plays: 1500000,
    tags: ["flash", "action", "shooter"],
    source: "Internet Archive"
  });
}

// 3. Re-add Curated Classics (if missing)
const curated = [
  { slug: 'btd1', title: 'Bloons Tower Defense', id: 'btd1_flashgame', swf: 'BTD1.swf' },
  { slug: 'fancy-pants-2', title: 'Fancy Pants 2', id: 'fancypantsworld2', swf: 'FancyPantsWorld2.swf' },
  { slug: 'electric-man-2', title: 'Electric Man 2', id: 'electric-man-2-hs_flash', swf: 'ElectricMan2HS.swf' }
];

for (const c of curated) {
  if (!games.find(g => g.slug === c.slug)) {
    games.push({
      slug: c.slug,
      title: c.title,
      description: `Play ${c.title} classic Flash game.`,
      category: "Flash",
      thumbnail: `https://archive.org/services/img/${c.id}`,
      embed: `ruffle:https://archive.org/cors/${c.id}/${c.swf}`,
      rating: 4.8,
      plays: 5000000,
      tags: ["flash", "classic"],
      source: "Internet Archive"
    });
  }
}

const gamesString = JSON.stringify(games, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"ruffle:/g, '"ruffle:')
  .replace(/"jsdos:/g, '"jsdos:');

code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
fs.writeFileSync('src/lib/games.ts', code);
console.log('Final cleanup and additions complete.');
