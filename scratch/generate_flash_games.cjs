const fs = require('fs');

const flashGames = [
  // Papa's Franchise
  { title: "Papa's Pizzeria", slug: "papas-pizzeria", desc: "Bake and serve pizzas to hungry customers.", plays: 25000000, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
  { title: "Papa's Burgeria", slug: "papas-burgeria", desc: "Grill burgers and build them high.", plays: 22000000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { title: "Papa's Freezeria", slug: "papas-freezeria", desc: "Mix up frozen treats on the island.", plays: 30000000, img: "https://images.unsplash.com/photo-1563805042-7684c8e9e5cb" },
  { title: "Papa's Taco Mia", slug: "papas-taco-mia", desc: "Build tacos for crazy customers.", plays: 18000000, img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b" },
  { title: "Papa's Cupcakeria", slug: "papas-cupcakeria", desc: "Bake and frost cupcakes.", plays: 19000000, img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd" },
  
  // Wheely Franchise
  { title: "Wheely 1", slug: "wheely-1", desc: "Help Wheely the little red car reach the exit.", plays: 12000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 2", slug: "wheely-2", desc: "Wheely goes on an adventure to find his love.", plays: 11000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 3", slug: "wheely-3", desc: "Wheely needs a new wheel for his wife.", plays: 10000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 4: Time Travel", slug: "wheely-4", desc: "Wheely accidentally travels through time.", plays: 9000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 5: Armageddon", slug: "wheely-5", desc: "Wheely has to survive the end of the world.", plays: 8000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },

  // Snail Bob
  { title: "Snail Bob", slug: "snail-bob", desc: "Guide Snail Bob to his new home.", plays: 15000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 2", slug: "snail-bob-2", desc: "Snail Bob is back to deliver a gift.", plays: 14000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 3: Egypt", slug: "snail-bob-3", desc: "Bob gets trapped in ancient Egypt.", plays: 13000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 4: Space", slug: "snail-bob-4", desc: "Bob goes to space to defeat the evil alien.", plays: 12000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },

  // Action/Shooters
  { title: "Gun Mayhem", slug: "gun-mayhem", desc: "High octane arena shooter with customizable guns.", plays: 45000000, img: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8" },
  { title: "Gun Mayhem 2", slug: "gun-mayhem-2", desc: "More guns, more maps, more mayhem.", plays: 40000000, img: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8" },
  { title: "Raze", slug: "raze", desc: "Fight aliens and robots in this futuristic arena shooter.", plays: 35000000, img: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7" },
  { title: "Raze 2", slug: "raze-2", desc: "The epic sequel to the hit sci-fi shooter.", plays: 32000000, img: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7" },
  { title: "Strike Force Heroes", slug: "strike-force-heroes", desc: "Level up 4 unique classes in this arena shooter.", plays: 50000000, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e" },
  { title: "Strike Force Heroes 2", slug: "strike-force-heroes-2", desc: "More classes and a deeper campaign.", plays: 45000000, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e" },
  { title: "Boxhead 2Play Rooms", slug: "boxhead-2play", desc: "Survive endless waves of zombies.", plays: 28000000, img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65" },
  { title: "Sift Heads World", slug: "sift-heads-world", desc: "Play as Vinnie, Kiro or Shorty in this stickman sniper game.", plays: 30000000, img: "https://images.unsplash.com/photo-1584852959828-09199321e10d" },
  { title: "Madness Interactive", slug: "madness-interactive", desc: "Classic side-scrolling madness combat.", plays: 25000000, img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a" },
  { title: "Stick War", slug: "stick-war", desc: "Command your army and conquer Inamorta.", plays: 55000000, img: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793" },
  { title: "Age of War", slug: "age-of-war", desc: "Evolve your base from the stone age to the future.", plays: 48000000, img: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c" },
  { title: "Plazma Burst 2", slug: "plazma-burst-2", desc: "A frantic sci-fi platform shooter with physics.", plays: 38000000, img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41" },

  // Puzzles / Casual
  { title: "Bloons Tower Defense 4", slug: "bloons-td-4", desc: "Pop the bloons before they reach the end.", plays: 60000000, img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74" },
  { title: "Bloons Tower Defense 5", slug: "bloons-td-5", desc: "Even more monkeys, tracks, and bloon-popping action.", plays: 75000000, img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74" },
  { title: "The Impossible Quiz", slug: "impossible-quiz", desc: "The ultimate test of lateral thinking and frustration.", plays: 40000000, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3" },
  { title: "World's Hardest Game", slug: "worlds-hardest-game", desc: "Move the red square to the green zone. It is harder than it looks.", plays: 35000000, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f" },
  { title: "Duck Life", slug: "duck-life", desc: "Train your duck to become the ultimate racer.", plays: 20000000, img: "https://images.unsplash.com/photo-1555685812-4b743e13d96e" },
  { title: "Line Rider", slug: "line-rider", desc: "Draw a track and watch Bosh ride the sled.", plays: 33000000, img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113" },
  { title: "Fancy Pants Adventure", slug: "fancy-pants", desc: "Fluid platforming with a very fancy stickman.", plays: 42000000, img: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1" },
  { title: "Learn to Fly 2", slug: "learn-to-fly-2", desc: "Penguins can fly if you strap rockets to them.", plays: 25000000, img: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6" },

  // Classics
  { title: "QWOP", slug: "qwop", desc: "Control a track runner's thighs and calves individually.", plays: 15000000, img: "https://images.unsplash.com/photo-1552674605-15c3705be3bc" },
  { title: "Earn to Die", slug: "earn-to-die", desc: "Drive your car through a zombie apocalypse.", plays: 30000000, img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e" },
  { title: "Super Smash Flash 2", slug: "ssf2", desc: "The ultimate fan-made fighting game.", plays: 65000000, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e" },
  { title: "Portal: Flash Version", slug: "portal-flash", desc: "The 2D demake of the famous puzzle game.", plays: 18000000, img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41" },
  { title: "Swords and Sandals 2", slug: "swords-and-sandals-2", desc: "Gladiator combat RPG.", plays: 22000000, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c" },
  { title: "Murloc RPG", slug: "murloc-rpg", desc: "A fan-made WoW spin-off.", plays: 10000000, img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23" },
  { title: "Electric Man 2", slug: "electric-man-2", desc: "High voltage stickman beat-em-up.", plays: 12000000, img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a" },
  { title: "Thing Thing Arena 3", slug: "thing-thing-arena-3", desc: "Brutal and fast paced shooting gallery.", plays: 14000000, img: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8" },
  { title: "Chaos Faction 2", slug: "chaos-faction-2", desc: "Insane arena brawler with wacky weapons.", plays: 16000000, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e" },
  { title: "Crush the Castle", slug: "crush-the-castle", desc: "Use a trebuchet to destroy fortresses.", plays: 24000000, img: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793" },
  { title: "Desktop Tower Defense", slug: "desktop-td", desc: "Build mazes to stop the creeps.", plays: 19000000, img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74" },
  { title: "Infectonator 2", slug: "infectonator-2", desc: "Infect the world with a zombie virus.", plays: 21000000, img: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65" },
  { title: "Zombotron", slug: "zombotron", desc: "Clear planets of mutants and zombies.", plays: 17000000, img: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7" },
  { title: "Heli Attack 3", slug: "heli-attack-3", desc: "Take down endless helicopters.", plays: 13000000, img: "https://images.unsplash.com/photo-1595590424283-b8f1784cb2c8" },
  { title: "Riddle School", slug: "riddle-school", desc: "Escape from school in this classic point and click adventure.", plays: 11000000, img: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3" },
  { title: "Motherload", slug: "motherload", desc: "Dig deep into Mars for rare minerals.", plays: 27000000, img: "https://images.unsplash.com/photo-1542360663-8f4023704c56" },
  { title: "Papa's Hot Doggeria", slug: "papas-hot-doggeria", desc: "Grill and serve hot dogs at the stadium.", plays: 20000000, img: "https://images.unsplash.com/photo-1619860860774-1e2e17343432" },
  { title: "Papa's Wingeria", slug: "papas-wingeria", desc: "Fry up chicken wings in Starlight City.", plays: 18000000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" },
  { title: "Papa's Pancakeria", slug: "papas-pancakeria", desc: "Stack pancakes and waffles for the locals.", plays: 16000000, img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93" },
  { title: "Wheely 6: Fairytale", slug: "wheely-6", desc: "Wheely enters a fantasy world.", plays: 7500000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 7: Detective", slug: "wheely-7", desc: "Help Wheely solve the mystery of the bank robbery.", plays: 8500000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Wheely 8: Aliens", slug: "wheely-8", desc: "Wheely meets extraterrestrials.", plays: 6000000, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7" },
  { title: "Snail Bob 5: Love Story", slug: "snail-bob-5", desc: "Bob travels through the jungle to find love.", plays: 11000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 6: Winter Story", slug: "snail-bob-6", desc: "A festive puzzle adventure in the snow.", plays: 10500000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 7: Fantasy Story", slug: "snail-bob-7", desc: "Bob must defeat a magical dragon.", plays: 9000000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" },
  { title: "Snail Bob 8: Island Story", slug: "snail-bob-8", desc: "Bob is stranded on a remote island.", plays: 8500000, img: "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc" }
];

let objects = flashGames.map(g => {
  return `  {
    slug: "${g.slug}",
    title: "${g.title}",
    description: "${g.desc}",
    category: "Flash",
    thumbnail: "${g.img}?w=800&q=80",
    embed: "https://www.crazygames.com/embed/${g.slug}",
    rating: ${(Math.random() * 0.8 + 4.1).toFixed(1)},
    plays: ${g.plays},
    tags: ["flash", "classic", "retro"],
    source: "CrazyGames"
  }`;
}).join(',\n');

let code = fs.readFileSync('src/lib/games.ts', 'utf8');

// Replace the ending "  }\n];"
code = code.replace(/\s*\}\s*\];/g, '\n  },\n' + objects + '\n];');

fs.writeFileSync('src/lib/games.ts', code);
console.log('Successfully injected 50+ flash games into games.ts!');
