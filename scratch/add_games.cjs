const fs = require('fs');
let code = fs.readFileSync('src/lib/games.ts', 'utf8');

const newGames = `  },
  {
    slug: "daggerfall",
    title: "The Elder Scrolls II: Daggerfall",
    description: "The massive 1996 fantasy open-world RPG by Bethesda.",
    category: "Retro",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&sat=-50",
    embed: "https://archive.org/embed/msdos_Elder_Scrolls_The_-_Daggerfall_1996",
    rating: 4.8,
    plays: 1400000,
    tags: ["rpg", "open-world", "90s"],
    source: "Internet Archive"
  },
  {
    slug: "fallout-1",
    title: "Fallout (1997)",
    description: "A Post Nuclear Role Playing Game. The classic that started it all.",
    category: "Retro",
    thumbnail: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&sat=-50",
    embed: "https://archive.org/embed/msdos_Fallout_1997",
    rating: 4.9,
    plays: 2800000,
    tags: ["rpg", "post-apocalyptic", "classic"],
    source: "Internet Archive"
  },
  {
    slug: "diablo-web",
    title: "Diablo (Shareware)",
    description: "Descend into the darkness of Tristram in this legendary action RPG.",
    category: "Retro",
    thumbnail: "https://images.unsplash.com/photo-1506452819137-0422416856b8?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1518715303843-586e350765b2?w=800&q=80&sat=-50",
    embed: "https://d07riv.github.io/diabloweb/",
    rating: 4.7,
    plays: 3500000,
    tags: ["rpg", "action", "dungeon-crawler"],
    source: "DiabloWeb (Open Source Port)"
  },
  {
    slug: "ultima-4",
    title: "Ultima IV: Quest of the Avatar",
    description: "The pioneering 1985 RPG that defined moral choices in gaming.",
    category: "Retro",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&sat=-50",
    embed: "https://archive.org/embed/msdos_Ultima_IV_-_Quest_of_the_Avatar_1985",
    rating: 4.6,
    plays: 850000,
    tags: ["rpg", "80s", "classic"],
    source: "Internet Archive"
  },
  {
    slug: "openttd",
    title: "OpenTTD",
    description: "Open-source transport simulation game based on Transport Tycoon Deluxe.",
    category: "Strategy",
    thumbnail: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&q=80&sat=-50",
    embed: "https://epicport.com/en/ttd",
    rating: 4.8,
    plays: 1100000,
    tags: ["simulation", "strategy", "open-source"],
    source: "EpicPort (OpenTTD Web)"
  }
];`;

code = code.replace(/\s*\},\s*\];/g, newGames);
fs.writeFileSync('src/lib/games.ts', code);
console.log('Added games successfully.');
