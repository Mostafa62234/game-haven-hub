import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/games";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — PlayVerse" }],
  }),
  component: AdminPage,
});

interface AdminGame {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  embed: string;
  hidden: boolean;
}

interface AdPlacement {
  slot: string;
  enabled: boolean;
}

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [games, setGames] = useState<AdminGame[]>([]);
  const [ads, setAds] = useState<AdPlacement[]>([]);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    category: "Arcade",
    thumbnail: "",
    embed: "",
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate({ to: "/" });
  }, [loading, user, isAdmin, navigate]);

  const refresh = useCallback(async () => {
    const [{ data: g }, { data: a }] = await Promise.all([
      supabase.from("admin_games").select("*").order("created_at", { ascending: false }),
      supabase.from("ad_placements").select("slot, enabled").order("slot"),
    ]);
    setGames((g as AdminGame[]) ?? []);
    setAds((a as AdPlacement[]) ?? []);
  }, []);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  const addGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("admin_games").insert(form);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Game added");
    setForm({ slug: "", title: "", category: "Arcade", thumbnail: "", embed: "" });
    refresh();
  };

  const removeGame = async (id: string) => {
    await supabase.from("admin_games").delete().eq("id", id);
    refresh();
  };

  const toggleHidden = async (g: AdminGame) => {
    await supabase.from("admin_games").update({ hidden: !g.hidden }).eq("id", g.id);
    refresh();
  };

  const toggleAd = async (slot: string, enabled: boolean) => {
    await supabase.from("ad_placements").update({ enabled }).eq("slot", slot);
    setAds((prev) => prev.map((a) => (a.slot === slot ? { ...a, enabled } : a)));
  };

  if (!isAdmin) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Admin panel</h1>
          <p className="text-sm text-muted-foreground">Manage games, categories and ad placements.</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="mb-3 text-lg font-bold">Add game</h2>
          <form onSubmit={addGame} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Slug">
                <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-game" />
              </Field>
              <Field label="Title">
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="My Game" />
              </Field>
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Thumbnail URL">
                <Input required value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="https://..." />
              </Field>
              <Field label="Embed URL" wide>
                <Input required value={form.embed} onChange={(e) => setForm({ ...form, embed: e.target.value })} placeholder="https://example.com/game" />
              </Field>
            </div>
            <Button type="submit" className="mt-4 rounded-full bg-gradient-primary shadow-glow">
              <Plus className="mr-1 h-4 w-4" /> Add game
            </Button>
          </form>

          <h2 className="mb-3 mt-8 text-lg font-bold">Games ({games.length})</h2>
          <div className="space-y-2">
            {games.length === 0 && (
              <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No admin-managed games yet. The default library is always available.
              </p>
            )}
            {games.map((g) => (
              <div key={g.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <img src={g.thumbnail} alt="" className="h-12 w-12 rounded-md object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{g.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{g.category} · {g.slug}</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Visible</span>
                  <Switch checked={!g.hidden} onCheckedChange={() => toggleHidden(g)} />
                </div>
                <Button size="icon" variant="ghost" onClick={() => removeGame(g.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </section>

        <aside>
          <h2 className="mb-3 text-lg font-bold">Ad placements</h2>
          <div className="space-y-2 rounded-2xl border border-border bg-card p-4 shadow-card">
            {ads.map((a) => (
              <div key={a.slot} className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs">{a.slot}</span>
                <Switch checked={a.enabled} onCheckedChange={(v) => toggleAd(a.slot, v)} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">Back to site</Link>
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`space-y-1.5 ${wide ? "md:col-span-2" : ""}`}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
