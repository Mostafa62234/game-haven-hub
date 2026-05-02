import { useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TicTacToeGame } from "./tic-tac-toe";
import { MemoryMatchGame } from "./memory-match";
import { DosPlayer } from "./dos-player";

interface GameFrameProps {
  embed: string;
  title: string;
}

export function GameFrame({ embed, title }: GameFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
      setIsFs(true);
    } else {
      await document.exitFullscreen?.();
      setIsFs(false);
    }
  };

  const isInternal = embed.startsWith("internal:");
  const internalKey = isInternal ? embed.replace("internal:", "") : null;
  const isJsdos = embed.startsWith("jsdos:");
  const jsdosBundle = isJsdos ? embed.replace("jsdos:", "") : null;

  return (
    <div
      ref={containerRef}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card"
    >
      {isInternal ? (
        internalKey === "tic-tac-toe" ? (
          <TicTacToeGame />
        ) : internalKey === "memory-match" ? (
          <MemoryMatchGame />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Game not available.
          </div>
        )
      ) : isJsdos && jsdosBundle ? (
        <DosPlayer bundleUrl={jsdosBundle} />
      ) : (
        <iframe
          src={embed}
          title={title}
          loading="lazy"
          allow="autoplay; fullscreen; gamepad; cross-origin-isolated"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="h-full w-full border-0"
        />
      )}

      <div className="pointer-events-none absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          size="icon"
          variant="secondary"
          onClick={toggleFullscreen}
          className="pointer-events-auto rounded-full shadow-card"
          aria-label="Toggle fullscreen"
        >
          {isFs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
