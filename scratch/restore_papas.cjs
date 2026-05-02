const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
let games = eval(gamesMatch[1]);

const existingSlugs = new Set(games.map(g => g.slug));

const papas = [
  { slug: 'papas-pizzeria', title: "Papa's Pizzeria", id: 'papas-pizzeria_flash', swf: 'papas-pizzeria_flash.swf' },
  { slug: 'papas-burgeria', title: "Papa's Burgeria", id: 'PapasBurgeriav1.0.3', swf: 'PapasBurgeriav1.0.3.swf' },
  { slug: 'papas-freezeria', title: "Papa's Freezeria", id: 'papasfreezeria_202011', swf: 'papasfreezeria_v2.swf' },
  { slug: 'papas-pancakeria', title: "Papa's Pancakeria", id: 'papas-pancakeria-game', swf: 'papaspancakeria_v2.swf' },
  { slug: 'papas-wingeria', title: "Papa's Wingeria", id: 'papaswingeria_v2', swf: 'papaswingeria_v2.swf' },
  { slug: 'papas-hot-doggeria', title: "Papa's Hot Doggeria", id: 'papas-hot-doggeria-game', swf: 'papashotdoggeria_v1.swf' },
  { slug: 'papas-cupcakeria', title: "Papa's Cupcakeria", id: 'papascupcakeria_v2', swf: 'papascupcakeria_v2.swf' },
  { slug: 'papas-pastaria', title: "Papa's Pastaria", id: 'papas-pastaria-game', swf: 'papaspastaria_v1.swf' },
  { slug: 'papas-donuteria', title: "Papa's Donuteria", id: 'papas-donuteria-game', swf: 'papasdonuteria_v1.swf' },
  { slug: 'papas-cheeseria', title: "Papa's Cheeseria", id: 'papas-cheeseria-game', swf: 'papascheeseria_v1.swf' },
  { slug: 'papas-bakeria', title: "Papa's Bakeria", id: 'papas-bakeria-game', swf: 'papasbakeria_v1.swf' },
  { slug: 'papas-sushiria', title: "Papa's Sushiria", id: 'papas-sushiria-game', swf: 'papassushiria_v1.swf' },
];

const restored = [];
for (const p of papas) {
  if (!existingSlugs.has(p.slug)) {
    games.push({
      slug: p.slug,
      title: p.title,
      description: `Manage your own restaurant in ${p.title}. Cook, serve, and keep your customers happy!`,
      category: "Flash",
      thumbnail: `https://archive.org/services/img/${p.id}`,
      embed: `ruffle:https://archive.org/cors/${p.id}/${p.swf}`,
      rating: 4.7,
      plays: 5000000,
      tags: ["flash", "cooking", "management", "classic"],
      source: "Internet Archive"
    });
    restored.push(p.title);
  }
}

// Also restore Mutilate a Doll 2 with a better URL if possible
if (!existingSlugs.has('mutilate-a-doll-2')) {
  games.push({
    slug: "mutilate-a-doll-2",
    title: "Mutilate-a-Doll 2",
    description: "The ultimate physics sandbox. Spawn thousands of items and experiment with the doll in endless ways.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/mutilate-a-doll-2",
    embed: "ruffle:https://archive.org/cors/mutilate-a-doll-2/MaD2.swf",
    rating: 4.8,
    plays: 8000000,
    tags: ["flash", "sandbox", "physics"],
    source: "Internet Archive"
  });
  restored.push("Mutilate-a-Doll 2");
}

const gamesString = JSON.stringify(games, null, 2)
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"ruffle:/g, '"ruffle:')
  .replace(/"jsdos:/g, '"jsdos:');

code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
fs.writeFileSync('src/lib/games.ts', code);
console.log(`Restored ${restored.length} games: ${restored.join(', ')}`);
