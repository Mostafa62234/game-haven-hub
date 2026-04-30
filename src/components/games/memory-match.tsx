import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const ICONS = ["🎮", "🚀", "🎲", "🎯", "🏆", "⚡", "🌟", "🔥"];

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newDeck(): Card[] {
  return shuffle([...ICONS, ...ICONS]).map((icon, i) => ({
    id: i,
    icon,
    flipped: false,
    matched: false,
  }));
}

export function MemoryMatchGame() {
  const [cards, setCards] = useState<Card[]>(() => newDeck());
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const won = useMemo(() => cards.every((c) => c.matched), [cards]);

  useEffect(() => {
    if (picked.length !== 2) return;
    const [a, b] = picked;
    setMoves((m) => m + 1);
    const timer = setTimeout(() => {
      setCards((cur) =>
        cur.map((c) => {
          if (c.id !== a && c.id !== b) return c;
          if (cur[a].icon === cur[b].icon) return { ...c, matched: true };
          return { ...c, flipped: false };
        }),
      );
      setPicked([]);
    }, 700);
    return () => clearTimeout(timer);
  }, [picked]);

  const flip = (id: number) => {
    if (picked.length === 2) return;
    setCards((cur) =>
      cur.map((c) => (c.id === id && !c.matched && !c.flipped ? { ...c, flipped: true } : c)),
    );
    setPicked((p) => (p.includes(id) ? p : [...p, id]));
  };

  const reset = () => {
    setCards(newDeck());
    setPicked([]);
    setMoves(0);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-hero p-6">
      <div className="flex items-center gap-6 text-sm">
        <div className="rounded-xl bg-card px-3 py-2 shadow-card">
          <span className="text-xs text-muted-foreground">Moves</span>
          <div className="text-xl font-bold">{moves}</div>
        </div>
        {won && (
          <div className="rounded-xl bg-gradient-primary px-4 py-2 font-semibold text-primary-foreground shadow-glow">
            🎉 You won in {moves} moves!
          </div>
        )}
      </div>

      <div className="grid w-full max-w-md grid-cols-4 gap-2 sm:gap-3">
        {cards.map((c) => {
          const show = c.flipped || c.matched;
          return (
            <button
              key={c.id}
              onClick={() => flip(c.id)}
              className={`flex aspect-square items-center justify-center rounded-xl text-3xl shadow-card transition-all sm:text-4xl ${
                show ? "bg-card" : "bg-gradient-primary"
              } ${c.matched ? "opacity-60" : ""}`}
            >
              {show ? c.icon : ""}
            </button>
          );
        })}
      </div>

      <Button onClick={reset} variant="secondary" className="rounded-full">
        <RotateCcw className="mr-2 h-4 w-4" /> New game
      </Button>
    </div>
  );
}
