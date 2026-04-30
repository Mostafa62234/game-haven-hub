import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

interface AdSlotProps {
  slot?: string;
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

// Module-level cache so we hit the DB once per session.
let cache: Record<string, boolean> | null = null;
let pending: Promise<Record<string, boolean>> | null = null;

async function loadPlacements(): Promise<Record<string, boolean>> {
  if (cache) return cache;
  if (pending) return pending;
  pending = (async () => {
    const { data } = await supabase.from("ad_placements").select("slot, enabled");
    const map: Record<string, boolean> = {};
    (data ?? []).forEach((r) => {
      map[r.slot] = r.enabled;
    });
    cache = map;
    return map;
  })();
  return pending;
}

export function AdSlot({ slot, format = "banner", className, label = "Advertisement" }: AdSlotProps) {
  const hasAdsense = Boolean(ADSENSE_CLIENT);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!slot) return;
    let alive = true;
    loadPlacements().then((map) => {
      if (!alive) return;
      // Default to enabled when slot isn't tracked
      setEnabled(map[slot] !== false);
    });
    return () => {
      alive = false;
    };
  }, [slot]);

  useEffect(() => {
    if (!hasAdsense || !enabled) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [hasAdsense, enabled]);

  if (!enabled) return null;

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
