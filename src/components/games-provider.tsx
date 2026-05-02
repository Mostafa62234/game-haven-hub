import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { GAMES, type Game } from "@/lib/games";
import { supabase } from "@/integrations/supabase/client";

interface GamesContextValue {
  games: Game[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const GamesContext = createContext<GamesContextValue>({
  games: GAMES,
  loading: true,
  refresh: async () => {},
});

export function GamesProvider({ children }: { children: ReactNode }) {
  const [dynamicGames, setDynamicGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_games")
        .select("*");
      
      if (error) throw error;

      // Filter out hidden games and map to Game type
      const dbGames = (data || []) as any[];
      
      // Games from DB that are NOT hidden
      const newGames = dbGames
        .filter(g => !g.hidden && !GAMES.find(sg => sg.slug === g.slug))
        .map(g => ({
          slug: g.slug,
          title: g.title,
          description: g.description || "",
          category: g.category as any,
          thumbnail: g.thumbnail,
          embed: g.embed,
          rating: 4.5,
          plays: 0,
          tags: [],
          source: "Admin"
        }));

      // Find slugs that should be hidden from the static GAMES array
      const hiddenSlugs = new Set(dbGames.filter(g => g.hidden).map(g => g.slug));
      
      const filteredStatic = GAMES.filter(g => !hiddenSlugs.has(g.slug));

      setDynamicGames([...filteredStatic, ...newGames]);
    } catch (err) {
      console.error("Failed to fetch dynamic games:", err);
      setDynamicGames(GAMES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games: dynamicGames, loading, refresh: fetchGames }}>
      {children}
    </GamesContext.Provider>
  );
}

export const useGames = () => useContext(GamesContext);
