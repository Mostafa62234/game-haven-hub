const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Find where the GAMES array ends (first occurrence of ];\n)
// Then find if CATEGORIES and getGame already exist before the duplicate
const firstCategories = code.indexOf('export const CATEGORIES');
const lastCategories = code.lastIndexOf('export const CATEGORIES');

console.log('First CATEGORIES at char:', firstCategories);
console.log('Last CATEGORIES at char:', lastCategories);
console.log('Are they different?', firstCategories !== lastCategories);

// Show context around first occurrence
console.log('\n--- Context around FIRST CATEGORIES ---');
console.log(code.slice(firstCategories - 50, firstCategories + 200));

console.log('\n--- Context around LAST CATEGORIES ---');
console.log(code.slice(lastCategories - 50, lastCategories + 200));
