const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('src/lib/games.ts', 'utf8');

const flashRegex = /category: "Flash",[\s\S]*?embed: "(https:\/\/archive\.org\/embed\/[^"?]+)(?:\?autoplay=1)?(?:&autoplay=1)?"/g;

async function getSwfUrl(embedUrl) {
  const itemId = embedUrl.split('/').pop();
  
  return new Promise((resolve) => {
    https.get(`https://archive.org/metadata/${itemId}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const swf = json.files.find(f => f.name.endsWith('.swf'));
          if (swf) {
            resolve(`ruffle:https://archive.org/cors/${itemId}/${swf.name}`);
          } else {
            console.log(`No SWF found for ${itemId}`);
            resolve(embedUrl); // fallback
          }
        } catch (e) {
          console.log(`Parse error for ${itemId}`);
          resolve(embedUrl);
        }
      });
    }).on('error', () => {
      console.log(`Fetch error for ${itemId}`);
      resolve(embedUrl);
    });
  });
}

async function run() {
  const matches = [...content.matchAll(flashRegex)];
  console.log(`Found ${matches.length} Flash games`);
  
  for (const match of matches) {
    const fullMatch = match[0];
    const embedUrl = match[1];
    
    console.log(`Fetching ${embedUrl}...`);
    const newUrl = await getSwfUrl(embedUrl);
    
    if (newUrl !== embedUrl) {
      // replace the old embed line with the new ruffle link
      // Notice we are targeting the exact string inside the match to be safe
      const originalLineRegex = new RegExp(`embed: "${embedUrl.replace(/[.*+?^$\/{}()|[\\]\\\\]/g, '\\$&')}(?:\\?autoplay=1)?(?:&autoplay=1)?"`);
      const updatedBlock = fullMatch.replace(originalLineRegex, `embed: "${newUrl}"`);
      content = content.replace(fullMatch, updatedBlock);
    }
  }
  
  fs.writeFileSync('src/lib/games.ts', content);
  console.log('Finished updating games.ts');
}

run();
