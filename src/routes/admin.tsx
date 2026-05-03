import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/integrations/supabase/client";
import { GAMES, CATEGORIES } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  Shield, 
  Trash2, 
  Plus, 
  Eye, 
  EyeOff, 
  Search, 
  RefreshCw,
  LayoutDashboard,
  Gamepad2,
  ExternalLink,
  LayoutGrid,
  List
} from "lucide-react";

import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [dbStatus, setDbStatus] = useState<any[]>([]);
  const [adPlacements, setAdPlacements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [gridSize, setGridSize] = useState<"sm" | "md" | "lg">("md");
  
  // Form State
  const [newGame, setNewGame] = useState({
    title: "",
    slug: "",
    category: "Arcade",
    thumbnail: "",
    embed: "",
    description: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: games } = await supabase.from("admin_games").select("*");
      const { data: ads } = await supabase.from("ad_placements").select("*");
      setDbStatus(games || []);
      setAdPlacements(ads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate({ to: "/" });
      toast.error("Access Denied");
    } else if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, authLoading, navigate]);

  const toggleGameVisibility = async (game: any, currentHidden: boolean) => {
    try {
      const { error } = await supabase
        .from("admin_games")
        .upsert({ 
          slug: game.slug, 
          title: game.title,
          category: game.category,
          embed: game.embed,
          thumbnail: game.thumbnail,
          hidden: !currentHidden 
        }, { onConflict: "slug" });
      
      if (error) throw error;
      toast.success(currentHidden ? "Game Restored" : "Game Hidden");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };


  const deleteCustomGame = async (slug: string) => {
    const isStatic = GAMES.find(g => g.slug === slug);
    const message = isStatic 
      ? "This is a built-in game. Deleting its record will RESET it to default and UNHIDE it. Continue?" 
      : "Are you sure you want to delete this custom game permanently?";

    if (!confirm(message)) return;
    try {
      const { error } = await supabase.from("admin_games").delete().eq("slug", slug);
      if (error) throw error;
      toast.success(isStatic ? "Game reset to default" : "Game deleted");
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAddGame = async () => {
    if (!newGame.title || !newGame.slug || !newGame.embed) {
      toast.error("Please fill in required fields");
      return;
    }
    try {
      const { error } = await supabase.from("admin_games").insert([newGame]);
      if (error) throw error;
      toast.success("Game added successfully!");
      setNewGame({ title: "", slug: "", category: "Arcade", thumbnail: "", embed: "", description: "" });
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggleAd = async (slot: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from("ad_placements")
        .update({ enabled: !enabled })
        .eq("slot", slot);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (authLoading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar/Header */}
      <div className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Game Haven Management</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl p-4 md:p-8">
        <Tabs defaultValue="games" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl bg-muted/50 p-1">
            <TabsTrigger value="games" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Gamepad2 className="mr-2 h-4 w-4" /> Games
            </TabsTrigger>
            <TabsTrigger value="ads" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Shield className="mr-2 h-4 w-4" /> Ad Control
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Filter library..." 
                    className="pl-9 rounded-full bg-card"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 bg-card rounded-full p-1 border">
                  <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as any)}>
                    <ToggleGroupItem value="table" aria-label="Table View" className="rounded-full h-8 px-3">
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="grid" aria-label="Grid View" className="rounded-full h-8 px-3">
                      <LayoutGrid className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  
                  {viewMode === "grid" && (
                    <>
                      <div className="w-px h-6 bg-border mx-1" />
                      <ToggleGroup type="single" value={gridSize} onValueChange={(v) => v && setGridSize(v as any)}>
                        <ToggleGroupItem value="sm" aria-label="Small" className="rounded-full h-8 px-3 text-xs font-medium">S</ToggleGroupItem>
                        <ToggleGroupItem value="md" aria-label="Medium" className="rounded-full h-8 px-3 text-xs font-medium">M</ToggleGroupItem>
                        <ToggleGroupItem value="lg" aria-label="Large" className="rounded-full h-8 px-3 text-xs font-medium">L</ToggleGroupItem>
                      </ToggleGroup>
                    </>
                  )}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-gradient-primary shadow-glow">
                    <Plus className="mr-2 h-4 w-4" /> Add Custom Game
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-3xl sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Game</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Game Title *</Label>
                        <Input placeholder="Super Mario Clone" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <Label>URL Slug *</Label>
                        <Input placeholder="super-mario" value={newGame.slug} onChange={e => setNewGame({...newGame, slug: e.target.value})} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={newGame.category}
                        onChange={e => setNewGame({...newGame, category: e.target.value})}
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>SWF/Embed URL *</Label>
                      <Input placeholder="https://example.com/game.swf" value={newGame.embed} onChange={e => setNewGame({...newGame, embed: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Thumbnail URL</Label>
                      <Input placeholder="https://example.com/image.jpg" value={newGame.thumbnail} onChange={e => setNewGame({...newGame, thumbnail: e.target.value})} />
                    </div>
                    <Button onClick={handleAddGame} className="mt-4 rounded-full bg-gradient-primary font-bold">Add to Library</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {(() => {
              const displayGames = Array.from(new Set([...GAMES.map(g => g.slug), ...dbStatus.map(g => g.slug)]))
                .map(slug => {
                  const staticGame = GAMES.find(g => g.slug === slug);
                  const dbEntry = dbStatus.find(d => d.slug === slug);
                  const isCustom = !staticGame;
                  const game = dbEntry || staticGame;

                  if (!game) return null;
                  if (searchTerm && !game.title.toLowerCase().includes(searchTerm.toLowerCase()) && !slug.includes(searchTerm.toLowerCase())) return null;
                  
                  return { slug, game, dbEntry, isCustom, isHidden: dbEntry?.hidden || false };
                })
                .filter(Boolean) as any[];

              if (viewMode === "grid") {
                const gridClasses = {
                  sm: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
                  md: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                  lg: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                }[gridSize];

                return (
                  <div className={`grid gap-4 ${gridClasses}`}>
                    {displayGames.map(({ slug, game, dbEntry, isCustom, isHidden }) => (
                      <div key={slug} className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${isHidden ? 'opacity-70' : ''}`}>
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <img src={game.thumbnail} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute top-2 left-2 flex flex-col gap-1">
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur w-fit ${isHidden ? "bg-destructive/80 text-white" : "bg-primary/80 text-white"}`}>
                              {isHidden ? "Hidden" : "Live"}
                            </span>
                            {isCustom && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest backdrop-blur bg-amber-500/80 text-white w-fit">Custom</span>}
                          </div>
                          
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-end gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full shadow-card" asChild>
                              <Link to="/play/$slug" params={{ slug: slug }}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant={isHidden ? "default" : "secondary"} size="icon" className={`h-8 w-8 rounded-full shadow-card ${isHidden ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}`} onClick={() => toggleGameVisibility(game, isHidden)}>
                              {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </Button>
                            {dbEntry && (
                              <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-card" title={isCustom ? "Delete Game" : "Reset to Default"} onClick={() => deleteCustomGame(slug)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 p-3">
                          <h3 className="font-bold leading-tight tracking-tight text-sm truncate">{game.title}</h3>
                          <div className="flex justify-between items-center">
                            <code className="text-[9px] text-muted-foreground truncate max-w-[120px]">{slug}</code>
                            <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">{game.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div className="rounded-3xl border bg-card overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/50 text-[10px] uppercase tracking-widest font-bold text-muted-foreground border-b">
                        <tr>
                          <th className="px-6 py-4">Game</th>
                          <th className="px-6 py-4">Slug</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {displayGames.map(({ slug, game, dbEntry, isCustom, isHidden }) => (
                          <tr key={slug} className={`hover:bg-muted/30 transition-colors ${isHidden ? 'opacity-70' : ''}`}>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={game.thumbnail} className="h-10 w-10 rounded-lg object-cover bg-muted" />
                                <div>
                                  <div className="font-bold flex items-center gap-2">
                                    {game.title}
                                    {isCustom && <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-amber-500">Custom</span>}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground uppercase tracking-tight">{game.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{slug}</code>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                                isHidden ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                              }`}>
                                {isHidden ? "Hidden" : "Live"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm" className="rounded-full" asChild>
                                  <Link to="/play/$slug" params={{ slug: slug }}>
                                    <ExternalLink className="h-4 w-4 text-primary" />
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="sm" className={`rounded-full ${isHidden ? 'text-destructive hover:bg-destructive/10 hover:text-destructive' : ''}`} onClick={() => toggleGameVisibility(game, isHidden)}>
                                  {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                                </Button>
                                {dbEntry && (
                                  <Button variant="ghost" size="sm" title={isCustom ? "Delete Game" : "Reset to Default"} className="rounded-full text-destructive hover:bg-destructive/10" onClick={() => deleteCustomGame(slug)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold">Global Ad Control</h3>
                    <p className="text-sm text-muted-foreground">Toggle ad slots across the entire site</p>
                  </div>
                  <Shield className="h-8 w-8 text-primary opacity-20" />
                </div>
                
                <div className="space-y-4">
                  {adPlacements.map(ad => (
                    <div key={ad.slot} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                      <div>
                        <div className="text-sm font-bold uppercase tracking-tight">{ad.slot.replace('-', ' ')}</div>
                        <div className="text-[10px] text-muted-foreground">Managed by Google AdSense</div>
                      </div>
                      <Switch 
                        checked={ad.enabled} 
                        onCheckedChange={() => toggleAd(ad.slot, ad.enabled)} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-dashed bg-muted/10 p-8 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LayoutDashboard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold">More coming soon</h3>
                <p className="text-sm text-muted-foreground mt-2">Analytics, user management, and detailed game reports are in development.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
