const fs = require('fs');
const https = require('https');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// ── 1. REMOVE INAPPROPRIATE / BROKEN GAMES ────────────────────────────────
const bannedSlugs = [
  'male-furry-dollmaker',
  'pok-mon-trainer-creator',      // Pokémon character issues
  'loituma-girl',                 // Weird
  'nick-jr-face---alphabet-game', // Kids content
  'nick-jr-face---numbers-game',
  'nick-jr-phone',
  'the-boohbah-zone',
  'boohbah-dance',
  'meet-the-zoopals',
  'happy-tree-friends---cuddles-pet-smoochie',
  'happy-tree-friends---nutty-s-party-smoochie',
  'happy-tree-friends---giggles-valentine-smoochie',
  'happy-tree-friends---toothy-s-easter-smoochie',
  'happy-tree-friends---flaky-s-baseball-smoochie',
  'happy-tree-friends---petunia-s-summer-smoochie',
  'happy-tree-friends---cub-s-christmas-smoochie',
  'happy-tree-friends---pop-s-bbq-smoochie',
  'happy-tree-friends---sniffles-science-smoochie',
  'happy-tree-friends---mime-s-olympic-smoochie',
  'you-are-an-idiot-virus',
  'placophone',
  'loituma-girl',
  'the-joestersizer-10-speed-frog-blender-2000',
  'goofy-s-silly-slide',
  'donald---the-beanstalk',
  'badger',
  'reimu-s-donation-box---',
  'family-crisis',
  'hungry-pumkin',
  'fiash-',
  'pilsner-urquell-beer-game',
  'hagtstfavxb00',
  'caramelldansen-hd-remake-',
  '625-sandwich-stacker',
  'amazing-sonic-scene-creator-2',
  'social-interaction-trainer',
  'all-your-base-are-belong-to-us',
  '-uzinagaz-watch-out-behind-hunter-girl-ver',
  'germinator',
  'black-licorice-flash-',
  'nick-jr-face---alphabet-game',
];

// Remove banned game objects
for (const slug of bannedSlugs) {
  // Match full game object with this slug
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const gameBlockRegex = new RegExp(
    `\\s*,?\\s*\\{[^{}]*slug:\\s*"${escapedSlug}"[^{}]*\\}`,
    'g'
  );
  const before = (code.match(/slug:/g) || []).length;
  code = code.replace(gameBlockRegex, '');
  const after = (code.match(/slug:/g) || []).length;
  if (before !== after) console.log(`Removed: ${slug}`);
}

// ── 2. FIX SPECIAL CHARACTERS IN ALL TITLES/DESCRIPTIONS ─────────────────
// Fix unescaped quotes inside string values that could break JS/JSX
code = code.replace(/title: "([^"\\]*)"/g, (match, title) => {
  const fixed = title.replace(/'/g, "\\'");
  return `title: "${fixed}"`;
});

// Fix broken slugs with special chars
code = code.replace(/slug: "([^"]+)"/g, (match, slug) => {
  const fixed = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `slug: "${fixed}"`;
});

fs.writeFileSync('src/lib/games.ts', code);

const remaining = (code.match(/slug:/g) || []).length;
console.log(`\nDone! Remaining games: ${remaining}`);
console.log('Now adding curated replacement games...');

// ── 3. ADD POPULAR REPLACEMENT GAMES ─────────────────────────────────────
const replacements = [
  { slug: 'bloons-tower-defense-4', title: 'Bloons Tower Defense 4', description: 'One of the most beloved tower defense games ever made. Pop balloons to protect your base!', ia: 'bloons_tower_defense_4_flashgame', rating: 4.8, plays: 8200000 },
  { slug: 'fancy-pants-adventures', title: 'Fancy Pants Adventures', description: 'Help Fancy Pants Man run, jump, and slide through beautifully hand-drawn levels.', ia: 'fancy-pants-adventures-world-1', rating: 4.7, plays: 6100000 },
  { slug: 'strike-force-heroes', title: 'Strike Force Heroes', description: 'An action-packed side-scrolling shooter with RPG elements and a deep upgrade system.', ia: 'strikeforceheroes_202310', rating: 4.7, plays: 5900000 },
  { slug: 'age-of-war-2', title: 'Age of War 2', description: 'The legendary strategy game. Evolve through the ages and destroy the enemy base.', ia: 'age-of-war-3', rating: 4.6, plays: 7300000 },
  { slug: 'sugar-sugar', title: 'Sugar Sugar', description: 'Draw lines to guide falling sugar grains into cups. A brilliant and relaxing puzzle game.', ia: 'flash_sugar-sugar', rating: 4.5, plays: 3200000 },
  { slug: 'burrito-bison', title: 'Burrito Bison', description: 'Launch Burrito Bison from a wrestling ring and bounce off gummy bears as far as possible!', ia: 'flash_burrito-bison', rating: 4.6, plays: 4400000 },
  { slug: 'kingdom-rush', title: 'Kingdom Rush', description: 'The definitive Flash tower defense game with knights, mages, and relentless enemies.', ia: 'kingdom-rush_flash', rating: 4.9, plays: 9800000 },
  { slug: 'infectonator', title: 'Infectonator', description: 'Spread a zombie virus and infect the world! A hilarious and addictive strategy game.', ia: 'infectonator_flash', rating: 4.4, plays: 2800000 },
];

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch(e) { reject(e); } });
    });
    req.on('error', reject);
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function run() {
  // Get existing slugs to avoid duplication
  const existingSlugs = new Set((code.match(/slug: "([^"]+)"/g) || []).map(m => m.replace(/slug: "|"/g,'')));
  const existingEmbeds = new Set((code.match(/embed: "([^"]+)"/g) || []).map(m => m.replace(/embed: "|"/g,'')));

  const newEntries = [];
  for (const game of replacements) {
    if (existingSlugs.has(game.slug)) {
      console.log(`Skipping (already exists): ${game.slug}`);
      continue;
    }
    try {
      const meta = await fetchJSON(`https://archive.org/metadata/${game.ia}`);
      const swf = meta.files && meta.files.find(f => f.name.endsWith('.swf'));
      if (!swf) { console.log(`No SWF for ${game.slug}`); continue; }
      const embed = `ruffle:https://archive.org/cors/${game.ia}/${swf.name}`;
      if (existingEmbeds.has(embed)) { console.log(`Embed duplicate: ${game.slug}`); continue; }
      const entry = `  {
    slug: "${game.slug}",
    title: "${game.title}",
    description: "${game.description}",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/${game.ia}",
    embed: "${embed}",
    rating: ${game.rating},
    plays: ${game.plays},
    tags: ["flash", "classic"],
    source: "Internet Archive"
  }`;
      newEntries.push(entry);
      existingSlugs.add(game.slug);
      existingEmbeds.add(embed);
      console.log(`Added: ${game.title}`);
    } catch(e) {
      console.log(`Failed ${game.slug}: ${e.message}`);
    }
  }

  if (newEntries.length > 0) {
    let updated = fs.readFileSync('src/lib/games.ts', 'utf8');
    const insertPoint = updated.lastIndexOf('\n];');
    updated = updated.slice(0, insertPoint) + ',\n' + newEntries.join(',\n') + '\n];' + updated.slice(insertPoint + 3);
    fs.writeFileSync('src/lib/games.ts', updated);
    console.log(`\nAdded ${newEntries.length} curated replacement games!`);
  }
}

run();
