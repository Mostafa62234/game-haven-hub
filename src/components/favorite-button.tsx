import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  gameSlug: string;
  className?: string;
}

export function FavoriteButton({ gameSlug, className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    async function checkFavorite() {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("id")
        .eq("user_id", user?.id)
        .eq("game_slug", gameSlug)
        .single();
      
      if (data) setIsFavorite(true);
    }
    
    checkFavorite();
  }, [user, gameSlug]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Sign in to save favorites!");
      return;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("user_favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("game_slug", gameSlug);
        
        if (error) throw error;
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase
          .from("user_favorites")
          .insert({ user_id: user.id, game_slug: gameSlug });
        
        if (error) throw error;
        setIsFavorite(true);
        toast.success("Added to favorites!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update favorites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
        isFavorite 
          ? "bg-red-500 text-white shadow-glow-red" 
          : "bg-background/40 text-white backdrop-blur hover:bg-background/60",
        className
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform", isFavorite && "fill-current scale-110")} />
    </button>
  );
}
