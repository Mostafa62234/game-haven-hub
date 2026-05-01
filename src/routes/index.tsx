import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { AdSlot } from "@/components/ad-slot";
import { CATEGORIES, GAMES } from "@/lib/games";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlayVerse — Free Browser Games to Play Now" },
      {
        name: "description",
        content:
          "Discover and play hundreds of free HTML5 browser games. Arcade, puzzle, multiplayer and more. No downloads, no signup required.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = GAMES.slice(0, 8);
  const trending = GAMES.slice(2, 6);
  const flashLegends = GAMES.filter((g) => g.category === "Flash").slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" />
            Over 200+ free games · Updated weekly
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your favorite games. <span className="text-gradient">All in one place.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Jump into hundreds of free browser games — arcade hits, brain teasers,
            multiplayer classics — instantly. No downloads. No accounts needed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary shadow-glow hover:opacity-95">
              <Link to="/games">
                Browse all games <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/multiplayer">Play multiplayer</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Top banner ad */}
      <div className="mt-8">
        <AdSlot format="leaderboard" slot="home-top" />
      </div>

      {/* Categories */}
      <section className="mt-12">
        <SectionHeader title="Browse categories" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/games"
              search={{ category: cat, q: undefined }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-10" />
              <div className="relative">
                <div className="text-sm text-muted-foreground">Category</div>
                <div className="mt-1 text-lg font-bold">{cat}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-14">
        <SectionHeader title="🔥 Trending now" actionLabel="See all" actionTo="/games" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trending.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* Flash Legends */}
      <section className="mt-14">
        <SectionHeader title="🔥 Flash Legends" actionLabel="See all" actionTo="/games?category=Flash" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {flashLegends.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* Featured grid */}
      <section className="mt-14">
        <SectionHeader title="Featured games" actionLabel="See all" actionTo="/games" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* Bottom banner ad */}
      <div className="my-10">
        <AdSlot format="banner" slot="home-bottom" />
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  actionLabel,
  actionTo,
}: {
  title: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="text-sm font-medium text-primary hover:underline">
          {actionLabel} →
        </Link>
      ) : null}
    </div>
  );
}
