import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { Star, ArrowLeft, Heart, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameFrame } from "@/components/games/game-frame";
import { GameCardCompact } from "@/components/game-card-compact";
import { AdSlot } from "@/components/ad-slot";
import { getGame, getRelatedGames, type Game } from "@/lib/games";
import { coverUrl } from "@/lib/cover";
import { useGames } from "@/components/games-provider";
import { useAuth } from "@/components/auth-provider";
import { useFavorites, recordPlay } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/play/$slug")({
  loader: async ({ params }) => {
    const slug = params.slug.toLowerCase();
    
    // 1. Try database first (allows admin to override built-in games)
    const { data: dbGame } = await supabase
      .from("admin_games")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    let game: Game | undefined;

    if (dbGame && !dbGame.hidden) {
      game = {
        ...dbGame,
        rating: 4.5,
        plays: 0,
        tags: [],
      } as Game;
    } else if (dbGame?.hidden) {
      // Admin hid this game — hide it from direct deep links too.
      throw notFound();
    } else {
      // 2. Fallback to static library
      game = getGame(slug);
    }

    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.game;
    if (!g) return {};
    // og:image must be a fully-qualified URL; root-relative paths break under
    // a sub-path deployment (/game-haven-hub/).
    const ogImage =
      typeof window !== "undefined"
        ? new URL(coverUrl(g.thumbnail), window.location.origin).href
        : coverUrl(g.thumbnail);
    return {
      meta: [
        { title: `${g.title} — Play free on PlayVerse` },
        { name: "description", content: g.description?.slice(0, 155) || "" },
        { property: "og:title", content: `${g.title} — PlayVerse` },
        { property: "og:description", content: g.description?.slice(0, 155) || "" },
        { property: "og:image", content: ogImage },
        { name: "twitter:image", content: ogImage },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Game not found</h1>
      <Link to="/games" className="mt-4 inline-block text-primary hover:underline">
        ← Back to all games
      </Link>
    </div>
  ),
  component: PlayPage,
});

function PlayPage() {
  const { game } = Route.useLoaderData();
  const { games } = useGames();
  const related = getRelatedGames(game, 4, games);
  const { user } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(game.slug);

  // Record play history when game opens
  useEffect(() => {
    if (user) recordPlay(user.id, game.slug);
  }, [user, game.slug]);

  const onFavorite = async () => {
    if (!user) {
      toast.info("Sign in to save favorites");
      return;
    }
    try {
      const added = await toggle(game.slug);
      toast.success(added ? "Added to favorites" : "Removed from favorites");
    } catch (err: any) {
      toast.error(err.message || "Failed to update favorites");
    }
  };

  const share = async () => {
    try {
      await navigator.share?.({
        title: game.title,
        text: game.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 rounded-full">
          <Link to="/games">
            <ArrowLeft className="mr-1 h-4 w-4" /> All games
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <GameFrame
            key={game.slug}
            embed={game.embed}
            title={game.title}
            thumbnail={coverUrl(game.thumbnail)}
          />

          {game.embed.startsWith("jsdos:") && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200/90">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div className="text-sm">
                <p className="font-semibold text-amber-500">Native Emulator Enabled</p>
                <p className="mt-1">
                  Because this is a massive CD-ROM era game, the <strong>very first download may take 1 to 3 minutes</strong> depending on your connection. 
                  However, the game will be securely cached on your PC, meaning it will launch <strong>instantly</strong> the next time you play!
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{game.title}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="secondary" className="rounded-full">
                  {game.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {game.rating.toFixed(1)}
                </span>

              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={fav ? "default" : "secondary"}
                size="sm"
                className="rounded-full"
                onClick={onFavorite}
              >
                <Heart className={`mr-1 h-4 w-4 ${fav ? "fill-current" : ""}`} />
                {fav ? "Favorited" : "Favorite"}
              </Button>
              <Button onClick={share} variant="secondary" size="sm" className="rounded-full">
                <Share2 className="mr-1 h-4 w-4" /> Share
              </Button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-5 shadow-card">
            <h2 className="mb-2 text-lg font-semibold">About {game.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{game.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {game.tags?.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
            {game.source && (
              <p className="mt-4 text-xs text-muted-foreground">
                Source: {game.source}
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <AdSlot format="rectangle" slot="play-sidebar" />
          <div>
            <h3 className="mb-3 text-base font-semibold tracking-tight">You might also like</h3>
            <div className="space-y-2">
              {related.map((g) => (
                <GameCardCompact key={g.slug} game={g} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <AdSlot format="banner" slot="play-bottom" className="mt-10" />
    </div>
  );
}
