/** Local cover art lives in `public/images/games`. */
const PLACEHOLDER = "/images/games/placeholder.svg";

/**
 * Prefix a root-relative path with the deployment base path.
 * On GitHub Pages the app is served from `/game-haven-hub/`, so `/images/x.jpg`
 * has to become `/game-haven-hub/images/x.jpg`.
 */
export function withBase(pathname: string): string {
  const base = import.meta.env.BASE_URL || "/";
  if (!pathname.startsWith("/")) return pathname;
  return base.endsWith("/") ? `${base}${pathname.slice(1)}` : `${base}/${pathname.slice(1)}`;
}

/**
 * Resolve a game cover URL. Local covers get the base prefix, absolute remote
 * URLs (e.g. a game added through the admin panel) are left untouched, and a
 * missing cover falls back to the PlayVerse placeholder.
 */
export function coverUrl(thumbnail?: string | null): string {
  if (!thumbnail) return withBase(PLACEHOLDER);
  if (!thumbnail.startsWith("/")) return thumbnail;
  return withBase(thumbnail);
}

export { PLACEHOLDER as COVER_PLACEHOLDER };
