import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Heart, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { useAuth } from "@/components/auth-provider";
import { useFavorites } from "@/hooks/use-favorites";
import { GAMES } from "@/lib/games";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Your profile — PlayVerse" }],
  }),
  component: ProfilePage,
});

interface HistoryRow {
  game_slug: string;
  played_at: string;
}

function ProfilePage() {
  const { user, loading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const [history, setHistory] = useState<HistoryRow[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("play_history")
      .select("game_slug, played_at")
      .eq("user_id", user.id)
      .order("played_at", { ascending: false })
      .limit(12)
      .then(({ data }) => setHistory(data ?? []));
  }, [user]);

  if (!user) return null;

  const favGames = GAMES.filter((g) => favorites.includes(g.slug));
  const seen = new Set<string>();
  const recent = history
    .map((h) => GAMES.find((g) => g.slug === h.game_slug))
    .filter((g): g is (typeof GAMES)[number] => !!g && !seen.has(g.slug) && (seen.add(g.slug), true))
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {user.user_metadata?.display_name ?? user.email}
          </h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
          {isAdmin && (
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
              <Shield className="h-3 w-3" /> Admin
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/admin">Admin panel</Link>
            </Button>
          )}
          <Button variant="outline" onClick={signOut} className="rounded-full">
            <LogOut className="mr-1 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Heart className="h-5 w-5 text-primary" /> Favorites
        </h2>
        {favGames.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No favorites yet.{" "}
            <Link to="/games" className="text-primary hover:underline">
              Browse the library
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {favGames.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Clock className="h-5 w-5 text-primary" /> Recently played
        </h2>
        {recent.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Your play history will appear here.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {recent.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
