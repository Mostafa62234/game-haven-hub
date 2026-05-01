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
      "https://tse2.mm.bing.net/th?q=Tic%20Tac%20Toe%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=2048%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Hextris%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Memory%20Match%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Chess%20Online%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Minesweeper%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Sudoku%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Pac-Man%20(Google%20Doodle)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Tetris%20Tribute%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Snake%20Classic%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Pong%20(HTML5)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Prince%20of%20Persia%20(HTML5)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=DOOM%20(Browser%20Port)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Minecraft%20Classic%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Chrome%20Dino%20Game%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Sandspiel%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Slow%20Roads%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Mario-Style%20Platformer%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Agar.io%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Flap%20Adventure%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Checkers%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Wolfenstein%203D%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=The%20Oregon%20Trail%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Lemmings%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
      "https://tse2.mm.bing.net/th?q=Donkey%20Kong%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://archive.org/embed/msdos_Donkey_Kong_1983",
    rating: 4.8,
    plays: 1500000,
    tags: ["arcade", "80s", "platformer"],
    source: "Internet Archive",
  },
  {
    slug: "daggerfall",
    title: "The Elder Scrolls II: Daggerfall",
    description: "The massive 1996 fantasy open-world RPG by Bethesda.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=The%20Elder%20Scrolls%20II%3A%20Daggerfall%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "jsdos:https://archive.org/cors/msdos_Elder_Scrolls_The_-_Daggerfall_1996/Elder_Scrolls_The_-_Daggerfall_1996.zip",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Fallout%20(1997)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "jsdos:https://archive.org/cors/msdos_Fallout_1997/Fallout_1997.zip",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Diablo%20(Shareware)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Ultima%20IV%3A%20Quest%20of%20the%20Avatar%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=OpenTTD%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Gunblood%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/gunblood/iframe",
    rating: 4.5,
    plays: 5200000,
    tags: ["flash", "shooter", "action"],
    source: "CrazyGames (Ruffle Emulation)"
  },
  {
    slug: "happy-wheels",
    title: "Happy Wheels",
    description: "The notoriously gory and hilarious physics-based ragdoll Flash game.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Happy%20Wheels%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/happy-wheels/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Pizzeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-pizzeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Pizzeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-pizzeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Burgeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-burgeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Freezeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-freezeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Taco%20Mia%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-taco-mia/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Cupcakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-cupcakeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%201%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-1/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-2/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%203%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-3/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%204%3A%20Time%20Travel%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-4/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%205%3A%20Armageddon%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-5/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-2/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%203%3A%20Egypt%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-3/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%204%3A%20Space%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-4/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Gun%20Mayhem%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/gun-mayhem/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Gun%20Mayhem%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/gun-mayhem-2/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Raze%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/raze/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Raze%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/raze-2/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Strike%20Force%20Heroes%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/strike-force-heroes/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Strike%20Force%20Heroes%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/strike-force-heroes-2/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Boxhead%202Play%20Rooms%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/boxhead-2play/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Sift%20Heads%20World%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/sift-heads-world/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Madness%20Interactive%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/madness-interactive/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Stick%20War%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/stick-war/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Age%20of%20War%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/age-of-war/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Plazma%20Burst%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/plazma-burst-2/iframe",
    rating: 4.7,
    plays: 38000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "worlds-hardest-game",
    title: "World's Hardest Game",
    description: "Move the red square to the green zone. It is harder than it looks.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=World's%20Hardest%20Game%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/worlds-hardest-game/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Duck%20Life%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/duck-life/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Line%20Rider%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/line-rider/iframe",
    rating: 4.3,
    plays: 33000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "learn-to-fly-2",
    title: "Learn to Fly 2",
    description: "Penguins can fly if you strap rockets to them.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Learn%20to%20Fly%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/learn-to-fly-2/iframe",
    rating: 4.3,
    plays: 25000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "earn-to-die",
    title: "Earn to Die",
    description: "Drive your car through a zombie apocalypse.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Earn%20to%20Die%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/earn-to-die/iframe",
    rating: 4.9,
    plays: 30000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "swords-and-sandals-2",
    title: "Swords and Sandals 2",
    description: "Gladiator combat RPG.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Swords%20and%20Sandals%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/swords-and-sandals-2/iframe",
    rating: 4.3,
    plays: 22000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "chaos-faction-2",
    title: "Chaos Faction 2",
    description: "Insane arena brawler with wacky weapons.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Chaos%20Faction%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/chaos-faction-2/iframe",
    rating: 4.8,
    plays: 16000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "zombotron",
    title: "Zombotron",
    description: "Clear planets of mutants and zombies.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Zombotron%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/zombotron/iframe",
    rating: 4.9,
    plays: 17000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "riddle-school",
    title: "Riddle School",
    description: "Escape from school in this classic point and click adventure.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Riddle%20School%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/riddle-school/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Motherload%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/motherload/iframe",
    rating: 4.4,
    plays: 27000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "papas-wingeria",
    title: "Papa's Wingeria",
    description: "Fry up chicken wings in Starlight City.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Wingeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-wingeria/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Pancakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/papas-pancakeria/iframe",
    rating: 4.6,
    plays: 16000000,
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  },
  {
    slug: "wheely-7",
    title: "Wheely 7: Detective",
    description: "Help Wheely solve the mystery of the bank robbery.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%207%3A%20Detective%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-7/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Wheely%208%3A%20Aliens%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/wheely-8/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%205%3A%20Love%20Story%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-5/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%206%3A%20Winter%20Story%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-6/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%207%3A%20Fantasy%20Story%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-7/iframe",
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
    thumbnail: "https://tse2.mm.bing.net/th?q=Snail%20Bob%208%3A%20Island%20Story%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.silvergames.com/en/snail-bob-8/iframe",
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
