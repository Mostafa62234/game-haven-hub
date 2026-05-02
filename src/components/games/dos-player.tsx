import { useEffect, useRef, useState } from "react";
import { Loader2, Play, AlertCircle } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    if (!containerRef.current) return;

    let ci: any = null;
    let isMounted = true;

    const initDos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Load CSS
        if (!document.querySelector('link[href*="js-dos.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://v8.js-dos.com/latest/js-dos.css";
          document.head.appendChild(link);
        }

        // Load JS
        if (!window.Dos) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://v8.js-dos.com/latest/js-dos.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load js-dos"));
            document.head.appendChild(script);
          });
        }

        if (!isMounted || !containerRef.current) return;

        // window.emulators.pathPrefix = "https://v8.js-dos.com/latest/emulators/";

        const newCi = await window.Dos(containerRef.current, {
          url: bundleUrl,
        });

        if (!isMounted) {
          newCi.exit();
        } else {
          ci = newCi;
        }
      } catch (err: any) {
        console.error("JS-DOS Error:", err);
        setError(err?.message || "Failed to load game.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initDos();

    return () => {
      isMounted = false;
      if (ci) {
        try { ci.exit(); } catch (e) { console.error("Error exiting js-dos", e); }
      }
    };
  }, [isPlaying, bundleUrl]);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden rounded-2xl">
      {/* Click-to-Play overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {thumbnail && (
            <>
              <img
                src={thumbnail}
                alt={title || "Game Thumbnail"}
                className="absolute inset-0 h-full w-full object-cover opacity-50 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-transform hover:scale-110 hover:bg-primary"
              aria-label={`Play ${title || 'Game'}`}
            >
              <Play className="ml-2 h-10 w-10 fill-current" />
            </button>
            <span className="mt-4 text-sm font-medium text-white/90 tracking-wide drop-shadow-md">
              CLICK TO PLAY
            </span>
            <span className="mt-2 text-xs text-white/50 max-w-xs text-center">
              First load may take 1–3 min. Will be cached for instant future plays.
            </span>
          </div>
        </div>
      )}

      {/* Loading spinner */}
      {isPlaying && isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 font-medium text-foreground animate-pulse">Launching Emulator...</p>
          <p className="mt-2 text-xs text-muted-foreground">Downloading game bundle, please wait...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/95 p-6 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
          <h3 className="text-xl font-bold">Game Failed to Load</h3>
          <p className="mt-2 text-muted-foreground max-w-sm">{error}</p>
          <button
            onClick={() => { setIsPlaying(false); setError(null); }}
            className="mt-6 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            Try Again
          </button>
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0 z-10 h-full w-full" />
    </div>
  );
}
