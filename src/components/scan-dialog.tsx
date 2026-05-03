import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, Database, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { GAMES, CATEGORIES } from "@/lib/games";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ScannedGame {
  identifier: string;
  title: string;
  description: string;
  thumbnail: string;
  embed: string;
  launchCommand?: string;
}

export function ScanDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [results, setResults] = useState<ScannedGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<ScannedGame | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Edit state
  const [editTitle, setEditTitle] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editCategory, setEditCategory] = useState("Flash");

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleScan = async () => {
    if (!searchTerm) {
      toast.error("Please enter a search term");
      return;
    }
    setIsScanning(true);
    setResults([]);
    setSelectedGame(null);
    try {
      // Get existing slugs to filter out duplicates
      const existingSlugs = new Set(GAMES.map(g => g.slug));
      try {
        const { data: adminGames } = await supabase.from("admin_games").select("slug");
        if (adminGames) {
          adminGames.forEach(g => {
            existingSlugs.add(g.slug);
          });
        }
      } catch (err) {
        console.error("Failed to fetch admin games", err);
      }

      // 1. Query Flashpoint API for metadata
      const res = await fetch(`https://db-api.unstable.life/search?title=${encodeURIComponent(searchTerm)}&limit=15`);
      if (!res.ok) throw new Error("Flashpoint API error");
      const fpGames = await res.json();
      
      const validGames: ScannedGame[] = [];

      for (const fp of fpGames) {
        if (!fp.title || !fp.id) continue;
        
        const slug = generateSlug(fp.title);
        if (existingSlugs.has(slug)) continue;

        // Flashpoint Infinity Asset Structure
        const id = fp.id;
        const prefix1 = id.slice(0, 2);
        const prefix2 = id.slice(2, 4);
        
        // Canonical Flashpoint Assets
        const logoUrl = `https://infinity.unstable.life/images/Logos/${prefix1}/${prefix2}/${id}.png`;
        const screenshotUrl = `https://infinity.unstable.life/images/Screenshots/${prefix1}/${prefix2}/${id}.png`;
        
        // Flashpoint Web Player (ooooooooo.ooo is the standard community player for Flashpoint Archive)
        const embedUrl = `https://ooooooooo.ooo/?id=${id}`;

        validGames.push({
          identifier: id,
          title: fp.title,
          description: fp.originalDescription || `A ${fp.platform} game by ${fp.developer || "unknown"}.`,
          thumbnail: logoUrl,
          embed: embedUrl,
          launchCommand: fp.launchCommand
        });

        if (validGames.length >= 10) break;
      }

      setResults(validGames);
      if (validGames.length === 0) {
        toast.info("No new games found in Flashpoint archive matching your search.");
      } else {
        toast.success(`Found ${validGames.length} games in Flashpoint Archive!`);
      }

    } catch (err: any) {
      toast.error("Scan failed: " + err.message);
    } finally {
      setIsScanning(false);
    }
  };

  const selectGame = (game: ScannedGame) => {
    setSelectedGame(game);
    setEditTitle(game.title);
    setEditSlug(generateSlug(game.title));
    setEditCategory("Flash");
  };

  const handleAddGame = async () => {
    if (!selectedGame || !editTitle || !editSlug) return;
    setIsSaving(true);
    try {
      const newGame = {
        title: editTitle,
        slug: editSlug,
        category: editCategory,
        thumbnail: selectedGame.thumbnail,
        embed: selectedGame.embed,
        description: selectedGame.description
      };
      
      const { error } = await supabase.from("admin_games").insert([newGame]);
      if (error) throw error;
      
      toast.success("Game added successfully!");
      setResults(results.filter(r => r.identifier !== selectedGame.identifier));
      setSelectedGame(null);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="hidden md:flex gap-2 rounded-full bg-gradient-primary shadow-glow text-primary-foreground hover:scale-105 transition-transform">
          <Database className="h-4 w-4" />
          <span className="font-bold tracking-widest text-[10px] uppercase">Scan Archive</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" /> 
            Scan Flashpoint Archive
          </DialogTitle>
        </DialogHeader>

        {!selectedGame ? (
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border">
              <div className="flex-1 mr-4">
                <h4 className="font-bold text-sm">Discover New Games</h4>
                <p className="text-xs text-muted-foreground mb-3">Search the Internet Archive for missing Flash games.</p>
                <Input 
                  placeholder="e.g. Sonic, Mario..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="bg-background h-9 rounded-full px-4"
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                />
              </div>
              <Button onClick={handleScan} disabled={isScanning} className="rounded-full bg-gradient-primary shadow-glow self-end mb-0.5">
                {isScanning ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                {isScanning ? "Scanning..." : "Scan"}
              </Button>
            </div>

            {results.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Results from Flashpoint</h4>
                  <span className="text-[10px] text-muted-foreground">{results.length} found</span>
                </div>
                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {results.map(game => (
                    <div key={game.identifier} className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative">
                          <img src={game.thumbnail} className="h-10 w-10 rounded bg-muted object-cover flex-shrink-0" />
                          {game.embed ? (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-card">
                              <CheckCircle2 className="h-2 w-2 text-white" />
                            </div>
                          ) : null}
                        </div>
                        <div className="truncate">
                          <div className="font-bold text-sm truncate">{game.title}</div>
                          <div className="flex gap-2 items-center">
                             <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{game.identifier.slice(0,8)}</span>
                             {game.embed ? (
                               <span className="text-[10px] text-green-500 font-medium">Playable found</span>
                             ) : (
                               <span className="text-[10px] text-amber-500 font-medium">Link needed</span>
                             )}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant={game.embed ? "secondary" : "outline"} className="rounded-full flex-shrink-0" onClick={() => selectGame(game)}>
                        {game.embed ? "Review" : "Fix & Add"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 mb-4 bg-muted/30 p-3 rounded-2xl">
              <img src={selectedGame.thumbnail} className="h-16 w-16 rounded-xl object-cover shadow-sm" />
              <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-sm truncate">{selectedGame.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{selectedGame.description}</p>
                <div className="mt-1 flex gap-2">
                   <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Flashpoint ID: {selectedGame.identifier.slice(0,13)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[11px] uppercase tracking-wider font-bold">Game Title *</Label>
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="h-9 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] uppercase tracking-wider font-bold">URL Slug *</Label>
                <Input value={editSlug} onChange={e => setEditSlug(e.target.value)} className="h-9 rounded-lg font-mono text-xs" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[11px] uppercase tracking-wider font-bold">Embed URL / IA Identifier *</Label>
                {!selectedGame.embed && (
                  <a 
                    href={`https://archive.org/search.php?query=${encodeURIComponent(selectedGame.title + " format:swf")}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] text-primary hover:underline flex items-center gap-1"
                  >
                    <Search className="h-2.5 w-2.5" /> Search IA Manually
                  </a>
                )}
              </div>
              <div className="relative">
                <Input 
                  placeholder="ruffle:https://archive.org/cors/..." 
                  value={selectedGame.embed} 
                  onChange={e => setSelectedGame({...selectedGame, embed: e.target.value})}
                  className={cn("h-9 rounded-lg text-xs font-mono pr-8", !selectedGame.embed && "border-amber-500/50 bg-amber-50/5")}
                />
                {!selectedGame.embed && <Search className="absolute right-3 top-2.5 h-4 w-4 text-amber-500/50" />}
                {selectedGame.embed && <CheckCircle2 className="absolute right-3 top-2.5 h-4 w-4 text-green-500" />}
              </div>
              <p className="text-[10px] text-muted-foreground">Format: <code>ruffle:URL_TO_SWF</code> or <code>https://...</code></p>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-wider font-bold">Category</Label>
              <select 
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={editCategory}
                onChange={e => setEditCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div className="flex justify-between pt-4 border-t mt-4">
              <Button variant="ghost" onClick={() => setSelectedGame(null)} className="rounded-full">Cancel</Button>
              <Button 
                onClick={handleAddGame} 
                disabled={isSaving || !selectedGame.embed} 
                className={cn(
                  "rounded-full shadow-glow px-6",
                  selectedGame.embed ? "bg-gradient-primary" : "bg-muted text-muted-foreground"
                )}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                Add to Hub
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
