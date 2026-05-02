import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Game } from "@/lib/games";
import { Badge } from "@/components/ui/badge";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug: game.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={game.thumbnail.includes('archive.org') ? `${game.thumbnail}?width=400` : game.thumbnail}
          alt={game.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-transparent" />
        <Badge className="absolute left-3 top-3 rounded-full border-0 bg-background/80 text-foreground backdrop-blur">
          {game.category}
        </Badge>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-foreground">
          <span className="flex items-center gap-1 text-amber-400">
            <Star className="h-3 w-3 fill-current" />
            {game.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold leading-tight tracking-tight">{game.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{game.description}</p>
      </div>
    </Link>
  );
}
