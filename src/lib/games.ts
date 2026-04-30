export type GameCategory = "Arcade" | "Puzzle" | "Multiplayer" | "Strategy" | "Casual";

export interface Game {
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  embed: string; // iframe URL or internal route prefix `internal:`
  rating: number; // 0-5
  plays: string;
  tags: string[];
}

// Curated set of free, embeddable HTML5 games (open-source / itch.io / GitHub Pages)
// plus our own internal games (prefixed with `internal:`).
export const GAMES: Game[] = [
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    description:
      "The classic 3-in-a-row strategy game. Play locally with a friend on the same device — quick, smart, and surprisingly deep.",
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
      "Combine matching tiles to reach the legendary 2048 tile. A perfectly addictive puzzle that's easy to learn and hard to master.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80&auto=format&fit=crop&sat=-30",
    embed: "https://play2048.co/",
    rating: 4.8,
    plays: "8.4M",
    tags: ["numbers", "puzzle", "addictive"],
  },
  {
    slug: "hextris",
    title: "Hextris",
    description:
      "A fast-paced puzzle game inspired by Tetris. Match colors on a rotating hexagon before the stack overflows.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80&auto=format&fit=crop",
    embed: "https://hextris.io/",
    rating: 4.7,
    plays: "3.1M",
    tags: ["arcade", "tetris-like", "fast"],
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
    slug: "memory-match",
    title: "Memory Match",
    description:
      "Flip cards two at a time and find every matching pair. Train your memory with this beautiful classic.",
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
      "Play the timeless game of strategy against an opponent. Plan ahead, control the center, and checkmate.",
    category: "Strategy",
    thumbnail:
      "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80&auto=format&fit=crop",
    embed: "https://lichess.org/",
    rating: 4.9,
    plays: "20M",
    tags: ["strategy", "classic", "deep"],
  },
  {
    slug: "snake",
    title: "Snake Classic",
    description:
      "Eat, grow longer, and don't bite yourself. A timeless arcade favorite reborn for the browser.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800&q=80&auto=format&fit=crop",
    embed: "https://patorjk.com/games/snake/",
    rating: 4.3,
    plays: "5.6M",
    tags: ["retro", "arcade", "single-player"],
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    description:
      "Use logic to clear the board without detonating any of the hidden mines. The Windows classic, modernized.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80&auto=format&fit=crop&hue=120",
    embed: "https://minesweeper.online/",
    rating: 4.6,
    plays: "9.2M",
    tags: ["logic", "classic", "single-player"],
  },
  {
    slug: "uno",
    title: "UNO Cards",
    description:
      "The world-famous card game. Match colors and numbers to be the first to empty your hand.",
    category: "Multiplayer",
    thumbnail:
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&q=80&auto=format&fit=crop",
    embed: "https://www.gameaza.com/uno-online",
    rating: 4.5,
    plays: "4.4M",
    tags: ["cards", "party", "multiplayer"],
  },
  {
    slug: "sudoku",
    title: "Sudoku",
    description:
      "Fill the grid so every row, column and box contains 1-9. The number puzzle the world fell in love with.",
    category: "Puzzle",
    thumbnail:
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80&auto=format&fit=crop",
    embed: "https://sudoku.com/",
    rating: 4.7,
    plays: "11M",
    tags: ["numbers", "logic", "daily"],
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
  {
    slug: "tetris",
    title: "Tetris Tribute",
    description:
      "Stack falling tetrominoes, clear lines, and chase the high score. Pure arcade bliss.",
    category: "Arcade",
    thumbnail:
      "https://images.unsplash.com/photo-1633218388467-539651dcf81a?w=800&q=80&auto=format&fit=crop",
    embed: "https://tetris.com/play-tetris",
    rating: 4.8,
    plays: "15M",
    tags: ["arcade", "classic", "score"],
  },
];

export const CATEGORIES: GameCategory[] = [
  "Arcade",
  "Puzzle",
  "Multiplayer",
  "Strategy",
  "Casual",
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
