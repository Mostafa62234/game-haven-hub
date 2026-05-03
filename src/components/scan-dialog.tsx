import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, Database, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { GAMES, CATEGORIES } from "@/lib/games";
import { supabase } from "@/integrations/supabase/client";

interface ScannedGame {
  identifier: string;
  title: string;
  description: string;
  thumbnail: string;
  embed: string;
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
    setIsScanning(true);
    setResults([]);
    setSelectedGame(null);
    try {
      // Get existing slugs to filter out duplicates
      const existingSlugs = new Set(GAMES.map(g => g.slug));
      try {
        const { data: adminGames } = await supabase.from("admin_games").select("slug, embed");
        if (adminGames) {
          adminGames.forEach(g => {
            existingSlugs.add(g.slug);
          });
        }
      } catch (err) {
        console.error("Failed to fetch admin games", err);
      }

      // Query IA for flash games
      const queryStr = searchTerm 
        ? `collection:(softwarelibrary_flash) AND format:(Shockwave Flash) AND title:(${searchTerm})`
        : `collection:(softwarelibrary_flash) AND format:(Shockwave Flash)`;
      const res = await fetch(`https://archive.org/advancedsearch.php?q=${encodeURIComponent(queryStr)}&fl[]=identifier,title,description&sort[]=downloads+desc&rows=20&output=json`);
      const data = await res.json();
      
      const docs = data.response?.docs || [];
      const validGames: ScannedGame[] = [];

      for (const doc of docs) {
        if (!doc.identifier || !doc.title) continue;
        
        // Generate a provisional slug
        const slug = generateSlug(doc.title);
        if (existingSlugs.has(slug)) continue;

        // Verify it has a SWF file
        try {
          const metaRes = await fetch(`https://archive.org/metadata/${doc.identifier}`);
          const meta = await metaRes.json();
          const files = meta.files || [];
          const swfFile = files.find((f: any) => f.name.toLowerCase().endsWith('.swf'));
          
          if (swfFile) {
            validGames.push({
              identifier: doc.identifier,
              title: doc.title,
              description: doc.description || "A classic flash game.",
              thumbnail: `https://archive.org/services/img/${doc.identifier}`,
              embed: `ruffle:https://archive.org/cors/${doc.identifier}/${swfFile.name}`
            });
          }
        } catch (e) {
          console.error("Error fetching metadata for", doc.identifier, e);
        }

        if (validGames.length >= 5) break; // Limit to 5 valid new games per scan to be fast
      }

      setResults(validGames);
      if (validGames.length === 0) {
        toast.info("No new games found in this scan.");
      } else {
        toast.success(`Found ${validGames.length} new games!`);
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
                <h4 className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Results</h4>
                <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {results.map(game => (
                    <div key={game.identifier} className="flex items-center justify-between p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img src={game.thumbnail} className="h-10 w-10 rounded bg-muted object-cover flex-shrink-0" />
                        <div className="truncate">
                          <div className="font-bold text-sm truncate">{game.title}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{game.identifier}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="rounded-full flex-shrink-0" onClick={() => selectGame(game)}>
                        Review
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
              <div>
                <h3 className="font-bold text-sm">{selectedGame.title}</h3>
                <p className="text-[10px] text-muted-foreground font-mono break-all line-clamp-2">{selectedGame.embed}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Game Title *</Label>
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>URL Slug *</Label>
                <Input value={editSlug} onChange={e => setEditSlug(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={editCategory}
                onChange={e => setEditCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setSelectedGame(null)}>Cancel</Button>
              <Button onClick={handleAddGame} disabled={isSaving} className="rounded-full bg-gradient-primary shadow-glow">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                Confirm & Add
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
