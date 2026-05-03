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
// console ROMs (Mario, Zelda, etc.) ΓÇö instead we offer faithful
// open-source clones and the same retro arcade vibe.
export const GAMES: Game[] = [
  {
    slug: "tetris",
    title: "Tetris Tribute",
    description: "Stack falling tetrominoes, clear lines, and chase the high score. Pure arcade bliss.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Tetris%20Tribute%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://tetris.com/play-tetris",
    rating: 4.8,
    plays: 15000000,
    tags: [
      "arcade",
      "classic",
      "score"
    ],
    source: "tetris.com (official)"
  },
  {
    slug: "doom",
    title: "DOOM (Browser Port)",
    description: "The 1993 first-person shooter that shaped the genre. Playable directly in your browser.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=DOOM%20(Browser%20Port)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://silentspacemarine.com/",
    rating: 4.8,
    plays: 9100000,
    tags: [
      "fps",
      "90s",
      "classic"
    ],
    source: "silentspacemarine.com (HTML5 Port)"
  },
  {
    slug: "oregon-trail",
    title: "The Oregon Trail",
    description: "Lead your wagon party west across 19th-century America in this educational classic.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=The%20Oregon%20Trail%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://archive.org/embed/msdos_Oregon_Trail_The_1990?autoplay=1",
    rating: 4.4,
    plays: 4200000,
    tags: [
      "classic",
      "educational",
      "90s"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wolfenstein-3d",
    title: "Wolfenstein 3D",
    description: "Id Software's 1992 FPS pioneer, playable in-browser via the Internet Archive's authorized emulator build.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Wolfenstein%203D%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://archive.org/embed/msdos_Wolfenstein_3D_1992?autoplay=1",
    rating: 4.6,
    plays: 3300000,
    tags: [
      "fps",
      "90s",
      "id-software"
    ],
    source: "Internet Archive MS-DOS collection"
  },
  {
    slug: "fallout-1",
    title: "Fallout (1997)",
    description: "A Post Nuclear Role Playing Game. The classic that started it all.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Fallout%20(1997)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "jsdos:https://archive.org/cors/msdos_Fallout_1997/Fallout_1997.zip|FALLOUT",
    rating: 4.9,
    plays: 2800000,
    tags: [
      "rpg",
      "post-apocalyptic",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "donkey-kong",
    title: "Donkey Kong",
    description: "The classic 1983 MS-DOS port of the arcade legend. Climb the ladders and dodge the barrels!",
    category: "Retro",
    thumbnail: "https://archive.org/services/img/msdos_Donkey_Kong_1983",
    embed: "https://archive.org/embed/msdos_Donkey_Kong_1983?autoplay=1",
    rating: 4.8,
    plays: 1500000,
    tags: [
      "arcade",
      "80s",
      "platformer"
    ],
    source: "Internet Archive"
  },
  {
    slug: "daggerfall",
    title: "The Elder Scrolls II: Daggerfall",
    description: "The massive 1996 fantasy open-world RPG by Bethesda.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=The%20Elder%20Scrolls%20II%3A%20Daggerfall%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "jsdos:https://archive.org/cors/msdos_Elder_Scrolls_The_-_Daggerfall_1996/Elder_Scrolls_The_-_Daggerfall_1996.zip|DAGGER",
    rating: 4.8,
    plays: 1400000,
    tags: [
      "rpg",
      "open-world",
      "90s"
    ],
    source: "Internet Archive"
  },
  {
    slug: "pac-man-flash",
    title: "Pac-Man (Flash)",
    description: "(woah theres flash emulation on archive.org, epic! gotta try this out) One of the most popular and influential games of the 1980's,  Pac-Man  stars...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/pacman_swf",
    embed: "ruffle:https://archive.org/cors/pacman_swf/pacman.swf",
    rating: 4,
    plays: 374572,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "The classic 3-in-a-row strategy game. Play locally with a friend or online over a room code.",
    category: "Multiplayer",
    thumbnail: "https://tse2.mm.bing.net/th?q=Tic%20Tac%20Toe%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "internal:tic-tac-toe",
    rating: 4.6,
    plays: 1200000,
    tags: [
      "classic",
      "2-player",
      "quick"
    ]
  },
  {
    slug: "2048",
    title: "2048",
    description: "Combine matching tiles to reach the legendary 2048 tile. Easy to learn, hard to master.",
    category: "Puzzle",
    thumbnail: "https://tse2.mm.bing.net/th?q=2048%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://play2048.co/",
    rating: 4.8,
    plays: 8400000,
    tags: [
      "numbers",
      "puzzle",
      "addictive"
    ],
    source: "play2048.co (open-source, MIT)"
  },
  {
    slug: "hextris",
    title: "Hextris",
    description: "A fast-paced puzzle game inspired by Tetris. Match colors on a rotating hexagon.",
    category: "Arcade",
    thumbnail: "https://tse2.mm.bing.net/th?q=Hextris%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://hextris.io/",
    rating: 4.7,
    plays: 3100000,
    tags: [
      "arcade",
      "tetris-like",
      "fast"
    ],
    source: "hextris.io (open-source)"
  },
  {
    slug: "memory-match",
    title: "Memory Match",
    description: "Flip cards two at a time and find every matching pair. Train your memory.",
    category: "Casual",
    thumbnail: "https://tse2.mm.bing.net/th?q=Memory%20Match%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "internal:memory-match",
    rating: 4.5,
    plays: 650000,
    tags: [
      "memory",
      "casual",
      "single-player"
    ]
  },
  {
    slug: "chess",
    title: "Chess Online",
    description: "Play the timeless game of strategy. Plan ahead, control the center, checkmate.",
    category: "Strategy",
    thumbnail: "https://tse2.mm.bing.net/th?q=Chess%20Online%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://lichess.org/",
    rating: 4.9,
    plays: 20000000,
    tags: [
      "strategy",
      "classic",
      "deep"
    ],
    source: "lichess.org (free & open-source)"
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    description: "Use logic to clear the board without detonating any of the hidden mines.",
    category: "Puzzle",
    thumbnail: "https://tse2.mm.bing.net/th?q=Minesweeper%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://minesweeper.online/",
    rating: 4.6,
    plays: 9200000,
    tags: [
      "logic",
      "classic",
      "single-player"
    ]
  },
  {
    slug: "sudoku",
    title: "Sudoku",
    description: "Fill the grid so every row, column and box contains 1-9. The number puzzle the world loves.",
    category: "Puzzle",
    thumbnail: "https://tse2.mm.bing.net/th?q=Sudoku%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://sudoku.com/",
    rating: 4.7,
    plays: 11000000,
    tags: [
      "numbers",
      "logic",
      "daily"
    ]
  },
  {
    slug: "pacman-doodle",
    title: "Pac-Man (Google Doodle)",
    description: "The official Google 30th-anniversary Pac-Man doodle ΓÇö the original arcade legend, playable in your browser.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Pac-Man%20(Google%20Doodle)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://elgoog.im/pacman/",
    rating: 4.9,
    plays: 30000000,
    tags: [
      "arcade",
      "80s",
      "official"
    ],
    source: "elgoog.im (Google Doodle archive)"
  },
  {
    slug: "pong",
    title: "Pong (HTML5)",
    description: "The game that started it all. Two paddles, one ball, infinite reflexes.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Pong%20(HTML5)%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.ponggame.org/",
    rating: 4.2,
    plays: 1800000,
    tags: [
      "retro",
      "70s",
      "2-player"
    ]
  },
  {
    slug: "minecraft-classic",
    title: "Minecraft Classic",
    description: "The original 2009 Minecraft experience. Build and destroy blocks in a shared browser world.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Minecraft%20Classic%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://classic.minecraft.net/",
    rating: 4.6,
    plays: 3300000,
    tags: [
      "classic",
      "building",
      "sandbox"
    ],
    source: "classic.minecraft.net"
  },
  {
    slug: "chrome-dino",
    title: "Chrome Dino Game",
    description: "The legendary T-Rex runner game! Jump the cacti and duck the pterodactyls in an endless desert.",
    category: "Arcade",
    thumbnail: "https://tse2.mm.bing.net/th?q=Chrome%20Dino%20Game%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://dino-chrome.com/",
    rating: 4.4,
    plays: 4200000,
    tags: [
      "runner",
      "arcade",
      "casual"
    ],
    source: "dino-chrome.com"
  },
  {
    slug: "sandspiel",
    title: "Sandspiel",
    description: "A falling sand game with cellular automata. Create art, elements, and complex ecosystems.",
    category: "Casual",
    thumbnail: "https://tse2.mm.bing.net/th?q=Sandspiel%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://sandspiel.club/",
    rating: 4.6,
    plays: 5700000,
    tags: [
      "sandbox",
      "simulation",
      "physics"
    ],
    source: "sandspiel.club"
  },
  {
    slug: "slow-roads",
    title: "Slow Roads",
    description: "A casual, endlessly generated driving game. Relax, take in the beautiful scenery, and enjoy the open road.",
    category: "Casual",
    thumbnail: "https://tse2.mm.bing.net/th?q=Slow%20Roads%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://slowroads.io/",
    rating: 4.7,
    plays: 2900000,
    tags: [
      "driving",
      "relaxing",
      "simulation"
    ],
    source: "slowroads.io"
  },
  {
    slug: "agar",
    title: "Agar.io",
    description: "Eat smaller cells, avoid bigger ones, and become the biggest blob on the server.",
    category: "Multiplayer",
    thumbnail: "https://tse2.mm.bing.net/th?q=Agar.io%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://agar.io/",
    rating: 4.4,
    plays: 50000000,
    tags: [
      "io",
      "multiplayer",
      "casual"
    ]
  },
  {
    slug: "flappy-bird",
    title: "Flap Adventure",
    description: "Tap to flap and dodge the pipes. One of the most addictive arcade challenges of all time.",
    category: "Arcade",
    thumbnail: "https://tse2.mm.bing.net/th?q=Flap%20Adventure%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://flappybird.io/",
    rating: 4.4,
    plays: 12000000,
    tags: [
      "arcade",
      "casual",
      "one-tap"
    ]
  },
  {
    slug: "checkers",
    title: "Checkers",
    description: "Jump, capture, and crown your kings. A simple-to-learn strategy classic for two players.",
    category: "Strategy",
    thumbnail: "https://tse2.mm.bing.net/th?q=Checkers%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://www.247checkers.com/",
    rating: 4.2,
    plays: 2100000,
    tags: [
      "strategy",
      "2-player",
      "classic"
    ]
  },
  {
    slug: "lemmings",
    title: "Lemmings",
    description: "Save the lemmings by assigning them tasks before they walk off a cliff. A puzzle-platformer icon.",
    category: "Puzzle",
    thumbnail: "https://tse2.mm.bing.net/th?q=Lemmings%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://archive.org/embed/msdos_Lemmings_1991?autoplay=1",
    rating: 4.7,
    plays: 2900000,
    tags: [
      "puzzle",
      "platformer",
      "90s"
    ],
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
    tags: [
      "rpg",
      "action",
      "dungeon-crawler"
    ],
    source: "DiabloWeb (Open Source Port)"
  },
  {
    slug: "ultima-4",
    title: "Ultima IV: Quest of the Avatar",
    description: "The pioneering 1985 RPG that defined moral choices in gaming.",
    category: "Retro",
    thumbnail: "https://tse2.mm.bing.net/th?q=Ultima%20IV%3A%20Quest%20of%20the%20Avatar%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://archive.org/embed/msdos_Ultima_IV_-_Quest_of_the_Avatar_1985?autoplay=1",
    rating: 4.6,
    plays: 850000,
    tags: [
      "rpg",
      "80s",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "openttd",
    title: "OpenTTD",
    description: "Open-source transport simulation game based on Transport Tycoon Deluxe. Build a massive transport empire!",
    category: "Strategy",
    thumbnail: "https://tse2.mm.bing.net/th?q=OpenTTD%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "https://openttdonline.com/play",
    rating: 4.8,
    plays: 1100000,
    tags: [
      "simulation",
      "strategy",
      "open-source"
    ],
    source: "OpenTTD Online (official)"
  },

  {
    slug: "gunblood",
    title: "Gunblood",
    description: "The classic Western shootout Flash game. Draw your weapon and test your reflexes.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Gunblood%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/gunblood_flash/gunblood.swf",
    rating: 4.5,
    plays: 5200000,
    tags: [
      "flash",
      "shooter",
      "action"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-wheels",
    title: "Happy Wheels",
    description: "The notoriously gory and hilarious physics-based ragdoll Flash game.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Happy%20Wheels%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/happy-wheels-flash/happyWheels.swf",
    rating: 4.9,
    plays: 85000000,
    tags: [
      "flash",
      "physics",
      "funny"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-freezeria",
    title: "Papa's Freezeria",
    description: "Mix up frozen treats on the island.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Freezeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/papasfreezeria_202011/papasfreezeria.swf",
    rating: 4.4,
    plays: 30000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-taco-mia",
    title: "Papa's Taco Mia",
    description: "Build tacos for crazy customers.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Taco%20Mia%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/papastacomia_202008/papastacomia_v2.swf",
    rating: 4.1,
    plays: 18000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-cupcakeria",
    title: "Papa's Cupcakeria",
    description: "Bake and frost cupcakes.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Cupcakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/papascupcakeria_v2/papascupcakeria_v2.swf",
    rating: 4.6,
    plays: 19000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "gun-mayhem",
    title: "Gun Mayhem",
    description: "High octane arena shooter with customizable guns.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Gun%20Mayhem%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/gunmayhem/gunmayhem.swf",
    rating: 4.7,
    plays: 45000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "gun-mayhem-2",
    title: "Gun Mayhem 2",
    description: "More guns, more maps, more mayhem.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Gun%20Mayhem%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/gun-mayhem-two/Gun Mayhem 2 More Mayhem.swf",
    rating: 4.8,
    plays: 40000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "raze",
    title: "Raze",
    description: "Fight aliens and robots in this futuristic arena shooter.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Raze%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/raze-2/Raze 2.swf",
    rating: 4.4,
    plays: 35000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "strike-force-heroes",
    title: "Strike Force Heroes",
    description: "Level up 4 unique classes in this arena shooter.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Strike%20Force%20Heroes%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/strikeforceheroes_202310/strikeforceheroes.swf",
    rating: 4.4,
    plays: 50000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "madness-interactive",
    title: "Madness Interactive",
    description: "Classic side-scrolling madness combat.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Madness%20Interactive%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/madness_202303/Madness.swf",
    rating: 4.4,
    plays: 25000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "stick-war",
    title: "Stick War",
    description: "Command your army and conquer Inamorta.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Stick%20War%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/stick-war-2.5-user-control/Stick_War_2.5_User_Control.swf",
    rating: 4.2,
    plays: 55000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },

  {
    slug: "worlds-hardest-game",
    title: "World's Hardest Game",
    description: "Move the red square to the green zone. It is harder than it looks.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=World's%20Hardest%20Game%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/flash_theworldshardestgame2/theworldshardestgame2.swf",
    rating: 4.5,
    plays: 35000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "duck-life",
    title: "Duck Life",
    description: "Train your duck to become the ultimate racer.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Duck%20Life%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/duck-life/duck-life.swf",
    rating: 4.4,
    plays: 20000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "line-rider",
    title: "Line Rider",
    description: "Draw a track and watch Bosh ride the sled.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Line%20Rider%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/flash_Line_Rider_2/Line_Rider_2.swf",
    rating: 4.3,
    plays: 33000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "learn-to-fly-2",
    title: "Learn to Fly 2",
    description: "Penguins can fly if you strap rockets to them.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Learn%20to%20Fly%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/learn-to-fly-2_202210/learn to fly 2.swf",
    rating: 4.3,
    plays: 25000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "earn-to-die",
    title: "Earn to Die",
    description: "Drive your car through a zombie apocalypse.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Earn%20to%20Die%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/earn-to-die-2016/Earn to Die 2016.swf",
    rating: 4.9,
    plays: 30000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "swords-and-sandals-2",
    title: "Swords and Sandals 2",
    description: "Gladiator combat RPG.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Swords%20and%20Sandals%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/swords-and-sandals-2-demo_flash/358324_swords_sandals2_promo.swf",
    rating: 4.3,
    plays: 22000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "chaos-faction-2",
    title: "Chaos Faction 2",
    description: "Insane arena brawler with wacky weapons.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Chaos%20Faction%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/chaos-faction-2-5645/chaos-faction-2-5645.swf",
    rating: 4.8,
    plays: 16000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "zombotron",
    title: "Zombotron",
    description: "Clear planets of mutants and zombies.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Zombotron%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/575535-zombotron_202504/575535_Zombotron.swf",
    rating: 4.9,
    plays: 17000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "riddle-school",
    title: "Riddle School",
    description: "Escape from school in this classic point and click adventure.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Riddle%20School%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/riddleschool5_202011/RiddleSchool5.swf",
    rating: 4.2,
    plays: 11000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "motherload",
    title: "Motherload",
    description: "Dig deep into Mars for rare minerals.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Motherload%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/motherload_202209/motherload.swf",
    rating: 4.4,
    plays: 27000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-wingeria",
    title: "Papa's Wingeria",
    description: "Fry up chicken wings in Starlight City.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Wingeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/papaswingeria_v2/papaswingeria_v2.swf",
    rating: 4.3,
    plays: 18000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-pancakeria",
    title: "Papa's Pancakeria",
    description: "Stack pancakes and waffles for the locals.",
    category: "Flash",
    thumbnail: "https://tse2.mm.bing.net/th?q=Papa's%20Pancakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7",
    embed: "ruffle:https://archive.org/cors/papas-pancakeria-game/papaspancakeria_v2.swf",
    rating: 4.6,
    plays: 16000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-binding-of-isaac-wrath-of-the-lamb-flash",
    title: "The Binding Of Isaac: Wrath of the Lamb (Flash)",
    description: "The flash version of The Binding of Isaac: Wrath of the Lamb",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/the-binding-of-isaac_202111",
    embed: "ruffle:https://archive.org/cors/the-binding-of-isaac_202111/The Binding of Isaac.swf",
    rating: 4.3,
    plays: 519926,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "homerun",
    title: "homerun",
    description: "くまのプーさんのホームランダービー タイミングを合わせて、マウスでバットを振ろう！ ホームラン何本打てるかな？ ジャンル：スポーツ　名人向け　難易度：★★★★★",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/homerun_20201126",
    embed: "ruffle:https://archive.org/cors/homerun_20201126/homerun.swf",
    rating: 4.9,
    plays: 181183,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "stick-rpg-complete",
    title: "Stick RPG Complete",
    description: "Made by XGen Studios. Play as a stick and get money by working and selling stuff. Contains drug use and fowl language.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/stick-rpg-complete",
    embed: "ruffle:https://archive.org/cors/stick-rpg-complete/Stick-RPG-Complete.swf",
    rating: 4.6,
    plays: 556011,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "cannibals-missioneries",
    title: "Cannibals & Missioneries",
    description: "Classic algorithm game",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/cannibals-missioneries",
    embed: "ruffle:https://archive.org/cors/cannibals-missioneries/Cannibals_&_Missioneries.swf",
    rating: 4.7,
    plays: 109681,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "swords-and-sandals-2-v-2-1-0",
    title: "Swords And Sandals 2 (v 2.1.0)",
    description: "Swords and Sandals 2 is a classic flash game, launched in 2006. The one uploaded here is version Full 2.1.0. To play the game after the end of flas...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/swords-and-sandals-2",
    embed: "ruffle:https://archive.org/cors/swords-and-sandals-2/Swords and Sandals 2 (v 2.1.0).swf",
    rating: 4.5,
    plays: 151089,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "aplicaciones-musicales-en-flash2008-2009",
    title: "aplicaciones musicales en flash2008-2009",
    description: "Conjunto de aplicaciones Ãºtiles para la educaciÃ³n musical creadas pr Julio Payno",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/AplicacionesMusicalesEnFlash2008-2009",
    embed: "ruffle:https://archive.org/cors/AplicacionesMusicalesEnFlash2008-2009/5diferencias.swf",
    rating: 4.9,
    plays: 32438,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "bloxorz",
    title: "Bloxorz",
    description: "GAME DESCRIPTION Bloxorz is a free puzzle game. All that we ask is that you help us maintain order. A square peg into a square hole. It's simple. G...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/bloxors",
    embed: "ruffle:https://archive.org/cors/bloxors/bloxors.swf",
    rating: 4.3,
    plays: 819402,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "winnie-the-pooh-s-home-run-derby-english",
    title: "Winnie the Pooh's Home Run Derby (English)",
    description: "Silly old bear. If the harbinger of spring is the sound of a bat on a ball, then I have become the harbinger of winter: a barren and desolate spot ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/homerunderby_en",
    embed: "ruffle:https://archive.org/cors/homerunderby_en/homerunderby_en.swf",
    rating: 4.4,
    plays: 455248,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "firey-s-candy-bar-adventure",
    title: "Firey's Candy Bar Adventure",
    description: "As seen on Daemeon Network",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/candy-bar-adventure-1",
    embed: "ruffle:https://archive.org/cors/candy-bar-adventure-1/CandyBarAdventure (1).swf",
    rating: 4.1,
    plays: 340489,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "super-mario-crossover-offline",
    title: "Super Mario Crossover Offline",
    description: "Versions v3.1.21 v4.0 Experimental Preview Changes Super Mario Bros. Crossover v3.1.21 Decompressed Disabled online check Unlocked all cheats Unloc...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/SuperMarioCrossoverOffline",
    embed: "ruffle:https://archive.org/cors/SuperMarioCrossoverOffline/super_mario_bros_crossover.swf",
    rating: 4.9,
    plays: 205568,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "mutilate-a-doll-2",
    title: "Mutilate-a-Doll 2",
    description: "--THIS GAME DOES NOT WORK ON THE ARCHIVE.ORG PLAYER DOWNLOAD THE FILE AND OPEN IT ON A FLASH GAME PLAYER-- Flash Game by Rava Games Mutilate variou...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/mutilate-a-doll-2_202011",
    embed: "ruffle:https://archive.org/cors/mutilate-a-doll-2_202011/164481_mutilate-a-doll-2_v4.swf",
    rating: 4.5,
    plays: 123080,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "pico-s-school",
    title: "Pico's School",
    description: "Goth kids have shot up your school, and it's up to Pico to save the day! Originally featured on Newgrounds in 1999, I finally refactored the .FLA t...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_picosschool",
    embed: "ruffle:https://archive.org/cors/flash_picosschool/flash_picosschool.swf",
    rating: 4.8,
    plays: 181725,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "bubble-shooter",
    title: "Bubble Shooter",
    description: "A popular Puzzle Bobble/Bust-A-Move flash clone.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/bubble-shooter_swf",
    embed: "ruffle:https://archive.org/cors/bubble-shooter_swf/bubble-shooter.swf",
    rating: 4.1,
    plays: 329997,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-urinal-game",
    title: "The Urinal Game",
    description: "An early Flash game that was later remade in HTML5. https://www.albinoblacksheep.com/games/urinal",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/urinalgame",
    embed: "ruffle:https://archive.org/cors/urinalgame/urinalgame.swf",
    rating: 4.2,
    plays: 860337,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "get-to-the-top-althrough-there-is-no-top-bfdi",
    title: "Get to the Top Althrough There is No Top BFDI",
    description: "(note that while the game is still playable, you can't tell what your score is) A platformer from htwins where you get BFDI Characters as high as y...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/bfdi_swf",
    embed: "ruffle:https://archive.org/cors/bfdi_swf/ag-bfdi.swf",
    rating: 4.6,
    plays: 642228,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "robot-unicorn-attack",
    title: "Robot Unicorn Attack",
    description: "Robot Unicorn Attack is a Flash game developed by Spiritonin Media Games and published by Adult Swim. It's an endless runner where players take con...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/robotunicornattack_flash",
    embed: "ruffle:https://archive.org/cors/robotunicornattack_flash/robotunicornattack_flash.swf",
    rating: 4,
    plays: 409617,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "a-koopa-s-revenge-2",
    title: "A Koopa's Revenge 2",
    description: "A Koopa's Revenge 2 is out now! HOLD DOWN CONTROL TO RUN. For years the Mario Bros. & company have been stepping on koopas and goombas. Now it's ti...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/a-koopas-revenge-2",
    embed: "ruffle:https://archive.org/cors/a-koopas-revenge-2/a koopa's revenge 2.swf",
    rating: 4.5,
    plays: 636418,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "impossible-quiz-deluxe-newgrounds",
    title: "impossible quiz deluxe newgrounds",
    description: "https://web.archive.org/web/20191210222512/https://uploads.ungrounded.net//365000//365143_Impossible_Quiz_Deluxe_NG..swf",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/impossible-quiz-deluxe-newgrounds",
    embed: "ruffle:https://archive.org/cors/impossible-quiz-deluxe-newgrounds/365143_Impossible_Quiz_Deluxe_NG..swf",
    rating: 4.1,
    plays: 286326,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-big-adventure-of-owata-s-life",
    title: "The Big Adventure of Owata's Life | 人生オワタの大冒険",
    description: "How to play/操作説明: ←↑↓→ | movement / 移動 Z | Jump/ジャンプ X | Shoot/オワタバスター R | Reset/リトライ ESC | Self-explosion/自爆 Others | Variety/いろいろ",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/owata",
    embed: "ruffle:https://archive.org/cors/owata/owata.swf",
    rating: 4.8,
    plays: 471696,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "super-mario-flash-2",
    title: "Super Mario Flash 2",
    description: "Super Mario Flash 2, sequel of Super Mario Flash, is what a sequel should be, the same with more stuff :D. Now based on Super Mario World, the game...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/super-mario-flash-2",
    embed: "ruffle:https://archive.org/cors/super-mario-flash-2/super-mario-flash-2.swf",
    rating: 4.2,
    plays: 187599,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "nick-jr-face-alphabet-game",
    title: "Nick Jr. Face - Alphabet Game",
    description: "Face Has Letters Of The Alphabet From A To Z.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/nick_jr__face___alphabet_game__usa__by_oldadobeflashgames01_de1bf82",
    embed: "ruffle:https://archive.org/cors/nick_jr__face___alphabet_game__usa__by_oldadobeflashgames01_de1bf82/nick_jr__face___alphabet_game__usa__by_oldadobeflashgames01_de1bf82.swf",
    rating: 4,
    plays: 738413,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "madness-project-nexus-classic",
    title: "Madness: Project Nexus Classic",
    description: "Experience the original flash version of Madness Combat: Project Nexus WARNING: The game may try to send you to newgrounds when loads up, to avoid ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/madness-project-nexus-classic",
    embed: "ruffle:https://archive.org/cors/madness-project-nexus-classic/Madness Project Nexus Classic.swf",
    rating: 4,
    plays: 95849,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "super-smash-flash",
    title: "Super Smash Flash",
    description: "Choose your characters and options and battle it out with 28 different characters in the original title that started it all – Super Smash Flash! Th...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/supersmashflash_swf",
    embed: "ruffle:https://archive.org/cors/supersmashflash_swf/SuperSmash.swf",
    rating: 4.5,
    plays: 643118,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-cuddles-pet-smoochie",
    title: "Happy Tree Friends - Cuddles' Pet Smoochie",
    description: "Feeding rabbits can be very dangerous!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-cuddles-pet-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-cuddles-pet-smoochie_flash/htf-cuddles-pet-smoochie_flash.swf",
    rating: 4.4,
    plays: 74878,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "escaping-the-prison",
    title: "Escaping the Prison",
    description: "Escaping the Prison is the second game from the Henry Stickmin series, this is the original version NOT the remastered version. You need Adobe Flas...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/etp_20200826",
    embed: "ruffle:https://archive.org/cors/etp_20200826/533001_PrisonNG.swf",
    rating: 4.6,
    plays: 554185,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "nick-jr-face-numbers-game",
    title: "Nick Jr. Face - Numbers Game",
    description: "Would You Like Count Many Things From 1 to 10?",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/nick_jr__face___numbers_game__usa__by_oldadobeflashgames01_de1bf15",
    embed: "ruffle:https://archive.org/cors/nick_jr__face___numbers_game__usa__by_oldadobeflashgames01_de1bf15/nick_jr__face___numbers_game__usa__by_oldadobeflashgames01_de1bf15.swf",
    rating: 4.1,
    plays: 41604,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "donald-the-beanstalk",
    title: "Donald & the Beanstalk",
    description: "Donald trades his favourite pet, Boo Boo Chicken, for five magic beans. He misses his pet, so Mickey and Goofy go with him up the beanstalk to get ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/beanstalk_swf",
    embed: "ruffle:https://archive.org/cors/beanstalk_swf/beanstalk.swf",
    rating: 4.8,
    plays: 245980,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "reimu-s-donation-box",
    title: "Reimu's Donation Box | 霊夢の賽銭箱",
    description: "Reimu's Donation Box ( 霊夢の賽銭箱 ) is a flash game testing your clicking speed. You have to click as fast as possible to fill the donation box of Reim...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/saisen",
    embed: "ruffle:https://archive.org/cors/saisen/saisen.swf",
    rating: 4.4,
    plays: 497575,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "alien-hominid",
    title: "Alien Hominid",
    description: "Alien Hominid is a side-scrolling shooter in a similar vein to games such as Metal Slug, where one hit instantly kills and has a two-player simulta...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_alien_hominid",
    embed: "ruffle:https://archive.org/cors/flash_alien_hominid/alien_hominid.swf",
    rating: 4.9,
    plays: 862139,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "fiash",
    title: "Fiash!",
    description: "A simple arcade game guiding a fish away from being eaten by other fish.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_fishy",
    embed: "ruffle:https://archive.org/cors/flash_fishy/flash_fishy.swf",
    rating: 4.5,
    plays: 34806,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-nutty-s-party-smoochie",
    title: "Happy Tree Friends - Nutty's Party Smoochie",
    description: "It’s a party and everyone is invited! Just be careful what presents you ask for ‘cause you just may get it!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-nuttys-party-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-nuttys-party-smoochie_flash/htf-nuttys-party-smoochie_flash.swf",
    rating: 4.7,
    plays: 761598,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "super-smash-flash-2-classic-edition",
    title: "Super Smash Flash 2: Classic Edition",
    description: "Version 3.1.1a (In-Universe Version Release November 11, 2013) Bugs fixed Hyrule Castle New Music (In-Universe Inital Release June 26, 2011)",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/ssf2-2007_20210626",
    embed: "ruffle:https://archive.org/cors/ssf2-2007_20210626/ssf2-2007_20210626.swf",
    rating: 4.4,
    plays: 380807,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-last-stand-union-city",
    title: "the-last-stand-union-city",
    description: "Scavenge, shoot and survive your way through Union City in this sprawling zombie action RPG. Play in Survivor mode for a more realistic experience ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/the-last-stand-union-city",
    embed: "ruffle:https://archive.org/cors/the-last-stand-union-city/the-last-stand-union-city.swf",
    rating: 4.1,
    plays: 570980,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "minecraft-tower-defence-2",
    title: "Minecraft Tower Defence 2",
    description: "Minecraft Flash game by Microwave Games Description: Enjoy the second version of the famous Minecraft Tower Defence. Controls: Mouse",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/minecraft-tower-defence-2",
    embed: "ruffle:https://archive.org/cors/minecraft-tower-defence-2/minecraft-tower-defence-2.swf",
    rating: 4.4,
    plays: 176119,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papa-s-pizzeria",
    title: "Papa's Pizzeria",
    description: "When Papa Louie runs off on another adventure, Delivery Boy Roy is left in charge of Papa's Pizzeria. Unfortunately for Roy, the customers are use ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_papaspizzeria",
    embed: "ruffle:https://archive.org/cors/flash_papaspizzeria/papaspizzeria_v2.swf",
    rating: 4.9,
    plays: 278097,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "drag-racer-v3-flash-game",
    title: "Drag Racer V3 - Flash Game",
    description: "Drag Racer V3 Flash Game Developer: Phantom Games Originally Uploaded: 6 Dec. 2006",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/dragracerv3_202012",
    embed: "ruffle:https://archive.org/cors/dragracerv3_202012/20.swf",
    rating: 4.8,
    plays: 52406,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "tanks",
    title: "TANKS",
    description: "A Scorched Earth clone that supports up to five players, all of which can be controlled by the computer or individual players on a keyboard. There'...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/tanks_flashgame",
    embed: "ruffle:https://archive.org/cors/tanks_flashgame/tanks.swf",
    rating: 4.5,
    plays: 262644,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "super-mario-sunshine-64",
    title: "Super Mario Sunshine 64",
    description: "The predecessor to the popular Super Mario 63. This game is primarily played with the arrow keys and space bar.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/super-mario-sunshine-64",
    embed: "ruffle:https://archive.org/cors/super-mario-sunshine-64/super-mario-sunshine-64.swf",
    rating: 4.9,
    plays: 853757,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-giggles-valentine-smoochie",
    title: "Happy Tree Friends - Giggles' Valentine Smoochie",
    description: "A sweet Valentine’s Day Smoochie featuring Giggles!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-giggles-valentine-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-giggles-valentine-smoochie_flash/htf-giggles-valentine-smoochie_flash.swf",
    rating: 4.1,
    plays: 214444,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-toothy-s-easter-smoochie",
    title: "Happy Tree Friends - Toothy's Easter Smoochie",
    description: "Not every Easter egg turns out to be a treat!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-toothy-s-easter-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-toothy-s-easter-smoochie_flash/htf-toothys-easter-smoochie_flash.swf",
    rating: 4.6,
    plays: 659472,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "binding-of-isaac",
    title: "Binding Of Isaac",
    description: "isaac",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/binding-of-isaac",
    embed: "ruffle:https://archive.org/cors/binding-of-isaac/Binding of Isaac.swf",
    rating: 4.2,
    plays: 377705,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-flaky-s-baseball-smoochie",
    title: "Happy Tree Friends - Flaky's Baseball Smoochie",
    description: "Be sure to wear protective gear for this baseball game!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-flakys-baseball-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-flakys-baseball-smoochie_flash/htf-flakys-baseball-smoochie_flash.swf",
    rating: 4.7,
    plays: 408282,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "black-licorice-flash",
    title: "Black Licorice (Flash)",
    description: "After clicking past the title screen, a brief message appears, warning the player not to give black licorice to any of the trick-or-treaters at the...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/licorice_swf",
    embed: "ruffle:https://archive.org/cors/licorice_swf/licorice.swf",
    rating: 4.1,
    plays: 560156,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "pacman",
    title: "Pacman",
    description: "A faithful reproduction of the classic Pacman game.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/pacman_flash_202011",
    embed: "ruffle:https://archive.org/cors/pacman_flash_202011/pacman.swf",
    rating: 4.6,
    plays: 889301,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "stick-cricket",
    title: "Stick Cricket",
    description: "Stick Cricket, with it's engaging crowd noises and simple but satisfying four-directional control, found itself updated dozens of times across plen...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/stickcricket_flash",
    embed: "ruffle:https://archive.org/cors/stickcricket_flash/stick-cricket.swf",
    rating: 4.7,
    plays: 556946,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-petunia-s-summer-smoochie",
    title: "Happy Tree Friends - Petunia's Summer Smoochie",
    description: "Petunia dips her toe in the water and gets more than she expects.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-petunias-summer-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-petunias-summer-smoochie_flash/htf-petunias-summer-smoochie_flash.swf",
    rating: 4.3,
    plays: 752470,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "helicopter-game",
    title: "Helicopter Game",
    description: "An infinitely progressing corridor, a helicopter that's heavily affected by the rules of gravity, and quickly approaching walls is all that's neede...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/helicoptergame_flash",
    embed: "ruffle:https://archive.org/cors/helicoptergame_flash/helicoptergame.swf",
    rating: 4.6,
    plays: 276055,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "portal-the-flash-version",
    title: "Portal: The Flash Version",
    description: "From https://portal.wecreatestuff.com/ : Based on Valve's Portal , Portal: The Flash Version brings it all up in 2d! Portal: The Flash Version incl...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/portal_flash_version",
    embed: "ruffle:https://archive.org/cors/portal_flash_version/Portal_wcs2.swf",
    rating: 4.7,
    plays: 94569,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-cub-s-christmas-smoochie",
    title: "Happy Tree Friends - Cub's Christmas Smoochie",
    description: "Cub discovers that there’s no time like the “present” to get your Christmas gift!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-cubs-christmas-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-cubs-christmas-smoochie_flash/htf-cubs-christmas-smoochie_flash.swf",
    rating: 4.5,
    plays: 843132,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "plumber-2",
    title: "Plumber 2",
    description: "A flash animation from a compilation of 1,100 Flash Animations. Create a continuous pipeline between the tap and the overflow pipe.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/1100_plumber_2",
    embed: "ruffle:https://archive.org/cors/1100_plumber_2/plumber_2.swf",
    rating: 4.2,
    plays: 54686,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-pop-s-bbq-smoochie",
    title: "Happy Tree Friends - Pop's BBQ Smoochie",
    description: "What NOT to do at your next summer BBQ!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-pops-bbq-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-pops-bbq-smoochie_flash/htf-pops-bbq-smoochie_flash.swf",
    rating: 4.4,
    plays: 575389,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "my-new-room",
    title: "My New Room",
    description: "Decorate your room with items you like best. Pick colors for your furniture and wallpaper and don't forget to pick a pet! My New Room is a Room Mak...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/my-new-room",
    embed: "ruffle:https://archive.org/cors/my-new-room/my_new_room_girlsgogames_com_v1_01.swf",
    rating: 4.5,
    plays: 90065,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "hoops-yoyo-i-love-you",
    title: "Hoops & Yoyo: I Love You",
    description: "An E-Card from the H&Y Website.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/iloveyou_swf",
    embed: "ruffle:https://archive.org/cors/iloveyou_swf/iloveyou.swf",
    rating: 4.3,
    plays: 753143,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "pac-xon-flash",
    title: "Pac-Xon (Flash)",
    description: "The world of flash games sure is big, is kinda like a maze where one travels and looks for the treasure chest, sometimes it is a very well designed...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/pacxon_swf",
    embed: "ruffle:https://archive.org/cors/pacxon_swf/pacxon.swf",
    rating: 4.3,
    plays: 874210,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "speak-spell-online",
    title: "Speak & Spell Online",
    description: "== Original Description from https://www.speaknspell.co.uk/ == Welcome to Speak & Spell Online About the emulator This emulator began in 2002, as a...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/speaknspell",
    embed: "ruffle:https://archive.org/cors/speaknspell/speaknspell.swf",
    rating: 4.5,
    plays: 740622,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "fire-escape",
    title: "Fire Escape",
    description: "It’s a five-alarm fire and there’s nobody but Flaky to help the trapped victims get out of the burning building safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf_fireescape",
    embed: "ruffle:https://archive.org/cors/htf_fireescape/htf_fireescape.swf",
    rating: 4.4,
    plays: 93820,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "mario-combat",
    title: "Mario Combat",
    description: "You're Super Mario! What does that mean? It means you gotta go kick Bowser's ass! And thats exactly what your going to do! Here's a fun little shor...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_Mario_Combat",
    embed: "ruffle:https://archive.org/cors/flash_Mario_Combat/Mario_Combat.swf",
    rating: 4.1,
    plays: 97596,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "mud-and-blood-2",
    title: "Mud and Blood 2",
    description: "War is hell, and Mud & Blood is not afraid to show it. You're given a plethora of options and an overwhelming enemy to take out the advancing Germa...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/mudandblood2_flash",
    embed: "ruffle:https://archive.org/cors/mudandblood2_flash/mudandblood2.swf",
    rating: 4.1,
    plays: 56508,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "oswald-ice-cone-game",
    title: "Oswald: Ice Cone Game",
    description: "The snow cone machine is acting crazy, and it's spitting out flavor balls. Help Oswald catch the flavor ball of what he and his friends want.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/oswald_icecone",
    embed: "ruffle:https://archive.org/cors/oswald_icecone/iceconegame.swf",
    rating: 4.5,
    plays: 99007,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-sniffles-science-smoochie",
    title: "Happy Tree Friends - Sniffles' Science Smoochie",
    description: "Rockets and magnet and crazy concoctions, these are a few of Sniffles' favorite things.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-sniffles-science-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-sniffles-science-smoochie_flash/htf-sniffles-science-smoochie_flash.swf",
    rating: 4.5,
    plays: 666018,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },

  {
    slug: "talking-tom-cat-2-flash-version",
    title: "Talking Tom Cat 2 (Flash Version)",
    description: "i never saw someone upload this so",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/talking-tom-cat-2-flash",
    embed: "ruffle:https://archive.org/cors/talking-tom-cat-2-flash/talking_tom_cat_2_in_flash___by_adreamyhead0_d4x9xp2.swf",
    rating: 4.4,
    plays: 610249,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "unfair-mario",
    title: "unfair_mario",
    description: "Unfair Mario is a platform game inspired by Mario and Trap Adventure 2. Can you complete the level without triggering the hidden traps?",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/unfair_mario",
    embed: "ruffle:https://archive.org/cors/unfair_mario/unfair_mario.swf",
    rating: 4.1,
    plays: 40931,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "happy-tree-friends-mime-s-olympic-smoochie",
    title: "Happy Tree Friends - Mime's Olympic Smoochie",
    description: "The Olympic Games are going to be a killer!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/htf-mimes-olympic-smoochie_flash",
    embed: "ruffle:https://archive.org/cors/htf-mimes-olympic-smoochie_flash/htf-mimes-olympic-smoochie_flash.swf",
    rating: 4.2,
    plays: 713408,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "pacman-advanced",
    title: "Pacman Advanced",
    description: "Another Flash Pac-Man clone. In this game, you have to eat all the food in the maze while avoiding the ghosts. Eat the red food to make the ghosts ...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/pacmanx-advanced_flash",
    embed: "ruffle:https://archive.org/cors/pacmanx-advanced_flash/PacmanxAdvanced.swf",
    rating: 4,
    plays: 257161,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "caramelldansen-hd-remake",
    title: "Caramelldansen (HD Remake)",
    description: "From KnowYourMeme: Caramelldansen (eng. The Caramel Dance) is a series of animated dance videos that use the dance track with the same title. Its o...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_Caramelldansen",
    embed: "ruffle:https://archive.org/cors/flash_Caramelldansen/flash_Caramelldansen.swf",
    rating: 4.8,
    plays: 106556,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "breaking-the-bank",
    title: "Breaking The Bank",
    description: "Breaking the Bank is the first game in the Henry Stickmin series. It was created after Puffballs United's first game, Crossing the Pit. It is the p...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_breaking_the_bank",
    embed: "ruffle:https://archive.org/cors/flash_breaking_the_bank/breaking_the_bank.swf",
    rating: 4.8,
    plays: 902544,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-right-mix",
    title: "The Right Mix",
    description: "A fun flash game about making different alcoholic drink mixes!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_therightmix",
    embed: "ruffle:https://archive.org/cors/flash_therightmix/flash_therightmix.swf",
    rating: 4.7,
    plays: 476261,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "spongebob-patty-panic",
    title: "SpongeBob: Patty Panic",
    description: "SpongeBob must go around several platforms and stomp Krabby Patty ingredients into trays at the bottom of the screen. Avoid Plankton and other unna...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/panic_swf",
    embed: "ruffle:https://archive.org/cors/panic_swf/panic.swf",
    rating: 4.8,
    plays: 150322,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "the-impossible-quiz-book-chapter-1",
    title: "The Impossible Quiz Book: Chapter 1",
    description: "The Impossible Quiz is back, and this time it's in book form! Well, it's seperated into 3 themed Chapters, each of which contains 50 questions to m...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/flash_theimpossiblequizbook",
    embed: "ruffle:https://archive.org/cors/flash_theimpossiblequizbook/theimpossiblequizbook.swf",
    rating: 4.4,
    plays: 129324,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "uzinagaz-watch-out-behind-hunter-girl-ver",
    title: "[ UZINAGAZ]watch Out Behind Hunter Girl Ver",
    description: "flash game",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/uzinagazwatch-out-behind-hunter-girl-ver",
    embed: "ruffle:https://archive.org/cors/uzinagazwatch-out-behind-hunter-girl-ver/[UZINAGAZ]watch-out-behind-hunter-girl-ver.swf",
    rating: 4.4,
    plays: 60930,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "swords-and-sandals-gladiator-v-1-1-0",
    title: "Swords and Sandals: Gladiator (v 1.1.0)",
    description: "123",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/swords-and-sandals-v-1.1.0",
    embed: "ruffle:https://archive.org/cors/swords-and-sandals-v-1.1.0/Swords and Sandals (v 1.1.0).swf",
    rating: 4.6,
    plays: 386326,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "bang-boom-splat",
    title: "Bang, Boom, Splat!",
    description: "Cheats: Code Effect ------------------------------------ Type in go - all levels Type in go2 - new levels Type in bang - all weapons Type in ammo l...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/bang-boom-splat-swf",
    embed: "ruffle:https://archive.org/cors/bang-boom-splat-swf/Bang, Boom, Splat!.swf",
    rating: 4.4,
    plays: 304626,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "whack-your-boss-19-ways",
    title: "Whack Your Boss (19 ways)",
    description: "Not sure about office etiquette? Here's a few graphic lessons in bad office behavior. Please, don't do any of these things in real life. Because th...",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/dont_whack_your_boss",
    embed: "ruffle:https://archive.org/cors/dont_whack_your_boss/dont_whack_your_boss.swf",
    rating: 4.2,
    plays: 404846,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "age-of-war-1",
    title: "Age of War",
    description: "Evolve your civilization from cavemen to the future and destroy the enemy base in this strategy classic.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/age-of-war-3",
    embed: "ruffle:https://archive.org/cors/age-of-war-3/Age_Of_War_3.swf",
    rating: 4.6,
    plays: 7300000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-1",
    title: "Wheely 1",
    description: "Help Wheely the little red car on his adventure in part 1 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely.swf",
    rating: 4.585661659702689,
    plays: 5610067,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-2",
    title: "Wheely 2",
    description: "Help Wheely the little red car on his adventure in part 2 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely2.swf",
    rating: 4.718699837837268,
    plays: 4202143,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-3",
    title: "Wheely 3",
    description: "Help Wheely the little red car on his adventure in part 3 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely3.swf",
    rating: 4.613509140149984,
    plays: 4873702,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-4",
    title: "Wheely 4",
    description: "Help Wheely the little red car on his adventure in part 4 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely4.swf",
    rating: 4.703499643826248,
    plays: 6370633,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-5",
    title: "Wheely 5",
    description: "Help Wheely the little red car on his adventure in part 5 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely5.swf",
    rating: 4.630269554004876,
    plays: 4032242,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-6",
    title: "Wheely 6",
    description: "Help Wheely the little red car on his adventure in part 6 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely6.swf",
    rating: 4.772008899837837,
    plays: 6218726,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-7",
    title: "Wheely 7",
    description: "Help Wheely the little red car on his adventure in part 7 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely7.swf",
    rating: 4.637642938269133,
    plays: 6175637,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "wheely-8",
    title: "Wheely 8",
    description: "Help Wheely the little red car on his adventure in part 8 of this classic puzzle series.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-games_202205",
    embed: "ruffle:https://archive.org/cors/wheely-games_202205/Wheely8.swf",
    rating: 4.421017086633095,
    plays: 6524145,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "car"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-1",
    title: "Snail Bob",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob.swf",
    rating: 4.513980573814082,
    plays: 4066539,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-2",
    title: "Snail Bob 2",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-2.swf",
    rating: 4.882607308342686,
    plays: 5755963,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-3",
    title: "Snail Bob 3",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-3.swf",
    rating: 4.5435627748557055,
    plays: 6345445,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-4",
    title: "Snail Bob 4: Space",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-space.swf",
    rating: 4.713702111988647,
    plays: 7917829,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-5",
    title: "Snail Bob 5: Love Story",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-5-love-story.swf",
    rating: 4.802741651392825,
    plays: 3142367,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-6",
    title: "Snail Bob 6: Winter Story",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-6-winter-story.swf",
    rating: 4.837032273482341,
    plays: 4837425,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-7",
    title: "Snail Bob 7: Fantasy Story",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-7-fantasy-story.swf",
    rating: 4.615822688483525,
    plays: 6838679,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-8",
    title: "Snail Bob 8: Island Story",
    description: "Guide Snail Bob through dangerous puzzles and obstacles to reach the exit safely.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-collection",
    embed: "ruffle:https://archive.org/cors/snail-bob-collection/snail-bob-8-island-story.swf",
    rating: 4.69456694525239,
    plays: 4911356,
    tags: [
      "flash",
      "puzzle",
      "classic",
      "logic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "gunball-reloaded",
    title: "Gunball Reloaded",
    description: "The upgraded version of the action-packed shooter. Battle enemies and upgrade your gunball!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/gunball-reloaded",
    embed: "ruffle:https://archive.org/cors/gunball-reloaded/gunball-reloaded.swf",
    rating: 4.6,
    plays: 1500000,
    tags: [
      "flash",
      "action",
      "shooter"
    ],
    source: "Internet Archive"
  },
  {
    slug: "btd1",
    title: "Bloons Tower Defense",
    description: "Play Bloons Tower Defense classic Flash game.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/btd1_flashgame",
    embed: "ruffle:https://archive.org/cors/btd1_flashgame/BTD1.swf",
    rating: 4.8,
    plays: 5000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "fancy-pants-2",
    title: "Fancy Pants 2",
    description: "Play Fancy Pants 2 classic Flash game.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/fancypantsworld2",
    embed: "ruffle:https://archive.org/cors/fancypantsworld2/FancyPantsWorld2.swf",
    rating: 4.8,
    plays: 5000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "electric-man-2",
    title: "Electric Man 2",
    description: "Play Electric Man 2 classic Flash game.",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/electric-man-2-hs_flash",
    embed: "ruffle:https://archive.org/cors/electric-man-2-hs_flash/ElectricMan2HS.swf",
    rating: 4.8,
    plays: 5000000,
    tags: [
      "flash",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-pizzeria",
    title: "Papa's Pizzeria",
    description: "Manage your own restaurant in Papa's Pizzeria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-pizzeria_flash",
    embed: "ruffle:https://archive.org/cors/papas-pizzeria_flash/papas-pizzeria_flash.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-burgeria",
    title: "Papa's Burgeria",
    description: "Manage your own restaurant in Papa's Burgeria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/PapasBurgeriav1.0.3",
    embed: "ruffle:https://archive.org/cors/PapasBurgeriav1.0.3/PapasBurgeriav1.0.3.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-hot-doggeria",
    title: "Papa's Hot Doggeria",
    description: "Manage your own restaurant in Papa's Hot Doggeria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-hot-doggeria-game",
    embed: "ruffle:https://archive.org/cors/papas-hot-doggeria-game/papashotdoggeria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-pastaria",
    title: "Papa's Pastaria",
    description: "Manage your own restaurant in Papa's Pastaria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-pastaria-game",
    embed: "ruffle:https://archive.org/cors/papas-pastaria-game/papaspastaria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-donuteria",
    title: "Papa's Donuteria",
    description: "Manage your own restaurant in Papa's Donuteria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-donuteria-game",
    embed: "ruffle:https://archive.org/cors/papas-donuteria-game/papasdonuteria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-cheeseria",
    title: "Papa's Cheeseria",
    description: "Manage your own restaurant in Papa's Cheeseria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-cheeseria-game",
    embed: "ruffle:https://archive.org/cors/papas-cheeseria-game/papascheeseria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-bakeria",
    title: "Papa's Bakeria",
    description: "Manage your own restaurant in Papa's Bakeria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-bakeria-game",
    embed: "ruffle:https://archive.org/cors/papas-bakeria-game/papasbakeria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "papas-sushiria",
    title: "Papa's Sushiria",
    description: "Manage your own restaurant in Papa's Sushiria. Cook, serve, and keep your customers happy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/papas-sushiria-game",
    embed: "ruffle:https://archive.org/cors/papas-sushiria-game/papassushiria_v1.swf",
    rating: 4.7,
    plays: 5000000,
    tags: [
      "flash",
      "cooking",
      "management",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "sushi-cat",
    title: "Sushi Cat",
    description: "Feed the blue cat as much sushi as possible to help him reach his true love!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/sushi-cat-flash-game-series",
    embed: "ruffle:https://archive.org/cors/sushi-cat-flash-game-series/sushi-cat.swf",
    rating: 4.8,
    plays: 2500000,
    tags: [
      "flash",
      "physics",
      "puzzle",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "sushi-cat-honeymoon",
    title: "Sushi Cat: Honeymoon",
    description: "Feed the blue cat as much sushi as possible to help him reach his true love!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/sushi-cat-flash-game-series",
    embed: "ruffle:https://archive.org/cors/sushi-cat-flash-game-series/sushicatthehoneymoon.swf",
    rating: 4.8,
    plays: 2500000,
    tags: [
      "flash",
      "physics",
      "puzzle",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "sushi-cat-2",
    title: "Sushi Cat 2",
    description: "Feed the blue cat as much sushi as possible to help him reach his true love!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/sushi-cat-flash-game-series",
    embed: "ruffle:https://archive.org/cors/sushi-cat-flash-game-series/sushicat2ag.swf",
    rating: 4.8,
    plays: 2500000,
    tags: [
      "flash",
      "physics",
      "puzzle",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "sushi-cat-2-purrade",
    title: "Sushi Cat 2: The Great Purrade",
    description: "Feed the blue cat as much sushi as possible to help him reach his true love!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/sushi-cat-flash-game-series",
    embed: "ruffle:https://archive.org/cors/sushi-cat-flash-game-series/sushicat2thegreatpurrade.swf",
    rating: 4.8,
    plays: 2500000,
    tags: [
      "flash",
      "physics",
      "puzzle",
      "classic"
    ],
    source: "Internet Archive"
  },
  {
    slug: "age-of-war-2",
    title: "Age of War 2",
    description: "Battle through the ages in this classic strategy game. Upgrade your base and destroy the enemy!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/age-of-war-2-flash-game",
    embed: "ruffle:https://archive.org/cors/age-of-war-2-flash-game/ageofwar2.swf",
    rating: 4.9,
    plays: 8000000,
    tags: ["flash", "strategy", "classic", "war"],
    source: "Internet Archive"
  },
  {
    slug: "wheely-1",
    title: "Wheely 1",
    description: "Help the little red car Wheely on his first big adventure!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-flash-game-series",
    embed: "ruffle:https://archive.org/cors/wheely-flash-game-series/wheely1.swf",
    rating: 4.5,
    plays: 1200000,
    tags: ["flash", "puzzle", "casual", "wheely"],
    source: "Internet Archive"
  },
  {
    slug: "wheely-2",
    title: "Wheely 2",
    description: "Help Wheely find his love in this sequel!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/wheely-flash-game-series",
    embed: "ruffle:https://archive.org/cors/wheely-flash-game-series/wheely2.swf",
    rating: 4.5,
    plays: 1100000,
    tags: ["flash", "puzzle", "casual", "wheely"],
    source: "Internet Archive"
  },
  {
    slug: "snail-bob-1",
    title: "Snail Bob 1",
    description: "Help Snail Bob find a new home in this physics-based puzzle adventure!",
    category: "Flash",
    thumbnail: "https://archive.org/services/img/snail-bob-flash-game-series",
    embed: "ruffle:https://archive.org/cors/snail-bob-flash-game-series/snailbob1.swf",
    rating: 4.6,
    plays: 2000000,
    tags: ["flash", "puzzle", "physics", "snail-bob"],
    source: "Internet Archive"
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
  const lowerSlug = slug.toLowerCase();
  return GAMES.find((g) => g.slug.toLowerCase() === lowerSlug);
}

export function getRelatedGames(game: Game, count = 4): Game[] {
  return GAMES.filter((g) => g.slug !== game.slug && g.category === game.category)
    .slice(0, count)
    .concat(GAMES.filter((g) => g.slug !== game.slug && g.category !== game.category))
    .slice(0, count);
}

