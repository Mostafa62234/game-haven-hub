const fs = require('fs');
const https = require('https');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// We will parse out the title of each Flash game, then query Internet Archive.
const lines = code.split('\n');
let newLines = [];
let objectBuffer = [];
let currentTitle = null;
let currentSlug = null;
let isFlash = false;
let embedIndex = -1;

// Keep track of games to update
const updates = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.trim() === '{') {
    objectBuffer = [line];
    continue;
  }
  
  if (objectBuffer.length > 0) {
    objectBuffer.push(line);
    
    const titleMatch = line.match(/^\s*title:\s*"([^"]+)"/);
    if (titleMatch) currentTitle = titleMatch[1];
    
    const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
    if (slugMatch) currentSlug = slugMatch[1];
    
    if (line.includes('category: "Flash"')) isFlash = true;
    
    if (line.includes('embed:')) {
      embedIndex = objectBuffer.length - 1;
    }
    
    if (line.trim() === '},' || line.trim() === '}') {
      if (isFlash && currentTitle) {
        updates.push({
          title: currentTitle,
          slug: currentSlug,
          buffer: [...objectBuffer],
          embedIndex
        });
      } else {
        newLines.push(...objectBuffer);
      }
      
      objectBuffer = [];
      currentTitle = null;
      currentSlug = null;
      isFlash = false;
      embedIndex = -1;
    }
    continue;
  }
  
  newLines.push(line);
}

function searchArchive(title) {
  return new Promise((resolve) => {
    // Basic search escaping
    const query = encodeURIComponent(`title:("${title}") AND collection:softwarelibrary_flash`);
    const url = `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier&output=json&rows=1`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.response && json.response.docs && json.response.docs.length > 0) {
            resolve(json.response.docs[0].identifier);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Fallback manual mappings for tricky names
const fallbackMap = {
  "gunblood": "gunblood_flash",
  "run-3": "run3_202108",
  "papas-pizzeria": "papas-pizzeria_flash",
  "papas-burgeria": "PapasBurgeriav1.0.3",
  "wheely-1": "wheely-1",
  "wheely-2": "wheely-2"
};

async function run() {
  console.log(`Checking ${updates.length} Flash games against Internet Archive...`);
  
  for (const game of updates) {
    let identifier = fallbackMap[game.slug];
    
    if (!identifier) {
      identifier = await searchArchive(game.title);
    }
    
    if (!identifier) {
       // try searching without quotes
       identifier = await searchArchive(game.title.replace(/'/g, ''));
    }
    
    if (identifier) {
      console.log(`FOUND: ${game.title} -> ${identifier}`);
      game.buffer[game.embedIndex] = `    embed: "https://archive.org/embed/${identifier}",`;
      // update source
      for(let j=0; j<game.buffer.length; j++) {
         if(game.buffer[j].includes('source:')) {
            game.buffer[j] = `    source: "Internet Archive"`;
         }
      }
      newLines.push(...game.buffer);
    } else {
      console.log(`NOT FOUND: ${game.title} - Removing from database.`);
    }
  }
  
  // Also fix the bottom brace if needed
  fs.writeFileSync('src/lib/games.ts', newLines.join('\n'));
  console.log('Finished updating games.ts!');
}

run();
