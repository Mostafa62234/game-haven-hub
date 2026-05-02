const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// 1. Remove any game with "furry" in title, slug, or tags
const gamesMatch = code.match(/export const GAMES: Game\[\] = (\[[\s\S]+?\]);\n/);
if (gamesMatch) {
  let games = eval(gamesMatch[1]);
  const originalLength = games.length;
  
  games = games.filter(g => {
    const text = (g.title + ' ' + g.slug + ' ' + g.tags.join(' ')).toLowerCase();
    return !text.includes('furry') && !text.includes('dollmaker');
  });
  console.log(`Removed ${originalLength - games.length} furry/dollmaker games.`);

  // 2. Add Gunball
  if (!games.find(g => g.slug === 'gunball-2')) {
    games.unshift({
      slug: "gunball-2",
      title: "Gunball 2: Emperor's Revenge",
      description: "Upgrade your gunball and defeat challenging enemies in the arena. A true Flash classic.",
      category: "Flash",
      thumbnail: "https://archive.org/services/img/gunball-2-emperors-revenge",
      embed: "ruffle:https://archive.org/cors/gunball-2-emperors-revenge/gunball-2-emperors-revenge.swf",
      rating: 4.5,
      plays: 1200000,
      tags: ["flash", "action", "shooter", "upgrade"],
      source: "Internet Archive"
    });
    console.log("Added Gunball 2");
  }

  // 3. Sort Retro games
  const topRetroSlugs = [
    'doom', 'doom-ii', 'wolfenstein-3d', 'daggerfall', 'fallout', 'oregon-trail', 
    'simcity-2000', 'prince-of-persia', 'pac-man', 'tetris', 'donkey-kong'
  ];

  const topRetro = [];
  const others = [];

  for (const g of games) {
    if (topRetroSlugs.some(s => g.slug.includes(s))) {
      topRetro.push(g);
    } else {
      others.push(g);
    }
  }

  // Sort top retro by plays or manually
  topRetro.sort((a, b) => b.plays - a.plays);

  const newGamesArray = [...topRetro, ...others];

  const gamesString = JSON.stringify(newGamesArray, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/"ruffle:/g, '"ruffle:')
    .replace(/"jsdos:/g, '"jsdos:');
    
  code = code.slice(0, gamesMatch.index) + `export const GAMES: Game[] = ${gamesString};\n` + code.slice(gamesMatch.index + gamesMatch[0].length);
  
  fs.writeFileSync('src/lib/games.ts', code);
  console.log("Updated games.ts successfully.");
} else {
  console.log("Could not find GAMES array.");
}
