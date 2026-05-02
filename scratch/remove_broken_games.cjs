const fs = require('fs');
const https = require('https');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Parse the file back into an array to filter it.
// Since it's a TS file with `export const GAMES = [...]`, we can extract the JSON part using a crude method
// Or simply use a regex to comment out the objects that 404.

const failedSlugs = [
  "fireboy-watergirl", "bloons-td-4", "bloons-td-5", "impossible-quiz", "fancy-pants", "qwop", "ssf2",
  "portal-flash", "murloc-rpg", "electric-man-2", "thing-thing-arena-3", "crush-the-castle", "desktop-td",
  "infectonator-2", "heli-attack-3", "papas-hot-doggeria", "wheely-6", "run-3"
]; // Note: run-3 was in the screenshot.

const lines = code.split('\n');
let newLines = [];
let skipObject = false;
let objectBuffer = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.trim() === '{') {
    objectBuffer = [line];
    continue;
  }
  
  if (objectBuffer.length > 0) {
    objectBuffer.push(line);
    
    // Check if this object belongs to a failed slug
    const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
    if (slugMatch && failedSlugs.includes(slugMatch[1])) {
      skipObject = true;
    }
    
    if (line.trim() === '},' || line.trim() === '}') {
      if (!skipObject) {
        newLines.push(...objectBuffer);
      }
      objectBuffer = [];
      skipObject = false;
    }
    continue;
  }
  
  newLines.push(line);
}

fs.writeFileSync('src/lib/games.ts', newLines.join('\n'));
console.log('Removed broken games.');
