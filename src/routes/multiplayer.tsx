import { createFileRoute } from "@tanstack/react-router";
import { GameCard } from "@/components/game-card";
import { AdSlot } from "@/components/ad-slot";
import { GAMES } from "@/lib/games";
import { Users, Wifi, Sparkles } from "lucide-react";
import { OnlineTicTacToe } from "@/components/games/online-tic-tac-toe";

export const Route = createFileRoute("/multiplayer")({
  head: () => ({
    meta: [
      { title: "Multiplayer Games — PlayVerse" },
      {
        name: "description",
        content:
          "Play multiplayer browser games with friends — Tic Tac Toe, UNO, chess and more. Realtime online lobbies, no install required.",
      },
    ],
  }),
  component: MultiplayerPage,
});

function MultiplayerPage() {
  const games = GAMES.filter((g) => g.category === "Multiplayer" || g.category === "Strategy");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" />
          Multiplayer
        </span>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          Play together. <span className="text-gradient">Right now.</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Quick matches with friends in your browser. Share a room link and start
          playing in seconds — no downloads, no signups.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <Feature icon={<Wifi className="h-4 w-4" />} title="Realtime" desc="Low-latency moves" />
          <Feature icon={<Users className="h-4 w-4" />} title="Lobbies" desc="Create or join a room" />
          <Feature icon={<Sparkles className="h-4 w-4" />} title="Cross-device" desc="Play on phone or desktop" />
        </div>
      </section>

      <AdSlot format="leaderboard" slot="multi-top" className="my-8" />

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">🎮 Online Tic Tac Toe</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Create a room and share the code, or join with a friend's code. Moves sync in real time.
        </p>
        <OnlineTicTacToe />
      </section>

      <h2 className="mb-4 text-2xl font-bold">More multiplayer games</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-primary">{icon}</span>
        {title}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
