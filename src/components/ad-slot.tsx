import { useEffect } from "react";
import { cn } from "@/lib/utils";

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

interface AdSlotProps {
  /** AdSense data-ad-slot id (used when AdSense is configured) */
  slot?: string;
  /** Ad shape */
  format?: "banner" | "leaderboard" | "rectangle" | "interstitial";
  className?: string;
  label?: string;
}

const FORMAT_CLASSES: Record<NonNullable<AdSlotProps["format"]>, string> = {
  banner: "h-[90px] md:h-[120px]",
  leaderboard: "h-[90px]",
  rectangle: "h-[250px] w-[300px] mx-auto",
  interstitial: "h-[280px]",
};

/**
 * Renders a Google AdSense unit when VITE_ADSENSE_CLIENT is set,
 * otherwise renders a clearly-labeled placeholder so layout & UX
 * are designed around real ad dimensions from day one.
 */
export function AdSlot({ slot, format = "banner", className, label = "Advertisement" }: AdSlotProps) {
  const hasAdsense = Boolean(ADSENSE_CLIENT);

  useEffect(() => {
    if (!hasAdsense) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [hasAdsense]);

  if (hasAdsense && slot) {
    return (
      <div className={cn("w-full overflow-hidden rounded-xl", FORMAT_CLASSES[format], className)}>
        <ins
          className="adsbygoogle block h-full w-full"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      role="complementary"
      aria-label={label}
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground",
        FORMAT_CLASSES[format],
        className,
      )}
    >
      <span className="select-none">{label} · ad slot</span>
    </div>
  );
}
