import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { coverUrl } from "@/lib/cover";

/** Compact thumb-left card for sidebars ("You might also like"). */
export function GameCardCompact({ game }: { game: Game }) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug: game.slug }}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-2 shadow-card transition-[background-color,border-color,scale] duration-200 ease-out-expo hover:border-primary/30 hover:bg-secondary/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
    >
      <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        <div
          aria-hidden
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-50 blur-md"
          style={{ backgroundImage: `url("${coverUrl(game.thumbnail)}")` }}
        />
        <img
          src={coverUrl(game.thumbnail)}
          alt={game.title}
          loading="lazy"
          className="relative h-full w-full object-contain transition-[scale] duration-[250ms] ease-out-expo group-hover:scale-[1.05]"
          onError={(event) => {
            const img = event.currentTarget;
            if (img.dataset.fallback === "1") return;
            img.dataset.fallback = "1";
            img.src = coverUrl();
          }}
        />
      </div>
      <div className="min-w-0 flex-1 py-0.5 pr-1">
        <h4 className="truncate text-sm font-semibold tracking-tight transition-colors group-hover:text-primary">
          {game.title}
        </h4>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {game.rating.toFixed(1)}
          </span>
          <span aria-hidden>·</span>
          {game.category}
        </p>
      </div>
    </Link>
  );
}
