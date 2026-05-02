const fs = require('fs');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// The regex matches any string inside `thumbnail: "..."` or `screenshot: "..."` 
// that starts with https://images.unsplash.com
const regex = /thumbnail:\s*"https:\/\/images\.unsplash\.com[^"]*"/g;

// We need to actually replace the URLs in the GAMES array dynamically using the game's title.
// Doing this via regex replace string is hard if we need the title. 
// A better way is to parse the file or do a smarter regex.
// Since the title is always on the line before or a few lines before the thumbnail, we can match blocks.

let modified = code.replace(/title:\s*"([^"]+)",[\s\S]*?thumbnail:\s*"https:\/\/images\.unsplash\.com[^"]*"/g, (match, title) => {
    // Generate the bing URL
    const encodedTitle = encodeURIComponent(title + " video game cover art gameplay");
    const newThumbnail = `https://tse2.mm.bing.net/th?q=${encodedTitle}&w=400&h=400&c=7`;
    
    // Replace the unsplash url inside the match with the new url
    return match.replace(/https:\/\/images\.unsplash\.com[^"]*/, newThumbnail);
});

// Remove screenshot properties entirely since the user said "remove the hover feutere just make every game have its picture"
// I already removed the hover rendering from the component, but cleaning up the data is good.
modified = modified.replace(/\s*screenshot:\s*"[^"]*",?/g, '');

fs.writeFileSync('src/lib/games.ts', modified);
console.log('Successfully replaced Unsplash images with Bing dynamic game covers!');
