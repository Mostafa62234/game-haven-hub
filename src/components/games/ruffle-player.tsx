import { useEffect, useRef } from "react";

interface RufflePlayerProps {
  swfUrl: string;
}

export function RufflePlayer({ swfUrl }: RufflePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The RufflePlayer script is injected in __root.tsx
    // eslint-disable-next-with-next-line @typescript-eslint/no-explicit-any
    const windowAny = window as any;
    const RufflePlayer = windowAny.RufflePlayer;

    if (!RufflePlayer) {
      console.error("RufflePlayer not found on window");
      return;
    }

    const ruffle = RufflePlayer.newest();
    const player = ruffle.createPlayer();

    player.config = {
      autoplay: "on",
      unmuteOverlay: "visible",
      forceScale: true,
      scale: "exactFit",
      letterbox: "off",
      splashScreen: false,
    };

    container.appendChild(player);
    player.load(swfUrl);

    // Style the internal Ruffle element to take full width and height
    player.style.width = "100%";
    player.style.height = "100%";

    return () => {
      // Cleanup
      player.remove();
    };
  }, [swfUrl]);

  return <div ref={containerRef} className="h-full w-full bg-black" />;
}
