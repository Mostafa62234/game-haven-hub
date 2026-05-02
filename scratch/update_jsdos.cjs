const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

code = code.replace(
  'embed: "https://archive.org/embed/msdos_Elder_Scrolls_The_-_Daggerfall_1996"',
  'embed: "jsdos:https://archive.org/cors/msdos_Elder_Scrolls_The_-_Daggerfall_1996/msdos_Elder_Scrolls_The_-_Daggerfall_1996.zip"'
);

code = code.replace(
  'embed: "https://archive.org/embed/msdos_Fallout_1997"',
  'embed: "jsdos:https://archive.org/cors/msdos_Fallout_1997/msdos_Fallout_1997.zip"'
);

fs.writeFileSync('src/lib/games.ts', code);
console.log('Switched heavy games to native JS-DOS embeds!');
