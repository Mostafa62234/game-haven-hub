export type GameCategory =
  | "Arcade"
  | "Puzzle"
  | "Multiplayer"
  | "Strategy"
  | "Casual"
  | "Casual"
  | "Retro"
  | "Flash";

export interface Game {
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  embed: string; // iframe URL or `internal:slug`
  rating: number;
  plays: number;
  screenshot?: string;
  tags: string[];
  /** Source/credit shown on the play page (legal attribution) */
  source?: string;
}

// All embeds are open-source, official browser ports, or sites that
// explicitly publish embeddable HTML5 builds. We do NOT host copyrighted
// console ROMs (Mario, Zelda, etc.) — instead we offer faithful
// open-source clones and the same retro arcade vibe.
export const GAMES: Game[] = [
  // === Originals & classics ===
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    description:
      "The classic 3-in-a-row strategy game. Play locally with a friend or online over a room code.",
    category: "Multiplayer",
    thumbnail:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "internal:tic-tac-toe",
    rating: 4.6,
    plays: 1200000,
    tags: ["classic", "2-player", "quick"],
  },
  {
    slug: "2048",
    title: "2048",
    description:
      "Combine matching tiles to reach the legendary 2048 tile. Easy to learn, hard to master.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80&auto=format&fit=crop&sat=-30",
    screenshot: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop&sat=-30",
    embed: "https://play2048.co/",
    rating: 4.8,
    plays: 8400000,
    tags: ["numbers", "puzzle", "addictive"],
    source: "play2048.co (open-source, MIT)",
  },
  {
    slug: "hextris",
    title: "Hextris",
    description:
      "A fast-paced puzzle game inspired by Tetris. Match colors on a rotating hexagon.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://hextris.io/",
    rating: 4.7,
    plays: 3100000,
    tags: ["arcade", "tetris-like", "fast"],
    source: "hextris.io (open-source)",
  },
  {
    slug: "memory-match",
    title: "Memory Match",
    description:
      "Flip cards two at a time and find every matching pair. Train your memory.",
    category: "Casual",
    thumbnail:
      "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "internal:memory-match",
    rating: 4.5,
    plays: 650000,
    tags: ["memory", "casual", "single-player"],
  },
  {
    slug: "chess",
    title: "Chess Online",
    description:
      "Play the timeless game of strategy. Plan ahead, control the center, checkmate.",
    category: "Strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://lichess.org/",
    rating: 4.9,
    plays: 20000000,
    tags: ["strategy", "classic", "deep"],
    source: "lichess.org (free & open-source)",
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    description:
      "Use logic to clear the board without detonating any of the hidden mines.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80&auto=format&fit=crop&hue=120",
    screenshot: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop&hue=120",
    embed: "https://minesweeper.online/",
    rating: 4.6,
    plays: 9200000,
    tags: ["logic", "classic", "single-player"],
  },
  {
    slug: "sudoku",
    title: "Sudoku",
    description:
      "Fill the grid so every row, column and box contains 1-9. The number puzzle the world loves.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://sudoku.com/",
    rating: 4.7,
    plays: 11000000,
    tags: ["numbers", "logic", "daily"],
  },

  // === Retro / console-era games (legally embeddable) ===
  {
    slug: "pacman-doodle",
    title: "Pac-Man (Google Doodle)",
    description:
      "The official Google 30th-anniversary Pac-Man doodle — the original arcade legend, playable in your browser.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://elgoog.im/pacman/",
    rating: 4.9,
    plays: 30000000,
    tags: ["arcade", "80s", "official"],
    source: "elgoog.im (Google Doodle archive)",
  },
  {
    slug: "tetris",
    title: "Tetris Tribute",
    description:
      "Stack falling tetrominoes, clear lines, and chase the high score. Pure arcade bliss.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1633218388467-539651dcf81a?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1633218388467-539651dcf81a?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://tetris.com/play-tetris",
    rating: 4.8,
    plays: 15000000,
    tags: ["arcade", "classic", "score"],
    source: "tetris.com (official)",
  },
  {
    slug: "snake",
    title: "Snake Classic",
    description:
      "Eat, grow longer, and don't bite yourself. A timeless arcade favorite.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://playsnake.org/",
    rating: 4.3,
    plays: 5600000,
    tags: ["retro", "arcade", "single-player"],
  },
  {
    slug: "pong",
    title: "Pong (HTML5)",
    description:
      "The game that started it all. Two paddles, one ball, infinite reflexes.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://www.ponggame.org/",
    rating: 4.2,
    plays: 1800000,
    tags: ["retro", "70s", "2-player"],
  },
  {
    slug: "prince-of-persia",
    title: "Prince of Persia (HTML5)",
    description:
      "The legendary cinematic platformer from 1989, faithfully remade as an open-source HTML5 port.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1612392061787-2d078b3e573a?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1612392061787-2d078b3e573a?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://princejs.com/",
    rating: 4.7,
    plays: 2400000,
    tags: ["platformer", "80s", "adventure"],
    source: "princejs.com (open-source port by Oliver Klemenz)",
  },
  {
    slug: "doom",
    title: "DOOM (Browser Port)",
    description:
      "The 1993 first-person shooter that shaped the genre. Playable directly in your browser.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed:
      "https://silentspacemarine.com/",
    rating: 4.8,
    plays: 9100000,
    tags: ["fps", "90s", "classic"],
    source: "silentspacemarine.com (HTML5 Port)",
  },
  {
    slug: "minecraft-classic",
    title: "Minecraft Classic",
    description:
      "The original 2009 Minecraft experience. Build and destroy blocks in a shared browser world.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1607513746994-51f730a44832?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://classic.minecraft.net/",
    rating: 4.6,
    plays: 3300000,
    tags: ["classic", "building", "sandbox"],
    source: "classic.minecraft.net",
  },
  {
    slug: "chrome-dino",
    title: "Chrome Dino Game",
    description:
      "The legendary T-Rex runner game! Jump the cacti and duck the pterodactyls in an endless desert.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1518715303843-586e350765b2?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1518715303843-586e350765b2?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://dino-chrome.com/",
    rating: 4.4,
    plays: 4200000,
    tags: ["runner", "arcade", "casual"],
    source: "dino-chrome.com",
  },
  {
    slug: "sandspiel",
    title: "Sandspiel",
    description:
      "A falling sand game with cellular automata. Create art, elements, and complex ecosystems.",
    category: "Casual",
    thumbnail:
      "https://images.unsplash.com/photo-1542360663-8f4023704c56?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1542360663-8f4023704c56?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://sandspiel.club/",
    rating: 4.6,
    plays: 5700000,
    tags: ["sandbox", "simulation", "physics"],
    source: "sandspiel.club",
  },
  {
    slug: "slow-roads",
    title: "Slow Roads",
    description:
      "A casual, endlessly generated driving game. Relax, take in the beautiful scenery, and enjoy the open road.",
    category: "Casual",
    thumbnail:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://slowroads.io/",
    rating: 4.7,
    plays: 2900000,
    tags: ["driving", "relaxing", "simulation"],
    source: "slowroads.io",
  },
  {
    slug: "prince-of-persia-2",
    title: "Mario-Style Platformer",
    description:
      "An open-source side-scrolling platformer in the spirit of the SNES era. Run, jump, collect coins.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&q=80&auto=format&fit=crop&hue=30",
    screenshot: "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop&hue=30",
    embed: "https://www.mariohtml5.com/",
    rating: 4.5,
    plays: 8800000,
    tags: ["platformer", "snes-era", "retro"],
    source: "Notch's Infinite Mario (open-source HTML5 port)",
  },
  {
    slug: "agar",
    title: "Agar.io",
    description:
      "Eat smaller cells, avoid bigger ones, and become the biggest blob on the server.",
    category: "Multiplayer",
    thumbnail:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80&auto=format&fit=crop&hue=200",
    screenshot: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop&hue=200",
    embed: "https://agar.io/",
    rating: 4.4,
    plays: 50000000,
    tags: ["io", "multiplayer", "casual"],
  },
  {
    slug: "flappy-bird",
    title: "Flap Adventure",
    description:
      "Tap to flap and dodge the pipes. One of the most addictive arcade challenges of all time.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://flappybird.io/",
    rating: 4.4,
    plays: 12000000,
    tags: ["arcade", "casual", "one-tap"],
  },
  {
    slug: "checkers",
    title: "Checkers",
    description:
      "Jump, capture, and crown your kings. A simple-to-learn strategy classic for two players.",
    category: "Strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://www.247checkers.com/",
    rating: 4.2,
    plays: 2100000,
    tags: ["strategy", "2-player", "classic"],
  },
  {
    slug: "wolfenstein-3d",
    title: "Wolfenstein 3D",
    description:
      "Id Software's 1992 FPS pioneer, playable in-browser via the Internet Archive's authorized emulator build.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Wolfenstein_3D_1992",
    rating: 4.6,
    plays: 3300000,
    tags: ["fps", "90s", "id-software"],
    source: "Internet Archive MS-DOS collection",
  },
  {
    slug: "oregon-trail",
    title: "The Oregon Trail",
    description:
      "Lead your wagon party west across 19th-century America in this educational classic.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1594135356442-6b6b9e9c1b1e?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1594135356442-6b6b9e9c1b1e?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Oregon_Trail_The_1990",
    rating: 4.4,
    plays: 4200000,
    tags: ["classic", "educational", "90s"],
    source: "Internet Archive",
  },
  {
    slug: "lemmings",
    title: "Lemmings",
    description:
      "Save the lemmings by assigning them tasks before they walk off a cliff. A puzzle-platformer icon.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Lemmings_1991",
    rating: 4.7,
    plays: 2900000,
    tags: ["puzzle", "platformer", "90s"],
    source: "Internet Archive",
  },
  {
    slug: "donkey-kong",
    title: "Donkey Kong",
    description:
      "The classic 1983 MS-DOS port of the arcade legend. Climb the ladders and dodge the barrels!",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Donkey_Kong_1983",
    rating: 4.8,
    plays: 1500000,
    tags: ["arcade", "80s", "platformer"],
    source: "Internet Archive",
  },
  {
    slug: "zork",
    title: "Zork I",
    description:
      "The Great Underground Empire. The grandfather of text adventure games that started it all in 1980.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&sat=-100&tint=blue&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Zork_I_-_The_Great_Underground_Empire_1980",
    rating: 4.5,
    plays: 800000,
    tags: ["text-adventure", "rpg", "80s"],
    source: "Internet Archive",  },
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
  },
  {
    slug: "gunblood",
    title: "Gunblood",
    description: "The classic Western shootout Flash game. Draw your weapon and test your reflexes.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1584852959828-09199321e10d?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1584852959828-09199321e10d?w=800&q=80&sat=-100&tint=red",
    embed: "https://www.crazygames.com/embed/gunblood",
    rating: 4.5,
    plays: 5200000,
    tags: ["flash", "shooter", "action"],
    source: "CrazyGames (Ruffle Emulation)"
  },
  {
    slug: "fireboy-watergirl",
    title: "Fireboy and Watergirl",
    description: "The famous cooperative puzzle platformer. Control both elements to reach the exit.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1548503020-f42f534438fa?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1548503020-f42f534438fa?w=800&q=80&sat=-100&tint=orange",
    embed: "https://www.crazygames.com/embed/fireboy-and-watergirl-the-forest-temple",
    rating: 4.8,
    plays: 45000000,
    tags: ["flash", "puzzle", "co-op"],
    source: "CrazyGames"
  },
  {
    slug: "run-3",
    title: "Run 3",
    description: "Run, jump, and defy gravity in this endlessly addictive Flash tunnel runner.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80&hue=180",
    screenshot: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80&hue=180&sat=-100",
    embed: "https://www.crazygames.com/embed/run-3",
    rating: 4.7,
    plays: 38000000,
    tags: ["flash", "runner", "space"],
    source: "CrazyGames"
  },
  {
    slug: "happy-wheels",
    title: "Happy Wheels",
    description: "The notoriously gory and hilarious physics-based ragdoll Flash game.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&q=80&sat=-100&tint=red",
    embed: "https://www.crazygames.com/embed/happy-wheels",
    rating: 4.9,
    plays: 85000000,
    tags: ["flash", "physics", "funny"],
    source: "CrazyGames"
  },
  {
    slug: "papas-pizzeria",
    title: "Papa's Pizzeria",
    description: "Bake pies and manage the shop in the Flash game that launched a cooking empire.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    screenshot: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80&sat=-100",
    embed: "https://www.crazygames.com/embed/papas-pizzeria",
    rating: 4.8,
    plays: 22000000,
    tags: ["flash", "cooking", "simulation"],
    source: "CrazyGames (Ruffle Emulation)"
  }
];

export const CATEGORIES: GameCategory[] = [
  "Arcade",
  "Puzzle",
  "Multiplayer",
  "Strategy",
  "Casual",
  "Retro",
  "Flash",
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getRelatedGames(game: Game, count = 4): Game[] {
  return GAMES.filter((g) => g.slug !== game.slug && g.category === game.category)
    .slice(0, count)
    .concat(GAMES.filter((g) => g.slug !== game.slug && g.category !== game.category))
    .slice(0, count);
}
