import { useEffect, useRef, useState } from "react";
import { Play, Loader2, AlertCircle } from "lucide-react";

interface RufflePlayerProps {
  swfUrl: string;
  thumbnail?: string;
  title?: string;
}

export function RufflePlayer({ swfUrl, thumbnail, title }: RufflePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);

  const loadRuffleScript = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-with-next-line @typescript-eslint/no-explicit-any
      const windowAny = window as any;
      if (windowAny.RufflePlayer) {
        return resolve(windowAny.RufflePlayer);
      }

      const script = document.createElement("script");
      script.src = "https://unpkg.com/@ruffle-rs/ruffle";
      script.async = true;
      script.onload = () => {
        resolve(windowAny.RufflePlayer);
      };
      script.onerror = () => {
        reject(new Error("Failed to load Ruffle emulator script."));
      };
      document.head.appendChild(script);
    });
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    setIsLoading(true);
    setError(null);

    try {
      const RufflePlayer = await loadRuffleScript();
      if (!RufflePlayer) throw new Error("RufflePlayer not found.");

      const container = containerRef.current;
      if (!container) return;

      const ruffle = RufflePlayer.newest();
      const player = ruffle.createPlayer();
      playerRef.current = player;

      player.config = {
        autoplay: "on",
        unmuteOverlay: "visible",
        forceScale: true,
        scale: "exactFit",
        letterbox: "off",
        splashScreen: false,
      };

      container.appendChild(player);

      // Add a slight delay for smoother UI transition
      await new Promise((r) => setTimeout(r, 200));

      player.load(swfUrl);

      // Ensure player takes full space
      player.style.width = "100%";
      player.style.height = "100%";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to initialize game.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {thumbnail && (
            <>
              <img
                src={thumbnail}
                alt={title || "Game Thumbnail"}
                className="absolute inset-0 h-full w-full object-cover opacity-50 blur-sm scale-110"
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}

          <div className="relative z-10 flex flex-col items-center group">
            <button
              onClick={handlePlay}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow transition-transform hover:scale-110 hover:bg-primary"
              aria-label={`Play ${title || 'Game'}`}
            >
              <Play className="ml-2 h-10 w-10 fill-current" />
            </button>
            <span className="mt-4 text-sm font-medium text-white/90 tracking-wide drop-shadow-md">
              CLICK TO PLAY
            </span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="mt-4 font-medium text-foreground animate-pulse">Launching Emulator...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-background/95 p-6 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
          <h3 className="text-xl font-bold">Game Failed to Load</h3>
          <p className="mt-2 text-muted-foreground max-w-sm">{error}</p>
          <button
            onClick={() => {
              setIsPlaying(false);
              setError(null);
            }}
            className="mt-6 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
