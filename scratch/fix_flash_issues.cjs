const fs = require('fs');
let content = fs.readFileSync('src/lib/games.ts', 'utf8');

// remove 'retro' tag from Flash games
content = content.replace(/category: "Flash",([\s\S]*?)tags: \["flash", "classic", "retro"\]/g, 'category: "Flash",$1tags: ["flash", "classic"]');

// Add autoplay=1 to archive.org flash embeds
content = content.replace(/embed: "(https:\/\/archive\.org\/embed\/[^"]+)"/g, (match, url) => {
    if (url.includes('autoplay=1')) return match;
    const sep = url.includes('?') ? '&' : '?';
    return `embed: "${url}${sep}autoplay=1"`;
});

fs.writeFileSync('src/lib/games.ts', content);
console.log('Fixed tags and embeds');
