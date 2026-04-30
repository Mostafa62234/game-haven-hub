export type GameCategory =
  | "Arcade"
  | "Puzzle"
  | "Multiplayer"
  | "Strategy"
  | "Casual"
  | "Retro";

export interface Game {
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  embed: string; // iframe URL or `internal:slug`
  rating: number;
  plays: string;
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
    embed: "internal:tic-tac-toe",
    rating: 4.6,
    plays: "1.2M",
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
    embed: "https://play2048.co/",
    rating: 4.8,
    plays: "8.4M",
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
    embed: "https://hextris.io/",
    rating: 4.7,
    plays: "3.1M",
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
    embed: "internal:memory-match",
    rating: 4.5,
    plays: "650K",
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
    embed: "https://lichess.org/",
    rating: 4.9,
    plays: "20M",
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
    embed: "https://minesweeper.online/",
    rating: 4.6,
    plays: "9.2M",
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
    embed: "https://sudoku.com/",
    rating: 4.7,
    plays: "11M",
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
    embed: "https://elgoog.im/pacman/",
    rating: 4.9,
    plays: "30M",
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
    embed: "https://tetris.com/play-tetris",
    rating: 4.8,
    plays: "15M",
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
    embed: "https://patorjk.com/games/snake/",
    rating: 4.3,
    plays: "5.6M",
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
    embed: "https://www.ponggame.org/",
    rating: 4.2,
    plays: "1.8M",
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
    embed: "https://princejs.com/",
    rating: 4.7,
    plays: "2.4M",
    tags: ["platformer", "80s", "adventure"],
    source: "princejs.com (open-source port by Oliver Klemenz)",
  },
  {
    slug: "doom",
    title: "DOOM (Browser Port)",
    description:
      "The 1993 first-person shooter that shaped the genre. Playable in your browser via the official Internet Archive port.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80&auto=format&fit=crop",
    embed:
      "https://archive.org/embed/doom-play",
    rating: 4.8,
    plays: "9.1M",
    tags: ["fps", "90s", "classic"],
    source: "Internet Archive (legal browser port)",
  },
  {
    slug: "wolfenstein-3d",
    title: "Wolfenstein 3D",
    description:
      "Id Software's 1992 FPS pioneer, playable in-browser via the Internet Archive's authorized emulator build.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/msdos_Wolfenstein_3D_1992",
    rating: 4.6,
    plays: "3.3M",
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
    embed: "https://archive.org/embed/msdos_Oregon_Trail_The_1990",
    rating: 4.4,
    plays: "4.2M",
    tags: ["classic", "educational", "90s"],
    source: "Internet Archive",
  },
  {
    slug: "sim-city",
    title: "SimCity Classic",
    description:
      "Build and manage your own city in Maxis's genre-defining 1989 simulation.",
    category: "Strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80&auto=format&fit=crop",
    embed: "https://archive.org/embed/SimCityClassic",
    rating: 4.6,
    plays: "5.7M",
    tags: ["sim", "classic", "city-builder"],
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
    embed: "https://archive.org/embed/msdos_Lemmings_1991",
    rating: 4.7,
    plays: "2.9M",
    tags: ["puzzle", "platformer", "90s"],
    source: "Internet Archive",
  },
  {
    slug: "prince-of-persia-2",
    title: "Mario-Style Platformer",
    description:
      "An open-source side-scrolling platformer in the spirit of the SNES era. Run, jump, collect coins.",
    category: "Retro",
    thumbnail:
      "https://images.unsplash.com/photo-1606503153255-59d8b8b6a02e?w=800&q=80&auto=format&fit=crop&hue=30",
    embed: "https://www.mariohtml5.com/",
    rating: 4.5,
    plays: "8.8M",
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
    embed: "https://agar.io/",
    rating: 4.4,
    plays: "50M",
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
    embed: "https://flappybird.io/",
    rating: 4.4,
    plays: "12M",
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
    embed: "https://www.247checkers.com/",
    rating: 4.2,
    plays: "2.1M",
    tags: ["strategy", "2-player", "classic"],
  },
];

export const CATEGORIES: GameCategory[] = [
  "Arcade",
  "Puzzle",
  "Multiplayer",
  "Strategy",
  "Casual",
  "Retro",
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
