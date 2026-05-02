import { Link } from "@tanstack/react-router";
import { Gamepad2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted overflow-hidden">
              <img src="/logo.png" className="h-full w-full object-contain p-0.5" />
            </div>
            <span className="font-bold">PlayVerse</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Free browser games for everyone. No installs, no friction — just play.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Browse</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/games" className="hover:text-foreground">All games</Link></li>
            <li><Link to="/multiplayer" className="hover:text-foreground">Multiplayer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Categories</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Arcade</li>
            <li>Puzzle</li>
            <li>Strategy</li>
            <li>Casual</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">About</h4>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PlayVerse. All trademarks are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
