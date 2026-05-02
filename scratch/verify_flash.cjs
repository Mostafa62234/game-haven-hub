const fs = require('fs');
const https = require('https');

const code = fs.readFileSync('src/lib/games.ts', 'utf8');
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
const games = eval(gamesMatch[1]);

async function checkUrl(url) {
  if (url.startsWith('ruffle:')) url = url.slice(7);
  if (!url.startsWith('http')) return true;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200 || res.statusCode === 302);
      res.resume();
    }).on('error', () => resolve(false));
  });
}

async function run() {
  const flashGames = games.filter(g => g.category === 'Flash');
  console.log(`Checking ${flashGames.length} flash games...`);
  
  const broken = [];
  for (const game of flashGames) {
    const ok = await checkUrl(game.embed);
    if (!ok) {
      console.log(`BROKEN: ${game.title} (${game.embed})`);
      broken.push(game.slug);
    }
  }
  
  if (broken.length > 0) {
    const cleanGames = games.filter(g => !broken.includes(g.slug));
    const gamesString = JSON.stringify(cleanGames, null, 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"ruffle:/g, '"ruffle:')
      .replace(/"jsdos:/g, '"jsdos:');
    
    const newCode = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
    fs.writeFileSync('src/lib/games.ts', newCode);
    console.log(`Removed ${broken.length} broken flash games.`);
  } else {
    console.log('All flash games are reachable!');
  }
}

run();
