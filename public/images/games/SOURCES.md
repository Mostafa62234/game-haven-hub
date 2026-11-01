# Cover image sources

Every cover in this folder is a local file. Nothing is hotlinked at runtime.

This file records, for each cover, where it came from and what its licence
status is. It is generated from the audit data used when the covers were
collected; if you add or replace a cover by hand, update the matching row.

**Last audited:** 2026-11-01 · **Covers:** 158 (+ `placeholder.svg`)

## Licence classes

| Class | Count | Status |
|---|---:|---|
| Confirmed free licence | 5 | Safe. Public domain, CC BY 3.0 or GPL. |
| Fair use (Wikipedia non-free) | 11 | **Non-free.** Used for identification of the title only. |
| Generated (PlayVerse) | 51 | Safe. Original artwork, no third-party rights. |
| archive.org item thumbnail | 72 | **Unconfirmed.** Uploader-provided; item pages rarely state a licence. |
| Search-engine image | 19 | **Unconfirmed.** Origin site unknown. |
| Unknown | 0 | — |

### What to do about the unconfirmed ones

* **Search-engine images (19)** are the highest risk: we know the search
  query but not the site the picture came from, so neither the author nor the
  licence can be traced. Replacing these with generated covers is a one-command
  change and removes the risk entirely.
* **archive.org thumbnails (72)** are screenshots of Flash games. The
  underlying games remain the property of their authors; the Internet Archive
  item is a preservation upload, not a licence grant. These are used here as
  small identification thumbnails for free, ad-supported playback, which is the
  same basis the Archive itself relies on — but it is **not** a confirmed licence.
* **Fair use covers (11)** are the box art / logos Wikipedia hosts under a
  non-free rationale. That rationale is written for an encyclopaedia article, not
  for a game portal. They are the most defensible of the non-free set because
  they identify the exact product shown, but they should be treated as
  placeholders to be replaced if the site ever becomes commercial.

Nothing here is legal advice.

---

## Confirmed free licences (5)

| File | Game | Origin | Licence | Attribution |
|---|---|---|---|---|
| `2048.svg` | 2048 | [File:2048 logo.svg](https://commons.wikimedia.org/wiki/File:2048_logo.svg) | Public domain | Davod |
| `agar.png` | Agar.io | [File:Agar.io Logo.png](https://commons.wikimedia.org/wiki/File:Agar.io_Logo.png) | Public domain | GamerCoD986 |
| `checkers.jpg` | Checkers | [File:CheckersStandard.jpg](https://commons.wikimedia.org/wiki/File:CheckersStandard.jpg) | CC BY 3.0 ([deed](https://creativecommons.org/licenses/by/3.0)) | Jud McCranie |
| `openttd.svg` | OpenTTD | [File:Openttdlogo.svg](https://commons.wikimedia.org/wiki/File:Openttdlogo.svg) | GPL ([deed](http://www.gnu.org/licenses/gpl.html)) | OpenTTD project; traced by User:Stannered |
| `tetris.svg` | Tetris Tribute | [File:Tetris logo 2019.svg](https://commons.wikimedia.org/wiki/File:Tetris_logo_2019.svg) | Public domain | The Tetris Company |

Notes:

* `2048.svg`, `tetris.svg` and `agar.png` are public domain because they are
  simple wordmarks/logos that fall below the threshold of originality
  (`PD-textlogo`). The underlying trademarks remain with their owners.
* `checkers.jpg` is CC BY 3.0 and **requires attribution** — Jud McCranie.
  A credit line is shown in the site footer; do not remove it.
* `openttd.svg` is GPL; the OpenTTD logo is distributed under the same licence
  as the game.

---

## Fair use — non-free (11)

Box art, flyers and logos hosted on English Wikipedia under a non-free
"fair use" rationale. Kept because they identify the exact title shown. Not
licensed for redistribution.

| File | Game | Origin | Wikipedia rationale |
|---|---|---|---|
| `daggerfall.gif` | The Elder Scrolls II: Daggerfall | [File:Daggerfall Cover art.gif](https://en.wikipedia.org/wiki/File:Daggerfall_Cover_art.gif) | Fair use of copyrighted material in the context of The Elder Scrolls II: Daggerfall |
| `diablo-web.png` | Diablo (Shareware) | [File:Diablo Coverart.png](https://en.wikipedia.org/wiki/File:Diablo_Coverart.png) | Fair use of copyrighted material in the context of Diablo (video game) |
| `donkey-kong.jpg` | Donkey Kong | [File:Donkey Kong flier.jpg](https://en.wikipedia.org/wiki/File:Donkey_Kong_flier.jpg) | Non-free cover art, identification use |
| `doom.jpg` | DOOM (Browser Port) | [File:Doom cover art.jpg](https://en.wikipedia.org/wiki/File:Doom_cover_art.jpg) | Fair use of copyrighted material in the context of Doom (1993 video game) |
| `fallout-1.jpg` | Fallout (1997) | [File:Fallout.jpg](https://en.wikipedia.org/wiki/File:Fallout.jpg) | Fair use of copyrighted material in the context of Fallout (video game) |
| `lemmings.jpg` | Lemmings | [File:Lemmings-BoxScan.jpg](https://en.wikipedia.org/wiki/File:Lemmings-BoxScan.jpg) | Fair use |
| `minecraft-classic.png` | Minecraft Classic | [File:Minecraft game logo 2023.png](https://en.wikipedia.org/wiki/File:Minecraft_game_logo_2023.png) | Fair use of copyrighted material in the context of Minecraft |
| `oregon-trail.jpg` | The Oregon Trail | [File:The Oregon Trail cover.jpg](https://en.wikipedia.org/wiki/File:The_Oregon_Trail_cover.jpg) | Fair use of copyrighted material in the context of The Oregon Trail (1985 video game) |
| `pac-man-flash.png` | Pac-Man (Flash) | [File:Pac flyer.png](https://en.wikipedia.org/wiki/File:Pac_flyer.png) | Fair use of copyrighted material in the context of PAC-MAN |
| `ultima-4.jpg` | Ultima IV: Quest of the Avatar | [File:Ultima IV box.jpg](https://en.wikipedia.org/wiki/File:Ultima_IV_box.jpg) | Fair use of copyrighted material in the context of Ultima IV: Quest of the Avatar |
| `wolfenstein-3d.jpg` | Wolfenstein 3D | [File:Wolfenstein-3d.jpg](https://en.wikipedia.org/wiki/File:Wolfenstein-3d.jpg) | Fair use of copyrighted material in the context of Wolfenstein 3D |

---

## Generated by PlayVerse (51)

Original artwork produced for this project. No third-party rights.

All of them come from one template: an 800×600 SVG with a purple gradient
(`#150f2b` → `#241a4a` → `#3b1d6e`), a faint grid, a violet glow, the
`PLAYVERSE` wordmark, the game title wrapped to at most three lines, and a
category chip. Regenerate the whole set with:

```sh
node scripts/generate-branded-covers.mjs
```

| File | Game | Category |
|---|---|---|
| `age-of-war-1.svg` | Age of War | Flash |
| `age-of-war-2.svg` | Age of War 2 | Flash |
| `aplicaciones-musicales-en-flash2008-2009.svg` | aplicaciones musicales en flash2008-2009 | Flash |
| `btd1.svg` | Bloons Tower Defense | Flash |
| `chess.svg` | Chess Online | Strategy |
| `chrome-dino.svg` | Chrome Dino Game | Arcade |
| `duck-life.svg` | Duck Life | Flash |
| `electric-man-2.svg` | Electric Man 2 | Flash |
| `fancy-pants-2.svg` | Fancy Pants 2 | Flash |
| `flappy-bird.svg` | Flap Adventure | Arcade |
| `gunball-reloaded.svg` | Gunball Reloaded | Flash |
| `hextris.svg` | Hextris | Arcade |
| `memory-match.svg` | Memory Match | Casual |
| `motherload.svg` | Motherload | Flash |
| `oswald-ice-cone-game.svg` | Oswald: Ice Cone Game | Flash |
| `pacman-doodle.svg` | Pac-Man (Google Doodle) | Retro |
| `papa-s-pizzeria.svg` | Papa's Pizzeria | Flash |
| `papas-bakeria.svg` | Papa's Bakeria | Flash |
| `papas-burgeria.svg` | Papa's Burgeria | Flash |
| `papas-cheeseria.svg` | Papa's Cheeseria | Flash |
| `papas-freezeria.svg` | Papa's Freezeria | Flash |
| `papas-hot-doggeria.svg` | Papa's Hot Doggeria | Flash |
| `papas-pastaria.svg` | Papa's Pastaria | Flash |
| `papas-pizzeria.svg` | Papa's Pizzeria | Flash |
| `papas-sushiria.svg` | Papa's Sushiria | Flash |
| `pong.svg` | Pong (HTML5) | Retro |
| `riddle-school.svg` | Riddle School | Flash |
| `sandspiel.svg` | Sandspiel | Casual |
| `slow-roads.svg` | Slow Roads | Casual |
| `snail-bob-2.svg` | Snail Bob 2 | Flash |
| `snail-bob-3.svg` | Snail Bob 3 | Flash |
| `snail-bob-4.svg` | Snail Bob 4: Space | Flash |
| `snail-bob-5.svg` | Snail Bob 5: Love Story | Flash |
| `snail-bob-6.svg` | Snail Bob 6: Winter Story | Flash |
| `snail-bob-7.svg` | Snail Bob 7: Fantasy Story | Flash |
| `snail-bob-8.svg` | Snail Bob 8: Island Story | Flash |
| `stick-war.svg` | Stick War | Flash |
| `sudoku.svg` | Sudoku | Puzzle |
| `sushi-cat-2-purrade.svg` | Sushi Cat 2: The Great Purrade | Flash |
| `sushi-cat-2.svg` | Sushi Cat 2 | Flash |
| `sushi-cat-honeymoon.svg` | Sushi Cat: Honeymoon | Flash |
| `the-binding-of-isaac-wrath-of-the-lamb-flash.svg` | The Binding Of Isaac: Wrath of the Lamb (Flash) | Flash |
| `tic-tac-toe.svg` | Tic Tac Toe | Multiplayer |
| `wheely-1.svg` | Wheely 1 | Flash |
| `wheely-2.svg` | Wheely 2 | Flash |
| `wheely-3.svg` | Wheely 3 | Flash |
| `wheely-4.svg` | Wheely 4 | Flash |
| `wheely-5.svg` | Wheely 5 | Flash |
| `wheely-6.svg` | Wheely 6 | Flash |
| `wheely-7.svg` | Wheely 7 | Flash |
| `wheely-8.svg` | Wheely 8 | Flash |

`placeholder.svg` is also generated: it is the fallback shown when a cover is
missing or fails to load.

---

## archive.org item thumbnails — licence not confirmed (72)

Each file is the thumbnail of an Internet Archive preservation item, fetched
from `https://archive.org/services/img/<identifier>` and stored locally. The
item page is the best available record of provenance; **none of these items
state a redistribution licence**.

| File | Game | Archive item |
|---|---|---|
| `a-koopa-s-revenge-2.jpg` | A Koopa's Revenge 2 | [`a-koopas-revenge-2`](https://archive.org/details/a-koopas-revenge-2) |
| `alien-hominid.jpg` | Alien Hominid | [`flash_alien_hominid`](https://archive.org/details/flash_alien_hominid) |
| `bang-boom-splat.jpg` | Bang, Boom, Splat! | [`bang-boom-splat-swf`](https://archive.org/details/bang-boom-splat-swf) |
| `binding-of-isaac.jpg` | Binding Of Isaac | [`binding-of-isaac`](https://archive.org/details/binding-of-isaac) |
| `black-licorice-flash.jpg` | Black Licorice (Flash) | [`licorice_swf`](https://archive.org/details/licorice_swf) |
| `bloxorz.jpg` | Bloxorz | [`bloxors`](https://archive.org/details/bloxors) |
| `breaking-the-bank.jpg` | Breaking The Bank | [`flash_breaking_the_bank`](https://archive.org/details/flash_breaking_the_bank) |
| `bubble-shooter.jpg` | Bubble Shooter | [`bubble-shooter_swf`](https://archive.org/details/bubble-shooter_swf) |
| `cannibals-missioneries.jpg` | Cannibals & Missioneries | [`cannibals-missioneries`](https://archive.org/details/cannibals-missioneries) |
| `caramelldansen-hd-remake.jpg` | Caramelldansen (HD Remake) | [`flash_Caramelldansen`](https://archive.org/details/flash_Caramelldansen) |
| `donald-the-beanstalk.jpg` | Donald & the Beanstalk | [`beanstalk_swf`](https://archive.org/details/beanstalk_swf) |
| `drag-racer-v3-flash-game.jpg` | Drag Racer V3 - Flash Game | [`dragracerv3_202012`](https://archive.org/details/dragracerv3_202012) |
| `escaping-the-prison.jpg` | Escaping the Prison | [`etp_20200826`](https://archive.org/details/etp_20200826) |
| `fiash.jpg` | Fiash! | [`flash_fishy`](https://archive.org/details/flash_fishy) |
| `fire-escape.jpg` | Fire Escape | [`htf_fireescape`](https://archive.org/details/htf_fireescape) |
| `firey-s-candy-bar-adventure.jpg` | Firey's Candy Bar Adventure | [`candy-bar-adventure-1`](https://archive.org/details/candy-bar-adventure-1) |
| `get-to-the-top-althrough-there-is-no-top-bfdi.jpg` | Get to the Top Althrough There is No Top BFDI | [`bfdi_swf`](https://archive.org/details/bfdi_swf) |
| `happy-tree-friends-cub-s-christmas-smoochie.jpg` | Happy Tree Friends - Cub's Christmas Smoochie | [`htf-cubs-christmas-smoochie_flash`](https://archive.org/details/htf-cubs-christmas-smoochie_flash) |
| `happy-tree-friends-cuddles-pet-smoochie.jpg` | Happy Tree Friends - Cuddles' Pet Smoochie | [`htf-cuddles-pet-smoochie_flash`](https://archive.org/details/htf-cuddles-pet-smoochie_flash) |
| `happy-tree-friends-flaky-s-baseball-smoochie.jpg` | Happy Tree Friends - Flaky's Baseball Smoochie | [`htf-flakys-baseball-smoochie_flash`](https://archive.org/details/htf-flakys-baseball-smoochie_flash) |
| `happy-tree-friends-giggles-valentine-smoochie.jpg` | Happy Tree Friends - Giggles' Valentine Smoochie | [`htf-giggles-valentine-smoochie_flash`](https://archive.org/details/htf-giggles-valentine-smoochie_flash) |
| `happy-tree-friends-mime-s-olympic-smoochie.jpg` | Happy Tree Friends - Mime's Olympic Smoochie | [`htf-mimes-olympic-smoochie_flash`](https://archive.org/details/htf-mimes-olympic-smoochie_flash) |
| `happy-tree-friends-nutty-s-party-smoochie.jpg` | Happy Tree Friends - Nutty's Party Smoochie | [`htf-nuttys-party-smoochie_flash`](https://archive.org/details/htf-nuttys-party-smoochie_flash) |
| `happy-tree-friends-petunia-s-summer-smoochie.jpg` | Happy Tree Friends - Petunia's Summer Smoochie | [`htf-petunias-summer-smoochie_flash`](https://archive.org/details/htf-petunias-summer-smoochie_flash) |
| `happy-tree-friends-pop-s-bbq-smoochie.jpg` | Happy Tree Friends - Pop's BBQ Smoochie | [`htf-pops-bbq-smoochie_flash`](https://archive.org/details/htf-pops-bbq-smoochie_flash) |
| `happy-tree-friends-sniffles-science-smoochie.jpg` | Happy Tree Friends - Sniffles' Science Smoochie | [`htf-sniffles-science-smoochie_flash`](https://archive.org/details/htf-sniffles-science-smoochie_flash) |
| `happy-tree-friends-toothy-s-easter-smoochie.jpg` | Happy Tree Friends - Toothy's Easter Smoochie | [`htf-toothy-s-easter-smoochie_flash`](https://archive.org/details/htf-toothy-s-easter-smoochie_flash) |
| `helicopter-game.jpg` | Helicopter Game | [`helicoptergame_flash`](https://archive.org/details/helicoptergame_flash) |
| `homerun.jpg` | homerun | [`homerun_20201126`](https://archive.org/details/homerun_20201126) |
| `hoops-yoyo-i-love-you.jpg` | Hoops & Yoyo: I Love You | [`iloveyou_swf`](https://archive.org/details/iloveyou_swf) |
| `impossible-quiz-deluxe-newgrounds.jpg` | impossible quiz deluxe newgrounds | [`impossible-quiz-deluxe-newgrounds`](https://archive.org/details/impossible-quiz-deluxe-newgrounds) |
| `madness-project-nexus-classic.jpg` | Madness: Project Nexus Classic | [`madness-project-nexus-classic`](https://archive.org/details/madness-project-nexus-classic) |
| `mario-combat.jpg` | Mario Combat | [`flash_Mario_Combat`](https://archive.org/details/flash_Mario_Combat) |
| `minecraft-tower-defence-2.jpg` | Minecraft Tower Defence 2 | [`minecraft-tower-defence-2`](https://archive.org/details/minecraft-tower-defence-2) |
| `mud-and-blood-2.jpg` | Mud and Blood 2 | [`mudandblood2_flash`](https://archive.org/details/mudandblood2_flash) |
| `mutilate-a-doll-2.jpg` | Mutilate-a-Doll 2 | [`mutilate-a-doll-2_202011`](https://archive.org/details/mutilate-a-doll-2_202011) |
| `my-new-room.jpg` | My New Room | [`my-new-room`](https://archive.org/details/my-new-room) |
| `nick-jr-face-alphabet-game.jpg` | Nick Jr. Face - Alphabet Game | [`nick_jr__face___alphabet_game__usa__by_oldadobeflashgames01_de1bf82`](https://archive.org/details/nick_jr__face___alphabet_game__usa__by_oldadobeflashgames01_de1bf82) |
| `nick-jr-face-numbers-game.jpg` | Nick Jr. Face - Numbers Game | [`nick_jr__face___numbers_game__usa__by_oldadobeflashgames01_de1bf15`](https://archive.org/details/nick_jr__face___numbers_game__usa__by_oldadobeflashgames01_de1bf15) |
| `pac-xon-flash.jpg` | Pac-Xon (Flash) | [`pacxon_swf`](https://archive.org/details/pacxon_swf) |
| `pacman-advanced.jpg` | Pacman Advanced | [`pacmanx-advanced_flash`](https://archive.org/details/pacmanx-advanced_flash) |
| `pacman.jpg` | Pacman | [`pacman_flash_202011`](https://archive.org/details/pacman_flash_202011) |
| `papas-donuteria.jpg` | Papa's Donuteria | [`papas-donuteria-game`](https://archive.org/details/papas-donuteria-game) |
| `pico-s-school.jpg` | Pico's School | [`flash_picosschool`](https://archive.org/details/flash_picosschool) |
| `plumber-2.jpg` | Plumber 2 | [`1100_plumber_2`](https://archive.org/details/1100_plumber_2) |
| `portal-the-flash-version.jpg` | Portal: The Flash Version | [`portal_flash_version`](https://archive.org/details/portal_flash_version) |
| `reimu-s-donation-box.jpg` | Reimu's Donation Box \| 霊夢の賽銭箱 | [`saisen`](https://archive.org/details/saisen) |
| `robot-unicorn-attack.jpg` | Robot Unicorn Attack | [`robotunicornattack_flash`](https://archive.org/details/robotunicornattack_flash) |
| `snail-bob-1.jpg` | Snail Bob | [`snail-bob-collection`](https://archive.org/details/snail-bob-collection) |
| `speak-spell-online.jpg` | Speak & Spell Online | [`speaknspell`](https://archive.org/details/speaknspell) |
| `spongebob-patty-panic.jpg` | SpongeBob: Patty Panic | [`panic_swf`](https://archive.org/details/panic_swf) |
| `stick-cricket.jpg` | Stick Cricket | [`stickcricket_flash`](https://archive.org/details/stickcricket_flash) |
| `stick-rpg-complete.jpg` | Stick RPG Complete | [`stick-rpg-complete`](https://archive.org/details/stick-rpg-complete) |
| `super-mario-crossover-offline.jpg` | Super Mario Crossover Offline | [`SuperMarioCrossoverOffline`](https://archive.org/details/SuperMarioCrossoverOffline) |
| `super-mario-flash-2.jpg` | Super Mario Flash 2 | [`super-mario-flash-2`](https://archive.org/details/super-mario-flash-2) |
| `super-mario-sunshine-64.jpg` | Super Mario Sunshine 64 | [`super-mario-sunshine-64`](https://archive.org/details/super-mario-sunshine-64) |
| `super-smash-flash-2-classic-edition.jpg` | Super Smash Flash 2: Classic Edition | [`ssf2-2007_20210626`](https://archive.org/details/ssf2-2007_20210626) |
| `super-smash-flash.jpg` | Super Smash Flash | [`supersmashflash_swf`](https://archive.org/details/supersmashflash_swf) |
| `sushi-cat.jpg` | Sushi Cat | [`sushi-cat-flash-game-series`](https://archive.org/details/sushi-cat-flash-game-series) |
| `swords-and-sandals-2-v-2-1-0.jpg` | Swords And Sandals 2 (v 2.1.0) | [`swords-and-sandals-2`](https://archive.org/details/swords-and-sandals-2) |
| `swords-and-sandals-gladiator-v-1-1-0.jpg` | Swords and Sandals: Gladiator (v 1.1.0) | [`swords-and-sandals-v-1.1.0`](https://archive.org/details/swords-and-sandals-v-1.1.0) |
| `talking-tom-cat-2-flash-version.jpg` | Talking Tom Cat 2 (Flash Version) | [`talking-tom-cat-2-flash`](https://archive.org/details/talking-tom-cat-2-flash) |
| `tanks.jpg` | TANKS | [`tanks_flashgame`](https://archive.org/details/tanks_flashgame) |
| `the-big-adventure-of-owata-s-life.jpg` | The Big Adventure of Owata's Life \| 人生オワタの大冒険 | [`owata`](https://archive.org/details/owata) |
| `the-impossible-quiz-book-chapter-1.jpg` | The Impossible Quiz Book: Chapter 1 | [`flash_theimpossiblequizbook`](https://archive.org/details/flash_theimpossiblequizbook) |
| `the-last-stand-union-city.jpg` | the-last-stand-union-city | [`the-last-stand-union-city`](https://archive.org/details/the-last-stand-union-city) |
| `the-right-mix.jpg` | The Right Mix | [`flash_therightmix`](https://archive.org/details/flash_therightmix) |
| `the-urinal-game.jpg` | The Urinal Game | [`urinalgame`](https://archive.org/details/urinalgame) |
| `unfair-mario.jpg` | unfair_mario | [`unfair_mario`](https://archive.org/details/unfair_mario) |
| `uzinagaz-watch-out-behind-hunter-girl-ver.jpg` | [ UZINAGAZ]watch Out Behind Hunter Girl Ver | [`uzinagazwatch-out-behind-hunter-girl-ver`](https://archive.org/details/uzinagazwatch-out-behind-hunter-girl-ver) |
| `whack-your-boss-19-ways.jpg` | Whack Your Boss (19 ways) | [`dont_whack_your_boss`](https://archive.org/details/dont_whack_your_boss) |
| `winnie-the-pooh-s-home-run-derby-english.jpg` | Winnie the Pooh's Home Run Derby (English) | [`homerunderby_en`](https://archive.org/details/homerunderby_en) |

---

## Search-engine images — licence not confirmed (19)

Downloaded from a Bing image thumbnail endpoint. The search query is recorded
below, but the site the image originally appeared on was not captured, so
author and licence are **unknown**.

| File | Game | Search query | Downloaded from |
|---|---|---|---|
| `chaos-faction-2.jpg` | Chaos Faction 2 | `Chaos Faction 2 video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Chaos%20Faction%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `earn-to-die.jpg` | Earn to Die | `Earn to Die video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Earn%20to%20Die%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `gun-mayhem-2.jpg` | Gun Mayhem 2 | `Gun Mayhem 2 video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Gun%20Mayhem%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `gun-mayhem.jpg` | Gun Mayhem | `Gun Mayhem video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Gun%20Mayhem%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `gunblood.jpg` | Gunblood | `Gunblood video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Gunblood%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `happy-wheels.jpg` | Happy Wheels | `Happy Wheels video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Happy%20Wheels%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `learn-to-fly-2.jpg` | Learn to Fly 2 | `Learn to Fly 2 video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Learn%20to%20Fly%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `line-rider.jpg` | Line Rider | `Line Rider video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Line%20Rider%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `madness-interactive.jpg` | Madness Interactive | `Madness Interactive video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Madness%20Interactive%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `minesweeper.jpg` | Minesweeper | `Minesweeper video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Minesweeper%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `papas-cupcakeria.jpg` | Papa's Cupcakeria | `Papa's Cupcakeria video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Papa's%20Cupcakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `papas-pancakeria.jpg` | Papa's Pancakeria | `Papa's Pancakeria video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Papa's%20Pancakeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `papas-taco-mia.jpg` | Papa's Taco Mia | `Papa's Taco Mia video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Papa's%20Taco%20Mia%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `papas-wingeria.jpg` | Papa's Wingeria | `Papa's Wingeria video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Papa's%20Wingeria%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `raze.jpg` | Raze | `Raze video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Raze%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `strike-force-heroes.jpg` | Strike Force Heroes | `Strike Force Heroes video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Strike%20Force%20Heroes%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `swords-and-sandals-2.jpg` | Swords and Sandals 2 | `Swords and Sandals 2 video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Swords%20and%20Sandals%202%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `worlds-hardest-game.jpg` | World's Hardest Game | `World's Hardest Game video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=World's%20Hardest%20Game%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |
| `zombotron.jpg` | Zombotron | `Zombotron video game cover art gameplay` | [thumbnail](https://tse2.mm.bing.net/th?q=Zombotron%20video%20game%20cover%20art%20gameplay&w=400&h=400&c=7) |

---

## Reproducing this audit

The original thumbnail URL for every game was recorded in `src/lib/games.ts`
before the switch to local files (see commit `1287616`), and the collection
scripts live outside the repository. To re-audit:

1. Read the `thumbnail` field from the previous revision of `src/lib/games.ts`.
2. For archive.org entries, open the item page and check its metadata for a
   licence field.
3. For search-engine entries, run a reverse image search and record the source.
4. Update the matching row above.
