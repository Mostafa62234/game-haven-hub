import { useEffect, useRef, useState } from "react";
import { Loader2, Play, AlertCircle, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DosPlayerProps {
  bundleUrl: string;
  thumbnail?: string;
  title?: string;
}

// Extend Window interface for JS-DOS
declare global {
  interface Window {
    Dos: any;
    emulators: any;
  }
}

export function DosPlayer({ bundleUrl, thumbnail, title }: DosPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState<string | null>(null);
  const ciRef = useRef<any>(null);
  const blobUrlRef = useRef<string | null>(null);

  const fetchBundleWithCache = async (url: string): Promise<string> => {
    const cacheName = "playverse-game-cache-v1";
    try {
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        setDownloadProgress(100);
        setLoadingStatus("Launching from local cache (Instant)...");
        const blob = await cachedResponse.blob();
        const blobUrl = URL.createObjectURL(blob);
        blobUrlRef.current = blobUrl;
        return blobUrl;
      }
    } catch (e) {
      console.warn("Cache API not available:", e);
    }

    // 2. Not in cache, download with modern Fetch + Streaming
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);

    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength, 10) : 0;
    let loaded = 0;

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Could not initialize stream reader.");

    const chunks: Uint8Array[] = [];
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      chunks.push(value);
      loaded += value.length;
      
      if (total) {
        const percent = Math.round((loaded / total) * 100);
        setDownloadProgress(percent);
        setLoadingStatus(`Optimizing speed... ${percent}%`);
      } else {
        setLoadingStatus(`Streaming data... ${(loaded / 1024 / 1024).toFixed(1)}MB`);
      }
    }

    const blob = new Blob(chunks);
    
    // Save to permanent cache
    try {
      const cache = await caches.open(cacheName);
      await cache.put(url, new Response(blob));
    } catch (e) {
      console.warn("Failed to save to cache:", e);
    }

    const blobUrl = URL.createObjectURL(blob);
    blobUrlRef.current = blobUrl;
    return blobUrl;
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    setIsLoading(true);
    setDownloadProgress(0);
    setError(null);
    setLoadingStatus("Preparing emulator...");

    try {
      // 1. Load JS-DOS dependencies
      if (!document.querySelector('link[href*="js-dos.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://v8.js-dos.com/latest/js-dos.css";
        document.head.appendChild(link);
      }

      if (!window.Dos) {
        setLoadingStatus("Loading JS-DOS core...");
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://v8.js-dos.com/latest/js-dos.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load JS-DOS library."));
          document.head.appendChild(script);
        });
      }

      // 2. Fetch game bundle with cache
      const localBundleUrl = await fetchBundleWithCache(bundleUrl);

      if (!containerRef.current) return;

      // 3. Initialize DOS
      setLoadingStatus("Booting system...");
      const newCi = await window.Dos(containerRef.current, {
        url: localBundleUrl,
        worker: true,
        cycles: "auto",
        memsiz: 32,
      });

      ciRef.current = newCi;
    } catch (err: any) {
      console.error("JS-DOS Error:", err);
      setError(err?.message || "Failed to launch game.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (ciRef.current) {
        try { ciRef.current.exit(); } catch (e) {}
      }
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden rounded-2xl">
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {thumbnail && (
            <>
              <img
                src={thumbnail.includes('archive.org') ? `${thumbnail}?width=600` : thumbnail}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover opacity-50 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={handlePlay}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-all hover:scale-110 active:scale-95"
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
          <h3 className="text-xl font-bold">System Error</h3>
          <p className="mt-2 text-muted-foreground text-sm max-w-sm">{error}</p>
          <button
            onClick={() => { setIsPlaying(false); setError(null); }}
            className="mt-8 rounded-full bg-secondary px-8 py-2 text-sm font-bold text-secondary-foreground hover:bg-secondary/80"
          >
            Try Again
          </button>
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0 z-10 h-full w-full" />
    </div>
  );
}

