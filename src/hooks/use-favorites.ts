import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth-provider";

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
      if (!user) return false;
      const isFav = favorites.includes(slug);
      try {
        if (isFav) {
          const { error } = await supabase
            .from("user_favorites")
            .delete()
            .eq("user_id", user.id)
            .eq("game_slug", slug);
          if (error) throw error;
          setFavorites((f) => f.filter((s) => s !== slug));
          return false;
        } else {
          const { error } = await supabase.from("user_favorites").insert({ user_id: user.id, game_slug: slug });
          if (error) throw error;
          setFavorites((f) => [...f, slug]);
          return true;
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        throw error;
      }
    },
    [user, favorites],
  );

  return { favorites, loading, toggle, refresh, isFavorite: (s: string) => favorites.includes(s) };
}

export async function recordPlay(userId: string, gameSlug: string) {
  await supabase.from("play_history").insert({ user_id: userId, game_slug: gameSlug });
}
