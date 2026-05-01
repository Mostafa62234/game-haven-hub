import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

interface DosPlayerProps {
  bundleUrl: string;
}

// Extend Window interface for JS-DOS
declare global {
  interface Window {
    Dos: any;
    emulators: any;
  }
}

export function DosPlayer({ bundleUrl }: DosPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ci: any = null;
    let isMounted = true;

    const initDos = async () => {
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

      window.emulators.pathPrefix = "https://v8.js-dos.com/latest/emulators/";

      try {
        // JS-DOS v8 API expects options object
        ci = window.Dos(containerRef.current, {
          url: bundleUrl,
        });
      } catch (err) {
        console.error("JS-DOS Error:", err);
      }
    };

    initDos();

    return () => {
      isMounted = false;
      if (ci) {
        try {
          ci.exit();
        } catch (e) {
          console.error("Error exiting js-dos", e);
        }
      }
    };
  }, [bundleUrl]);

  return (
    <div className="relative h-full w-full bg-black overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Initializing native emulator...</p>
        </div>
      </div>
      <div ref={containerRef} className="absolute inset-0 z-10 h-full w-full" />
    </div>
  );
}
