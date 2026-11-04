import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search, SearchX, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
    // TanStack serializes search params to strings in links/deep links, and
    // returning a literal `false` here would serialize as ?favorites=false —
    // so anything but a true-ish value means "no favorites filter".
    favorites: s.favorites === true || s.favorites === "true" ? true : undefined,
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
  const { games, error, refresh } = useGames();
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
            type="search"
            value={q ?? ""}
            onChange={(e) =>
              navigate({
                search: (prev) => ({ ...prev, q: e.target.value || undefined }),
                replace: true,
              })
            }
            placeholder="Search games, tags..."
            className="rounded-full bg-muted/30 border-none pl-9 focus-visible:ring-primary/30"
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

      {error && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
          <span>
            Couldn&apos;t load the live game library — showing the built-in list.
          </span>
          <Button variant="secondary" size="sm" className="rounded-full" onClick={() => refresh()}>
            Retry
          </Button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/10 px-6 py-14 text-center">
          <SearchX className="h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="max-w-sm text-muted-foreground">
            {favorites && favoriteSlugsList.length === 0 
              ? "You haven't saved any games yet. Heart a game to see it here."
              : `No games match ${q ? `"${q}"` : "your filters"}.`}
          </p>
          <Button asChild variant="secondary" size="sm" className="rounded-full">
            <Link
              to="/games"
              search={{ q: undefined, category: undefined, favorites: undefined }}
            >
              Clear filters
            </Link>
          </Button>
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
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-[background-color,color,border-color,scale,box-shadow] duration-200 ease-out-expo active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
        active
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
