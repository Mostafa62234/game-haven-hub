import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { GameCard } from "@/components/game-card";
import { AdSlot } from "@/components/ad-slot";
import { CATEGORIES, type GameCategory } from "@/lib/games";
import { useGames } from "@/components/games-provider";
import { useAuth } from "@/components/auth-provider";
import { useFavorites } from "@/hooks/use-favorites";

interface SearchParams {
  q?: string;
  category?: GameCategory;
  favorites?: boolean;
}

export const Route = createFileRoute("/games")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" && s.q.length ? s.q : undefined,
    category:
      typeof s.category === "string" && (CATEGORIES as string[]).includes(s.category)
        ? (s.category as GameCategory)
        : undefined,
    favorites: s.favorites === true,
  }),
  head: () => ({
    meta: [
      { title: "All Games — PlayVerse" },
      {
        name: "description",
        content:
          "Browse the full PlayVerse library: arcade, puzzle, multiplayer, strategy and casual games. Filter by category or search by name.",
      },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  const { q, category, favorites } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { games } = useGames();
  const { user } = useAuth();
  const { isFavorite, favorites: favoriteSlugsList } = useFavorites();

  const filtered = useMemo(() => {
    return games.filter((g) => {
      if (favorites && !isFavorite(g.slug)) return false;
      if (category && g.category !== category) return false;
      if (q) {
        const needle = q.toLowerCase();
        return (
          g.title.toLowerCase().includes(needle) ||
          g.description.toLowerCase().includes(needle) ||
          g.tags.some((t) => t.toLowerCase().includes(needle))
        );
      }
      return true;
    });
  }, [q, category, games, favorites, isFavorite]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {favorites ? "Your Favorites" : "All games"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {filtered.length} game{filtered.length === 1 ? "" : "s"}
          {category ? ` in ${category}` : ""}
          {q ? ` matching "${q}"` : ""}
        </p>
      </header>

      {/* Search + filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:max-w-sm md:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q ?? ""}
            onChange={(e) =>
              navigate({
                search: (prev) => ({ ...prev, q: e.target.value || undefined }),
                replace: true,
              })
            }
            placeholder="Search games, tags..."
            className="rounded-full pl-9 bg-muted/30 border-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {user && (
            <FilterPill
              active={!!favorites}
              onClick={() =>
                navigate({ search: (p) => ({ ...p, favorites: favorites ? undefined : true }), replace: true })
              }
            >
              <Heart className={`mr-1.5 h-3.5 w-3.5 ${favorites ? 'fill-current' : ''}`} />
              Favorites
            </FilterPill>
          )}
          
          <FilterPill
            active={!category && !favorites}
            onClick={() =>
              navigate({ search: (p) => ({ ...p, category: undefined, favorites: undefined }), replace: true })
            }
          >
            All
          </FilterPill>
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              active={category === c}
              onClick={() =>
                navigate({ search: (p) => ({ ...p, category: c, favorites: undefined }), replace: true })
              }
            >
              {c}
            </FilterPill>
          ))}
        </div>
      </div>

      <AdSlot format="leaderboard" slot="games-top" className="mb-6" />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground bg-muted/10">
          {favorites && favoriteSlugsList.length === 0 
            ? "You haven't saved any games yet! Heart some games to see them here."
            : "No games match your search."}{" "}
          <Link
            to="/games"
            search={{ q: undefined, category: undefined, favorites: undefined }}
            className="text-primary hover:underline font-bold"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      )}

      <AdSlot format="banner" slot="games-bottom" className="mt-10" />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "border border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
