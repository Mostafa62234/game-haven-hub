import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { Badge } from "@/components/ui/badge";

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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <Link
        to="/play/$slug"
        params={{ slug: game.slug }}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={coverUrl(game.thumbnail)}
            alt={game.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            onError={(event) => {
              const img = event.currentTarget;
              if (img.dataset.fallback === "1") return;
              img.dataset.fallback = "1";
              img.src = coverUrl();
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <FavoriteButton 
            gameSlug={game.slug} 
            className="absolute right-3 top-3 z-10 scale-0 transition-transform duration-300 group-hover:scale-100" 
          />
          <Badge className="absolute left-3 top-3 rounded-full border-0 bg-background/80 text-foreground backdrop-blur">
            {game.category}
          </Badge>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-foreground">
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="h-3 w-3 fill-current" />
              {game.rating.toFixed(1)}
            </span>
            {cached && (
              <span className="flex items-center gap-1 text-emerald-400 font-bold uppercase tracking-tighter text-[9px]">
                <Check className="h-3 w-3" /> Ready
              </span>
            )}
          </div>
        </div>
      </Link>


      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold leading-tight tracking-tight">{game.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{game.description}</p>
      </div>
    </div>
  );
}
