import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Search, User, Shield, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { ScanDialog } from "./scan-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/components/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSettings } from "./settings-provider";
import { Switch } from "@/components/ui/switch";
import { Wifi, WifiOff } from "lucide-react";

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { user, isAdmin, signOut } = useAuth();
  const { dataSaver, setDataSaver } = useSettings();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/games", search: { q: q || undefined, category: undefined } });
  };

  const navItem = (to: string, label: string) => {
    const active = path === to || (to !== "/" && path.startsWith(to));
    return (
      <Link
        to={to}
        className={`rounded-full px-3 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
          active
            ? "bg-secondary font-semibold text-secondary-foreground"
            : "font-medium text-muted-foreground hover:text-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  const initials =
    (user?.user_metadata?.display_name as string)?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-muted transition-[scale] duration-200 ease-out-expo group-hover:scale-105 group-active:scale-95">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="PlayVerse logo"
              className="h-full w-full object-contain p-1"
            />
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
              className="rounded-full pl-9 bg-muted/50 border-none focus-visible:ring-primary/20"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          {isAdmin && <ScanDialog />}
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {user ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                    {initials}
                  </span>
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-card">
              <DropdownMenuLabel className="px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm font-bold truncate">
                    {user ? ((user.user_metadata?.display_name as string) ?? user.email) : "Guest Player"}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Account Settings</span>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              
              <div className="flex items-center justify-between px-3 py-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer" onClick={() => setDataSaver(!dataSaver)}>
                <div className="flex items-center gap-2">
                  {dataSaver ? <WifiOff className="h-4 w-4 text-primary" /> : <Wifi className="h-4 w-4 text-muted-foreground" />}
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Ultra Data Saver</span>
                    <span className="text-[9px] text-muted-foreground">Minimize internet usage</span>
                  </div>
                </div>
                <Switch checked={dataSaver} onCheckedChange={setDataSaver} onClick={(e) => e.stopPropagation()} />
              </div>

              <DropdownMenuSeparator />

              {user ? (
                <>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer bg-primary/10 text-primary hover:bg-primary/20">
                      <Link to="/admin">
                        <Shield className="mr-2 h-4 w-4" /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                    <LogOut className="mr-2 h-4 w-4" /> Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/auth">Sign in to sync progress</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
