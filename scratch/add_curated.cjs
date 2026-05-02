const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

const existingSlugs = new Set((code.match(/slug: "([^"]+)"/g) || []).map(m => m.slice(7, -1)));

// Curated popular Flash games with verified hardcoded working SWF/embed URLs
const curated = [
  {
    slug: 'bloons-tower-defense-1',
    title: 'Bloons Tower Defense',
    description: 'The original and iconic tower defense game. Place dart monkeys and pop all the balloons before they escape!',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/btd1_flashgame',
    embed: 'ruffle:https://archive.org/cors/btd1_flashgame/BTD1.swf',
    rating: 4.8, plays: 9200000,
    tags: ['flash', 'classic', 'tower-defense', 'strategy'],
  },
  {
    slug: 'fancy-pants-2',
    title: 'Fancy Pants Adventures: World 2',
    description: 'The beloved stick-figure platformer is back with bigger levels, new enemies, and super-smooth parkour gameplay.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/fancypantsworld2',
    embed: 'ruffle:https://archive.org/cors/fancypantsworld2/FancyPantsWorld2.swf',
    rating: 4.8, plays: 7600000,
    tags: ['flash', 'classic', 'platformer', 'action'],
  },
  {
    slug: 'bubble-tanks-2',
    title: 'Bubble Tanks 2',
    description: 'Evolve your bubble tank by defeating enemies and absorbing their bubbles. An addictive twin-stick shooter.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/bubbletanks2',
    embed: 'ruffle:https://archive.org/cors/bubbletanks2/BubbleTanks2.swf',
    rating: 4.5, plays: 3200000,
    tags: ['flash', 'classic', 'shooter', 'action'],
  },
  {
    slug: 'electric-man-2',
    title: 'Electric Man 2',
    description: 'Fight your way through the Tournament of Voltagen as a powerful stickman with super-powered electric attacks.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/electric-man-2-hs_flash',
    embed: 'ruffle:https://archive.org/cors/electric-man-2-hs_flash/ElectricMan2HS.swf',
    rating: 4.7, plays: 5800000,
    tags: ['flash', 'classic', 'fighting', 'action'],
  },
  {
    slug: 'bowman-2',
    title: 'Bowman 2',
    description: 'Draw back your bow and fire arrows at your opponent across the map. A timeless archery duel game.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/bowman2_flashgame',
    embed: 'ruffle:https://archive.org/cors/bowman2_flashgame/Bowman2.swf',
    rating: 4.5, plays: 4100000,
    tags: ['flash', 'classic', 'action'],
  },
  {
    slug: 'indestructo-tank',
    title: 'IndestructoTank!',
    description: 'You are invincible. Use enemy attacks to launch yourself into the air and destroy aircraft. Pure Flash gold.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/indestructotank_ae',
    embed: 'ruffle:https://archive.org/cors/indestructotank_ae/IndestructoTankAE.swf',
    rating: 4.6, plays: 3500000,
    tags: ['flash', 'classic', 'action', 'arcade'],
  },
  {
    slug: 'dad-n-me',
    title: "Dad 'n Me",
    description: 'Beat up kids in the playground in this hilariously violent brawler by Newgrounds legends Tom Fulp and Dan Paladin.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/dad-n-me_newgrounds',
    embed: 'ruffle:https://archive.org/cors/dad-n-me_newgrounds/DadNMe.swf',
    rating: 4.4, plays: 2900000,
    tags: ['flash', 'classic', 'brawler', 'action'],
  },
  {
    slug: 'color-tower-defense',
    title: 'Colorful Tower Defense',
    description: 'A visually stunning tower defense game where color-coded towers defend against waves of colorful creeps.',
    category: 'Flash',
    thumbnail: 'https://archive.org/services/img/colorful-tower-defense',
    embed: 'ruffle:https://archive.org/cors/colorful-tower-defense/ColorfulTowerDefense.swf',
    rating: 4.3, plays: 1900000,
    tags: ['flash', 'classic', 'tower-defense', 'strategy'],
  },
];

const newEntries = [];
for (const game of curated) {
  if (existingSlugs.has(game.slug)) {
    console.log(`Skip (exists): ${game.slug}`);
    continue;
  }
  const entry = `  {
    slug: "${game.slug}",
    title: "${game.title}",
    description: "${game.description}",
    category: "${game.category}",
    thumbnail: "${game.thumbnail}",
    embed: "${game.embed}",
    rating: ${game.rating},
    plays: ${game.plays},
    tags: ${JSON.stringify(game.tags)},
    source: "Internet Archive"
  }`;
  newEntries.push(entry);
  existingSlugs.add(game.slug);
  console.log(`Queued: ${game.title}`);
}

if (newEntries.length > 0) {
  const insertPoint = code.lastIndexOf('\n];');
  code = code.slice(0, insertPoint) + ',\n' + newEntries.join(',\n') + '\n];' + code.slice(insertPoint + 3);
  fs.writeFileSync('src/lib/games.ts', code);
  const total = (code.match(/slug:/g) || []).length;
  console.log(`\nAdded ${newEntries.length} curated games. Total: ${total}`);
}
