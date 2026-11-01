#!/usr/bin/env node
/**
 * Regenerates the PlayVerse-branded cover art in `public/images/games`.
 *
 * A branded cover is used when no legally usable artwork exists for a title.
 * Only files that are already branded are rewritten, so hand-collected covers
 * (Wikimedia Commons art, archive.org screenshots, the placeholder) are never
 * touched. See `public/images/games/SOURCES.md` for the full provenance list.
 *
 *   node scripts/generate-branded-covers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COVERS = path.join(ROOT, "public/images/games");
const GAMES_TS = path.join(ROOT, "src/lib/games.ts");

/** Covers that come from a real source and must never be overwritten. */
const PROTECTED = new Set(["placeholder.svg", "tetris.svg", "2048.svg", "openttd.svg"]);

const STR = String.raw`((?:[^"\\]|\\.)*)`;

function parseGames(source) {
  const games = [];
  for (const block of source.split(/\n\s*\{\s*\n/)) {
    const slug = block.match(new RegExp(`^\\s*slug:\\s*"${STR}"`, "m"))?.[1];
    const title = block.match(new RegExp(`^\\s*title:\\s*"${STR}"`, "m"))?.[1];
    const category = block.match(new RegExp(`^\\s*category:\\s*"${STR}"`, "m"))?.[1];
    if (slug && title && category) {
      games.push({
        slug,
        title: title.replace(/\\"/g, '"'),
        category: category.replace(/\\"/g, '"'),
      });
    }
  }
  return games;
}

const xmlEscape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, maxChars) {
  const lines = [];
  let current = "";
  for (const word of text.split(/\s+/)) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function brandedCover(title, category) {
  let lines = wrap(title, 18);
  if (lines.length > 3) lines = wrap(title, 24).slice(0, 3);

  const longest = Math.max(...lines.map((line) => line.length));
  const fontSize = longest > 20 ? 44 : longest > 15 ? 52 : 62;
  const lineHeight = fontSize * 1.18;
  const startY = 292 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="400" y="${Math.round(startY + i * lineHeight)}">${xmlEscape(line)}</tspan>`,
    )
    .join("");
  const font = "Inter, Segoe UI, system-ui, sans-serif";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${xmlEscape(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#150f2b"/>
      <stop offset="0.55" stop-color="#241a4a"/>
      <stop offset="1" stop-color="#3b1d6e"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.38" r="0.62">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#a78bfa" stroke-opacity="0.10" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <rect width="800" height="600" fill="url(#glow)"/>
  <text x="400" y="72" text-anchor="middle" font-family="${font}" font-size="18" font-weight="700" letter-spacing="6" fill="#c4b5fd" fill-opacity="0.85">PLAYVERSE</text>
  <text text-anchor="middle" font-family="${font}" font-size="${fontSize}" font-weight="800" fill="#ffffff" letter-spacing="-1">${tspans}</text>
  <rect x="330" y="424" width="140" height="34" rx="17" fill="#ffffff" fill-opacity="0.12"/>
  <text x="400" y="447" text-anchor="middle" font-family="${font}" font-size="15" font-weight="600" letter-spacing="2" fill="#ddd6fe">${xmlEscape(category.toUpperCase())}</text>
</svg>
`;
}

const games = parseGames(fs.readFileSync(GAMES_TS, "utf8"));
if (!games.length) {
  console.error("No games parsed from src/lib/games.ts — aborting.");
  process.exit(1);
}

let written = 0;
for (const game of games) {
  const file = `${game.slug}.svg`;
  if (PROTECTED.has(file) || !fs.existsSync(path.join(COVERS, file))) continue;
  fs.writeFileSync(path.join(COVERS, file), brandedCover(game.title, game.category), "utf8");
  written++;
}

console.log(`Regenerated ${written} branded cover(s) in public/images/games.`);
