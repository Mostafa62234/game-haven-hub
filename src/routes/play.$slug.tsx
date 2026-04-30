import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, Users, ArrowLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameFrame } from "@/components/games/game-frame";
import { GameCard } from "@/components/game-card";
import { AdSlot } from "@/components/ad-slot";
import { getGame, getRelatedGames } from "@/lib/games";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => {
    const game = getGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    const g = loaderData?.game;
    if (!g) return {};
    return {
      meta: [
        { title: `${g.title} — Play free on PlayVerse` },
        { name: "description", content: g.description.slice(0, 155) },
        { property: "og:title", content: `${g.title} — PlayVerse` },
        { property: "og:description", content: g.description.slice(0, 155) },
        { property: "og:image", content: g.thumbnail },
        { name: "twitter:image", content: g.thumbnail },
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
  const related = getRelatedGames(game, 4);

  const share = async () => {
    try {
      await navigator.share?.({
        title: game.title,
        text: game.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard?.writeText(window.location.href);
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
        {/* Player */}
        <div>
          <GameFrame embed={game.embed} title={game.title} />

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
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> {game.plays} plays
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="rounded-full">
                <Heart className="mr-1 h-4 w-4" /> Favorite
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
              {game.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AdSlot format="rectangle" slot="play-sidebar" />
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              You might also like
            </h3>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {related.map((g) => (
                <GameCard key={g.slug} game={g} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <AdSlot format="banner" slot="play-bottom" className="mt-10" />
    </div>
  );
}
