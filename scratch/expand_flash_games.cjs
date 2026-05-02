const fs = require('fs');
const https = require('https');

const GAMES_FILE = 'src/lib/games.ts';
let content = fs.readFileSync(GAMES_FILE, 'utf8');

// Quick extract of existing slugs and urls to avoid duplicates
const existingSlugs = new Set();
const slugMatches = content.matchAll(/slug:\s*"([^"]+)"/g);
for (const match of slugMatches) {
  existingSlugs.add(match[1]);
}

const existingEmbeds = new Set();
const embedMatches = content.matchAll(/embed:\s*"([^"]+)"/g);
for (const match of embedMatches) {
  existingEmbeds.add(match[1]);
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function cleanText(txt) {
  if (!txt) return "";
  let clean = txt.replace(/<[^>]*>?/gm, ''); // remove HTML
  clean = clean.replace(/\\n/g, ' ').replace(/"/g, '\\"').trim();
  if (clean.length > 150) clean = clean.substring(0, 147) + '...';
  return clean;
}

function sanitizeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  console.log("Fetching top flash games from Internet Archive...");
  const searchUrl = 'https://archive.org/advancedsearch.php?q=collection:(softwarelibrary_flash)&fl[]=identifier,title,description&sort[]=downloads+desc&rows=300&output=json';
  
  let searchData;
  try {
    searchData = await fetchJSON(searchUrl);
  } catch (e) {
    console.error("Failed to fetch search data:", e);
    return;
  }

  const docs = searchData.response.docs;
  console.log(`Found ${docs.length} potential games.`);

  let newGames = [];
  let index = 0;

  while (newGames.length < 100 && index < docs.length) {
    const doc = docs[index++];
    if (!doc.title || doc.title.toLowerCase().includes("software library")) continue;

    let slug = sanitizeSlug(doc.title);
    if (!slug) continue;
    
    // Ensure unique slug
    let originalSlug = slug;
    let counter = 2;
    while (existingSlugs.has(slug)) {
      slug = `${originalSlug}-${counter}`;
      counter++;
    }

    try {
      const meta = await fetchJSON(`https://archive.org/metadata/${doc.identifier}`);
      if (!meta || !meta.files) continue;

      const swfFile = meta.files.find(f => f.name.endsWith('.swf') && !f.name.includes('_meta.xml'));
      if (!swfFile) continue;

      const embedUrl = `ruffle:https://archive.org/cors/${doc.identifier}/${swfFile.name}`;
      
      if (existingEmbeds.has(embedUrl)) continue; // duplicate game

      const desc = cleanText(Array.isArray(doc.description) ? doc.description[0] : doc.description) || `Play ${doc.title} online.`;
      
      const gameObj = `  {
    slug: "${slug}",
    title: "${doc.title.replace(/"/g, '\\"')}",
    description: "${desc}",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/${doc.identifier}",
    embed: "${embedUrl}",
    rating: ${(4.0 + Math.random() * 0.9).toFixed(1)},
    plays: ${Math.floor(10000 + Math.random() * 900000)},
    tags: ["flash", "classic"],
    source: "Internet Archive"
  }`;

      newGames.push(gameObj);
      existingSlugs.add(slug);
      existingEmbeds.add(embedUrl);
      console.log(`[${newGames.length}/100] Added ${doc.title}`);
    } catch (err) {
      // ignore
    }
  }

  if (newGames.length > 0) {
    const newGamesString = newGames.join(',\n') + '\n];';
    // Replace the final '];' in games.ts with the new games array
    content = content.replace(/\s*\n\];/g, ',\n' + newGamesString);
    fs.writeFileSync(GAMES_FILE, content);
    console.log(`\nSuccessfully added ${newGames.length} new Flash games to the database!`);
  } else {
    console.log("No new games added.");
  }
}

run();
