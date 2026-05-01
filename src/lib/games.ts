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
  },
  {
    slug: "papas-pizzeria",
    title: "Papa's Pizzeria",
    description: "Bake and serve pizzas to hungry customers.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-pizzeria",
    rating: 4.4,
    plays: 25000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-burgeria",
    title: "Papa's Burgeria",
    description: "Grill burgers and build them high.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-burgeria",
    rating: 4.6,
    plays: 22000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-freezeria",
    title: "Papa's Freezeria",
    description: "Mix up frozen treats on the island.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1563805042-7684c8e9e5cb?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-freezeria",
    rating: 4.4,
    plays: 30000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-taco-mia",
    title: "Papa's Taco Mia",
    description: "Build tacos for crazy customers.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-taco-mia",
    rating: 4.1,
    plays: 18000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-cupcakeria",
    title: "Papa's Cupcakeria",
    description: "Bake and frost cupcakes.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-cupcakeria",
    rating: 4.6,
    plays: 19000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-1",
    title: "Wheely 1",
    description: "Help Wheely the little red car reach the exit.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-1",
    rating: 4.3,
    plays: 12000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-2",
    title: "Wheely 2",
    description: "Wheely goes on an adventure to find his love.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-2",
    rating: 4.9,
    plays: 11000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-3",
    title: "Wheely 3",
    description: "Wheely needs a new wheel for his wife.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-3",
    rating: 4.2,
    plays: 10000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-4",
    title: "Wheely 4: Time Travel",
    description: "Wheely accidentally travels through time.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-4",
    rating: 4.3,
    plays: 9000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-5",
    title: "Wheely 5: Armageddon",
    description: "Wheely has to survive the end of the world.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-5",
    rating: 4.4,
    plays: 8000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob",
    title: "Snail Bob",
    description: "Guide Snail Bob to his new home.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob",
    rating: 4.1,
    plays: 15000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-2",
    title: "Snail Bob 2",
    description: "Snail Bob is back to deliver a gift.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-2",
    rating: 4.6,
    plays: 14000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-3",
    title: "Snail Bob 3: Egypt",
    description: "Bob gets trapped in ancient Egypt.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-3",
    rating: 4.1,
    plays: 13000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-4",
    title: "Snail Bob 4: Space",
    description: "Bob goes to space to defeat the evil alien.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-4",
    rating: 4.6,
    plays: 12000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "gun-mayhem",
    title: "Gun Mayhem",
    description: "High octane arena shooter with customizable guns.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?w=800&q=80",
    embed: "https://www.crazygames.com/embed/gun-mayhem",
    rating: 4.7,
    plays: 45000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "gun-mayhem-2",
    title: "Gun Mayhem 2",
    description: "More guns, more maps, more mayhem.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?w=800&q=80",
    embed: "https://www.crazygames.com/embed/gun-mayhem-2",
    rating: 4.8,
    plays: 40000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "raze",
    title: "Raze",
    description: "Fight aliens and robots in this futuristic arena shooter.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/raze",
    rating: 4.4,
    plays: 35000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "raze-2",
    title: "Raze 2",
    description: "The epic sequel to the hit sci-fi shooter.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/raze-2",
    rating: 4.3,
    plays: 32000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "strike-force-heroes",
    title: "Strike Force Heroes",
    description: "Level up 4 unique classes in this arena shooter.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/strike-force-heroes",
    rating: 4.4,
    plays: 50000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "strike-force-heroes-2",
    title: "Strike Force Heroes 2",
    description: "More classes and a deeper campaign.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/strike-force-heroes-2",
    rating: 4.3,
    plays: 45000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "boxhead-2play",
    title: "Boxhead 2Play Rooms",
    description: "Survive endless waves of zombies.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80",
    embed: "https://www.crazygames.com/embed/boxhead-2play",
    rating: 4.3,
    plays: 28000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "sift-heads-world",
    title: "Sift Heads World",
    description: "Play as Vinnie, Kiro or Shorty in this stickman sniper game.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1584852959828-09199321e10d?w=800&q=80",
    embed: "https://www.crazygames.com/embed/sift-heads-world",
    rating: 4.4,
    plays: 30000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "madness-interactive",
    title: "Madness Interactive",
    description: "Classic side-scrolling madness combat.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80",
    embed: "https://www.crazygames.com/embed/madness-interactive",
    rating: 4.4,
    plays: 25000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "stick-war",
    title: "Stick War",
    description: "Command your army and conquer Inamorta.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80",
    embed: "https://www.crazygames.com/embed/stick-war",
    rating: 4.2,
    plays: 55000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "age-of-war",
    title: "Age of War",
    description: "Evolve your base from the stone age to the future.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800&q=80",
    embed: "https://www.crazygames.com/embed/age-of-war",
    rating: 4.4,
    plays: 48000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "plazma-burst-2",
    title: "Plazma Burst 2",
    description: "A frantic sci-fi platform shooter with physics.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    embed: "https://www.crazygames.com/embed/plazma-burst-2",
    rating: 4.7,
    plays: 38000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "bloons-td-4",
    title: "Bloons Tower Defense 4",
    description: "Pop the bloons before they reach the end.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    embed: "https://www.crazygames.com/embed/bloons-td-4",
    rating: 4.3,
    plays: 60000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "bloons-td-5",
    title: "Bloons Tower Defense 5",
    description: "Even more monkeys, tracks, and bloon-popping action.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    embed: "https://www.crazygames.com/embed/bloons-td-5",
    rating: 4.2,
    plays: 75000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "impossible-quiz",
    title: "The Impossible Quiz",
    description: "The ultimate test of lateral thinking and frustration.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
    embed: "https://www.crazygames.com/embed/impossible-quiz",
    rating: 4.5,
    plays: 40000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "worlds-hardest-game",
    title: "World's Hardest Game",
    description: "Move the red square to the green zone. It is harder than it looks.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    embed: "https://www.crazygames.com/embed/worlds-hardest-game",
    rating: 4.5,
    plays: 35000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "duck-life",
    title: "Duck Life",
    description: "Train your duck to become the ultimate racer.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1555685812-4b743e13d96e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/duck-life",
    rating: 4.4,
    plays: 20000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "line-rider",
    title: "Line Rider",
    description: "Draw a track and watch Bosh ride the sled.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    embed: "https://www.crazygames.com/embed/line-rider",
    rating: 4.3,
    plays: 33000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "fancy-pants",
    title: "Fancy Pants Adventure",
    description: "Fluid platforming with a very fancy stickman.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80",
    embed: "https://www.crazygames.com/embed/fancy-pants",
    rating: 4.4,
    plays: 42000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "learn-to-fly-2",
    title: "Learn to Fly 2",
    description: "Penguins can fly if you strap rockets to them.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800&q=80",
    embed: "https://www.crazygames.com/embed/learn-to-fly-2",
    rating: 4.3,
    plays: 25000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "qwop",
    title: "QWOP",
    description: "Control a track runner's thighs and calves individually.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1552674605-15c3705be3bc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/qwop",
    rating: 4.2,
    plays: 15000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "earn-to-die",
    title: "Earn to Die",
    description: "Drive your car through a zombie apocalypse.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/earn-to-die",
    rating: 4.9,
    plays: 30000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "ssf2",
    title: "Super Smash Flash 2",
    description: "The ultimate fan-made fighting game.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/ssf2",
    rating: 4.5,
    plays: 65000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "portal-flash",
    title: "Portal: Flash Version",
    description: "The 2D demake of the famous puzzle game.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    embed: "https://www.crazygames.com/embed/portal-flash",
    rating: 4.3,
    plays: 18000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "swords-and-sandals-2",
    title: "Swords and Sandals 2",
    description: "Gladiator combat RPG.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    embed: "https://www.crazygames.com/embed/swords-and-sandals-2",
    rating: 4.3,
    plays: 22000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "murloc-rpg",
    title: "Murloc RPG",
    description: "A fan-made WoW spin-off.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    embed: "https://www.crazygames.com/embed/murloc-rpg",
    rating: 4.3,
    plays: 10000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "electric-man-2",
    title: "Electric Man 2",
    description: "High voltage stickman beat-em-up.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=800&q=80",
    embed: "https://www.crazygames.com/embed/electric-man-2",
    rating: 4.4,
    plays: 12000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "thing-thing-arena-3",
    title: "Thing Thing Arena 3",
    description: "Brutal and fast paced shooting gallery.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?w=800&q=80",
    embed: "https://www.crazygames.com/embed/thing-thing-arena-3",
    rating: 4.5,
    plays: 14000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "chaos-faction-2",
    title: "Chaos Faction 2",
    description: "Insane arena brawler with wacky weapons.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    embed: "https://www.crazygames.com/embed/chaos-faction-2",
    rating: 4.8,
    plays: 16000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "crush-the-castle",
    title: "Crush the Castle",
    description: "Use a trebuchet to destroy fortresses.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80",
    embed: "https://www.crazygames.com/embed/crush-the-castle",
    rating: 4.7,
    plays: 24000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "desktop-td",
    title: "Desktop Tower Defense",
    description: "Build mazes to stop the creeps.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    embed: "https://www.crazygames.com/embed/desktop-td",
    rating: 4.5,
    plays: 19000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "infectonator-2",
    title: "Infectonator 2",
    description: "Infect the world with a zombie virus.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&q=80",
    embed: "https://www.crazygames.com/embed/infectonator-2",
    rating: 4.9,
    plays: 21000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "zombotron",
    title: "Zombotron",
    description: "Clear planets of mutants and zombies.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/zombotron",
    rating: 4.9,
    plays: 17000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "heli-attack-3",
    title: "Heli Attack 3",
    description: "Take down endless helicopters.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8?w=800&q=80",
    embed: "https://www.crazygames.com/embed/heli-attack-3",
    rating: 4.7,
    plays: 13000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "riddle-school",
    title: "Riddle School",
    description: "Escape from school in this classic point and click adventure.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
    embed: "https://www.crazygames.com/embed/riddle-school",
    rating: 4.2,
    plays: 11000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "motherload",
    title: "Motherload",
    description: "Dig deep into Mars for rare minerals.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1542360663-8f4023704c56?w=800&q=80",
    embed: "https://www.crazygames.com/embed/motherload",
    rating: 4.4,
    plays: 27000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-hot-doggeria",
    title: "Papa's Hot Doggeria",
    description: "Grill and serve hot dogs at the stadium.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-hot-doggeria",
    rating: 4.8,
    plays: 20000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-wingeria",
    title: "Papa's Wingeria",
    description: "Fry up chicken wings in Starlight City.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-wingeria",
    rating: 4.3,
    plays: 18000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-pancakeria",
    title: "Papa's Pancakeria",
    description: "Stack pancakes and waffles for the locals.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    embed: "https://www.crazygames.com/embed/papas-pancakeria",
    rating: 4.6,
    plays: 16000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-6",
    title: "Wheely 6: Fairytale",
    description: "Wheely enters a fantasy world.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-6",
    rating: 4.2,
    plays: 7500000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-7",
    title: "Wheely 7: Detective",
    description: "Help Wheely solve the mystery of the bank robbery.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-7",
    rating: 4.5,
    plays: 8500000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-8",
    title: "Wheely 8: Aliens",
    description: "Wheely meets extraterrestrials.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
    embed: "https://www.crazygames.com/embed/wheely-8",
    rating: 4.9,
    plays: 6000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-5",
    title: "Snail Bob 5: Love Story",
    description: "Bob travels through the jungle to find love.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-5",
    rating: 4.5,
    plays: 11000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-6",
    title: "Snail Bob 6: Winter Story",
    description: "A festive puzzle adventure in the snow.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-6",
    rating: 4.5,
    plays: 10500000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-7",
    title: "Snail Bob 7: Fantasy Story",
    description: "Bob must defeat a magical dragon.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-7",
    rating: 4.8,
    plays: 9000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "snail-bob-8",
    title: "Snail Bob 8: Island Story",
    description: "Bob is stranded on a remote island.",
    category: "Flash",
    thumbnail: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=800&q=80",
    embed: "https://www.crazygames.com/embed/snail-bob-8",
    rating: 4.8,
    plays: 8500000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
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
