import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("user_favorites")
      .select("game_slug")
      .eq("user_id", user.id);
    setFavorites(data?.map((d) => d.game_slug) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (slug: string) => {
      if (!user) {
        toast.error("You must be logged in to favorite games.");
        return false;
      }
      
      const isFav = favorites.includes(slug);
      setLoading(true);
      
      try {
        if (isFav) {
          const { error } = await supabase
            .from("user_favorites")
            .delete()
            .match({ user_id: user.id, game_slug: slug });
            
          if (error) throw error;
          setFavorites((f) => f.filter((s) => s !== slug));
          return false;
        } else {
          const { error } = await supabase
            .from("user_favorites")
            .insert({ user_id: user.id, game_slug: slug });
            
          if (error) throw error;
          setFavorites((f) => [...f, slug]);
          return true;
        }
      } catch (error: any) {
        console.error("Error toggling favorite:", error);
        toast.error(error.message || "Failed to update favorites");
        return isFav; // Return original state on failure
      } finally {
        setLoading(false);
      }
    },
    [user, favorites],
  );

  return { favorites, loading, toggle, refresh, isFavorite: (s: string) => favorites.includes(s) };
}

export async function recordPlay(userId: string, gameSlug: string) {
  await supabase.from("play_history").insert({ user_id: userId, game_slug: gameSlug });
}
