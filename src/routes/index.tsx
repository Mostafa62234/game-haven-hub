import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { AdSlot } from "@/components/ad-slot";
import { CATEGORIES } from "@/lib/games";

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

import { useGames } from "@/components/games-provider";

function HomePage() {
  const { games } = useGames();
  
  const featured = games.slice(0, 8);
  const trending = games.slice(2, 6);
  const flashLegends = games.filter((g) => g.category === "Flash").slice(0, 8);


  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero px-6 py-14 md:px-12 md:py-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <h1 className="text-balance text-[2rem] font-extrabold leading-[1.08] tracking-tight md:text-6xl md:leading-[1.05]">
            Your favorite games. <span className="text-gradient">All in one place.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground md:mt-5 md:text-lg">
            Jump into a library of free browser games — arcade hits, brain teasers,
            multiplayer classics. No downloads. No accounts.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary shadow-glow hover:opacity-95">
              <Link to="/games" search={{ category: "Flash" }}>
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
      <section className="mt-12 md:mt-16">
        <SectionHeader title="Browse categories" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/games"
              search={{ category: cat, q: undefined }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card transition-[translate,scale,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-glow active:scale-[0.98] md:p-5"
            >
              <div className="text-base font-semibold tracking-tight">{cat}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">
                {games.filter((g) => g.category === cat).length} games
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Legends */}
      <section className="mt-12 md:mt-16">
        <SectionHeader title="Flash Legends" actionLabel="See all" actionTo="/games?category=Flash" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {flashLegends.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mt-12 md:mt-16">
        <SectionHeader title="Trending now" actionLabel="See all" actionTo="/games" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trending.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>


      {/* Featured grid */}
      <section className="mt-12 md:mt-16">
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
        <Link
          to={actionTo}
          className="group flex items-center gap-1 rounded-full text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-[translate] duration-200 ease-out-expo group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
