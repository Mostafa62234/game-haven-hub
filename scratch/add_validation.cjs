const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');
const append = `
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
  const seenUrls = new Set();
  const seenTitles = new Set();
  GAMES.forEach((game) => {
    if (seenUrls.has(game.embed)) console.warn("[Validation] Duplicate game URL: " + game.embed);
    if (seenTitles.has(game.title)) console.warn("[Validation] Duplicate game title: " + game.title);
    seenUrls.add(game.embed);
    seenTitles.add(game.title);
  });
}
`;
fs.writeFileSync('src/lib/games.ts', code + append);
console.log('Appended validation logic.');
