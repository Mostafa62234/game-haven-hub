import { useEffect, useRef, useState } from "react";
import { Play, Loader2, AlertCircle, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RufflePlayerProps {
  swfUrl: string;
  thumbnail?: string;
  title?: string;
}

export function RufflePlayer({ swfUrl, thumbnail, title }: RufflePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const blobUrlRef = useRef<string | null>(null);

  const loadRuffleScript = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.RufflePlayer) {
        return resolve(windowAny.RufflePlayer);
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/@ruffle-rs/ruffle";
      script.async = true;
      script.onload = () => resolve(windowAny.RufflePlayer);
      script.onerror = () => reject(new Error("Failed to load Ruffle emulator."));
      document.head.appendChild(script);
    });
  };

  const fetchSwfWithProgress = async (url: string): Promise<string> => {
    const cacheName = "playverse-game-cache-v1";
    
    // 1. Try Cache API for instant load
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        console.log(`[Cache Hit] Loading ${url} from disk`);
        setDownloadProgress(100);
        setLoadingStatus("Launching from local cache (Instant)...");
        const blob = await cachedResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        return blobUrl;
      }
    } catch (e) {
      console.warn("Cache check failed:", e);
    }

    // Attempt to request persistent storage (optional but helpful)
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }

    // 2. Not in cache, download with manual progress bar
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";

      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setDownloadProgress(percent);
          setLoadingStatus(`Downloading game data... ${percent}%`);
        } else {
          setLoadingStatus("Downloading game data...");
        }
      };

      xhr.onload = async () => {
        if (xhr.status === 200) {
          const blob = xhr.response;
          
          // Save to permanent cache for next time
          try {
            const cache = await caches.open(cacheName);
            await cache.put(url, new Response(blob));
          } catch (e) {
            console.warn("Failed to save to cache:", e);
          }

          const blobUrl = URL.createObjectURL(blob);
          blobUrlRef.current = blobUrl;
          resolve(blobUrl);
        } else {
          reject(new Error(`Failed to download (HTTP ${xhr.status})`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during download."));
      xhr.send();
    });
  };




  const handlePlay = async () => {
    setIsPlaying(true);
    setIsLoading(true);
    setDownloadProgress(0);
    setError(null);
    setLoadingStatus("Initializing emulator...");

    try {
      // Parallelize script load and SWF fetch if possible, or sequential for clarity
      const RufflePlayer = await loadRuffleScript();
      if (!RufflePlayer) throw new Error("RufflePlayer initialization failed.");

      setLoadingStatus("Streaming game data...");
      
      // Normalize Archive.org URLs to use the CORS-friendly endpoint
      let finalSwfUrl = swfUrl;
      if (finalSwfUrl.includes("archive.org/download/")) {
        finalSwfUrl = finalSwfUrl.replace("archive.org/download/", "archive.org/cors/");
      }
      
      const localSwfUrl = await fetchSwfWithProgress(finalSwfUrl);

      const container = containerRef.current;
      if (!container) return;

      setLoadingStatus("Starting engine...");
      const ruffle = RufflePlayer.newest();
      const player = ruffle.createPlayer();
      playerRef.current = player;

      player.config = {
        autoplay: "on",
        unmuteOverlay: "hidden",
        forceScale: true,
        scale: "exactFit",
        letterbox: "on",
        splashScreen: false,
        quality: "low", 
        preferredRenderer: "webgpu", 
        wmode: "direct",
        allowScriptAccess: true,
        maxExecutionDuration: 15,
        powerPreference: "high-performance",
      };

      container.appendChild(player);
      player.style.width = "100%";
      player.style.height = "100%";

      // Start loading
      await player.load({
        url: localSwfUrl,
        allowScriptAccess: true,
      });
      
      // Hide our loading overlay once the engine takes over
      setIsLoading(false);



    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to launch game.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (playerRef.current) playerRef.current.remove();
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden rounded-xl">
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {thumbnail && (
            <>
              <img
                src={thumbnail}
                alt={title || "Game"}
                className="absolute inset-0 h-full w-full object-cover opacity-50 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}

          <div className="relative z-10 flex flex-col items-center group">
            <button
              onClick={handlePlay}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-all hover:scale-110 hover:bg-primary active:scale-95"
              aria-label={`Play ${title}`}
            >
              <Play className="ml-2 h-10 w-10 fill-current" />
            </button>
            <span className="mt-4 text-sm font-bold text-white tracking-widest drop-shadow-lg">
              CLICK TO PLAY
            </span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-8 text-center">
          <div className="mb-8 relative">
            <Loader2 className="h-16 w-16 animate-spin text-primary opacity-20" />
            <Download className="absolute inset-0 m-auto h-8 w-8 text-primary animate-bounce" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Preparing {title}</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">{loadingStatus}</p>
          
          <div className="w-full max-w-xs space-y-2">
            <Progress value={downloadProgress} className="h-2" />
            <div className="flex justify-between text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
              <span>Establishing Connection</span>
              <span>{downloadProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/95 p-6 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
          <h3 className="text-xl font-bold underline decoration-destructive/30 underline-offset-4">Initialization Error</h3>
          <p className="mt-3 text-muted-foreground text-sm max-w-sm font-medium">{error}</p>
          <button
            onClick={() => {
              setIsPlaying(false);
              setError(null);
            }}
            className="mt-8 rounded-full bg-secondary px-8 py-2.5 text-sm font-bold text-secondary-foreground transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

