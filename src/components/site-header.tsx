import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/games", search: { q: q || undefined, category: undefined } });
  };

  const navItem = (to: string, label: string) => {
    const active = path === to || (to !== "/" && path.startsWith(to));
    return (
      <Link
        to={to}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          active
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Gamepad2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Play<span className="text-gradient">Verse</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {navItem("/", "Home")}
          {navItem("/games", "All Games")}
          {navItem("/multiplayer", "Multiplayer")}
        </nav>

        <form onSubmit={onSubmit} className="ml-auto hidden flex-1 max-w-md md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search games..."
              className="rounded-full pl-9"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <Link to="/games">Play now</Link>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={onSubmit} className="border-t border-border bg-background px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games..."
            className="rounded-full pl-9"
          />
        </div>
      </form>
    </header>
  );
}
