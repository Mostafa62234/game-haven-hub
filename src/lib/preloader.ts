/**
 * Game Preloader Utility
 * 
 * Manages background caching of game assets to make loading instant.
 */

const CACHE_NAME = 'playverse-games-v1';

export async function preloadGame(url: string) {
  if (!url || !url.startsWith('ruffle:')) return;
  
  const swfUrl = url.replace('ruffle:', '');
  
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(swfUrl);
    
    if (!cachedResponse) {
      console.log(`[Preloader] Background caching: ${swfUrl}`);
      // Use 'idle' priority if available
      const fetchOptions = {
        priority: 'low' as any,
        headers: {
          'Range': 'bytes=0-' // Help with some servers
        }
      };
      
      const response = await fetch(swfUrl, fetchOptions);
      if (response.ok) {
        await cache.put(swfUrl, response);
        console.log(`[Preloader] Cached successfully: ${swfUrl}`);
      }
    }
  } catch (err) {
    console.warn(`[Preloader] Failed to preload: ${swfUrl}`, err);
  }
}

/**
 * Checks if a game is already in local cache
 */
export async function isGameCached(url: string): Promise<boolean> {
  if (!url || !url.startsWith('ruffle:')) return false;
  const swfUrl = url.replace('ruffle:', '');
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(swfUrl);
    return !!response;
  } catch {
    return false;
  }
}
