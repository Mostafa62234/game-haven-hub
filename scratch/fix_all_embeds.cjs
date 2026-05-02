const fs = require('fs');
const https = require('https');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  const matches = code.matchAll(/embed: "https:\/\/archive\.org\/embed\/([^"?]+)(\?autoplay=1)?"/g);
  let changes = 0;
  
  for (const match of matches) {
    const fullMatch = match[0];
    const id = match[1];
    
    if (id.startsWith('msdos_')) continue; // Skip DOS games
    
    try {
      const meta = await fetchJSON(`https://archive.org/metadata/${id}`);
      if (!meta || !meta.files) {
        console.log(`No files found for ${id}`);
        continue;
      }
      
      const swfFile = meta.files.find(f => f.name.endsWith('.swf') && !f.name.includes('_meta.xml'));
      
      if (swfFile) {
        const newEmbed = `embed: "ruffle:https://archive.org/cors/${id}/${swfFile.name}"`;
        code = code.replace(fullMatch, newEmbed);
        console.log(`Converted: ${id} -> ${swfFile.name}`);
        changes++;
      } else {
        console.log(`No SWF found for ${id}`);
        // Remove the game if it has no SWF to prevent "Item cannot be found" errors
        const gameBlockRegex = new RegExp(`\\s*,?\\s*\\{[^{}]*embed: "${fullMatch.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}"[^{}]*\\}`, 'g');
        code = code.replace(gameBlockRegex, '');
        console.log(`Removed broken game with ID: ${id}`);
        changes++;
      }
    } catch (err) {
      console.log(`Failed to fetch metadata for ${id}`);
    }
  }
  
  if (changes > 0) {
    fs.writeFileSync('src/lib/games.ts', code);
    console.log(`\nMade ${changes} updates to games.ts`);
  } else {
    console.log('\nNo changes needed.');
  }
}

run();
