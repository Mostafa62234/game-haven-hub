import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calcWinner(cells: Cell[]): { winner: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line };
    }
  }
  return null;
}

export function TicTacToeGame() {
  const [cells, setCells] = useState<Cell[]>(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = calcWinner(cells);
  const isDraw = !result && cells.every(Boolean);
  const status = result
    ? `${result.winner} wins!`
    : isDraw
    ? "It's a draw!"
    : `${xNext ? "X" : "O"}'s turn`;

  const click = (i: number) => {
    if (cells[i] || result) return;
    const next = cells.slice();
    next[i] = xNext ? "X" : "O";
    setCells(next);
    setXNext(!xNext);
    const r = calcWinner(next);
    if (r?.winner === "X") setScores((s) => ({ ...s, X: s.X + 1 }));
    else if (r?.winner === "O") setScores((s) => ({ ...s, O: s.O + 1 }));
    else if (next.every(Boolean)) setScores((s) => ({ ...s, draws: s.draws + 1 }));
  };

  const reset = () => {
    setCells(Array(9).fill(null));
    setXNext(true);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-hero p-6">
      <div className="flex w-full max-w-sm items-center justify-between text-sm">
        <div className="rounded-xl bg-card px-3 py-2 shadow-card">
          <div className="text-xs text-muted-foreground">Player X</div>
          <div className="text-xl font-bold">{scores.X}</div>
        </div>
        <div className="rounded-xl bg-card px-3 py-2 shadow-card">
          <div className="text-xs text-muted-foreground">Draws</div>
          <div className="text-xl font-bold">{scores.draws}</div>
        </div>
        <div className="rounded-xl bg-card px-3 py-2 shadow-card">
          <div className="text-xs text-muted-foreground">Player O</div>
          <div className="text-xl font-bold">{scores.O}</div>
        </div>
      </div>

      <div className="text-lg font-semibold">{status}</div>

      <div className="grid w-full max-w-sm grid-cols-3 gap-3">
        {cells.map((c, i) => {
          const winning = result?.line.includes(i);
          return (
            <button
              key={i}
              onClick={() => click(i)}
              className={`flex aspect-square items-center justify-center rounded-2xl text-5xl font-bold shadow-card transition-all ${
                winning
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card hover:bg-secondary"
              }`}
            >
              <span className={c === "X" ? "text-primary" : "text-accent-foreground"}>{c}</span>
            </button>
          );
        })}
      </div>

      <Button onClick={reset} variant="secondary" className="rounded-full">
        <RotateCcw className="mr-2 h-4 w-4" /> New round
      </Button>
    </div>
  );
}
