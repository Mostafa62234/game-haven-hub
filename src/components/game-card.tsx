import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Game } from "@/lib/games";

import { useSettings } from "./settings-provider";
import { FavoriteButton } from "./favorite-button";
import { preloadGame, isGameCached } from "@/lib/preloader";
import { coverUrl } from "@/lib/cover";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export function GameCard({ game }: { game: Game }) {
  const { dataSaver } = useSettings();
  const [cached, setCached] = useState(false);

  useEffect(() => {
    isGameCached(game.embed).then(setCached);
  }, [game.embed]);

  return (
    <div
      onMouseEnter={() => !dataSaver && preloadGame(game.embed).then(() => setCached(true))}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-[translate,scale,box-shadow] duration-[250ms] ease-out-expo hover:-translate-y-1 hover:shadow-glow active:scale-[0.98]"
    >
      <Link
        to="/play/$slug"
        params={{ slug: game.slug }}
        className="block rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {/* Blurred self-backdrop so letterboxed covers blend into the card */}
          <div
            aria-hidden
            className="absolute inset-0 scale-125 bg-cover bg-center opacity-50 blur-lg"
            style={{ backgroundImage: `url("${coverUrl(game.thumbnail)}")` }}
          />
          <img
            src={coverUrl(game.thumbnail)}
            alt={game.title}
            loading="lazy"
            className="relative h-full w-full object-contain transition-[scale] duration-[250ms] ease-out-expo group-hover:scale-[1.04]"
            onError={(event) => {
              const img = event.currentTarget;
              if (img.dataset.fallback === "1") return;
              img.dataset.fallback = "1";
              img.src = coverUrl();
            }}
          />
          <FavoriteButton
            gameSlug={game.slug}
            className="absolute right-2.5 top-2.5 z-10 scale-95 opacity-0 transition-[scale,opacity] duration-200 ease-out-expo group-hover:scale-100 group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
          />
          {cached && (
            <span className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-background">
              <Check className="h-3 w-3" /> Ready
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-4 pt-3">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight">{game.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{game.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {game.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {game.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
