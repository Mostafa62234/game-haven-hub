import { Heart } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  gameSlug: string;
  className?: string;
}

export function FavoriteButton({ gameSlug, className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { isFavorite, toggle, loading } = useFavorites();
  const fav = isFavorite(gameSlug);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Sign in to save favorites!");
      return;
    }

    try {
      const added = await toggle(gameSlug);
      toast.success(added ? "Added to favorites!" : "Removed from favorites");
    } catch (err: any) {
      toast.error(err.message || "Failed to update favorites");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
        fav 
          ? "bg-red-500 text-white shadow-glow-red" 
          : "bg-background/40 text-white backdrop-blur hover:bg-background/60",
        className
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform", fav && "fill-current scale-110")} />
    </button>
  );
}
