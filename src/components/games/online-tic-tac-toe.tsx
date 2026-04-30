import { useEffect, useState, useCallback } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

type Cell = "X" | "O" | null;

interface Room {
  id: string;
  code: string;
  host_id: string;
  guest_id: string | null;
  host_name: string | null;
  guest_name: string | null;
  board: Cell[];
  current_turn: "X" | "O";
  winner: string | null;
  status: string;
}

const WINS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(b: Cell[]): "X" | "O" | "draw" | null {
  for (const [a, c, d] of WINS) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  if (b.every(Boolean)) return "draw";
  return null;
}

function genCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export function OnlineTicTacToe() {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [joinCode, setJoinCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  // Subscribe to room updates
  useEffect(() => {
    if (!room) return;
    const channel = supabase
      .channel(`room-${room.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "multiplayer_rooms", filter: `id=eq.${room.id}` },
        (payload) => {
          setRoom(payload.new as Room);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [room?.id]);

  const createRoom = useCallback(async () => {
    if (!user) return;
    setBusy(true);
    const code = genCode();
    const displayName = (user.user_metadata?.display_name as string) ?? user.email?.split("@")[0] ?? "Host";
    const { data, error } = await supabase
      .from("multiplayer_rooms")
      .insert({ code, host_id: user.id, host_name: displayName })
      .select()
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRoom(data as Room);
  }, [user]);

  const joinRoom = useCallback(async () => {
    if (!user || !joinCode) return;
    setBusy(true);
    const code = joinCode.toUpperCase().trim();
    const { data: existing, error: findErr } = await supabase
      .from("multiplayer_rooms")
      .select("*")
      .eq("code", code)
      .maybeSingle();
    if (findErr || !existing) {
      setBusy(false);
      toast.error("Room not found");
      return;
    }
    if (existing.guest_id && existing.guest_id !== user.id && existing.host_id !== user.id) {
      setBusy(false);
      toast.error("Room is full");
      return;
    }
    if (existing.host_id === user.id) {
      setRoom(existing as Room);
      setBusy(false);
      return;
    }
    const displayName = (user.user_metadata?.display_name as string) ?? user.email?.split("@")[0] ?? "Guest";
    const { data, error } = await supabase
      .from("multiplayer_rooms")
      .update({ guest_id: user.id, guest_name: displayName, status: "playing" })
      .eq("id", existing.id)
      .select()
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRoom(data as Room);
  }, [user, joinCode]);

  const playCell = useCallback(
    async (idx: number) => {
      if (!room || !user || room.winner || room.status !== "playing") return;
      const myMark: "X" | "O" = room.host_id === user.id ? "X" : "O";
      if (room.current_turn !== myMark) {
        toast.info("Not your turn");
        return;
      }
      if (room.board[idx]) return;
      const newBoard = [...room.board];
      newBoard[idx] = myMark;
      const result = checkWinner(newBoard);
      const nextTurn: "X" | "O" = myMark === "X" ? "O" : "X";
      const { error } = await supabase
        .from("multiplayer_rooms")
        .update({
          board: newBoard,
          current_turn: nextTurn,
          winner: result,
          status: result ? "ended" : "playing",
        })
        .eq("id", room.id);
      if (error) toast.error(error.message);
    },
    [room, user],
  );

  const reset = useCallback(async () => {
    if (!room) return;
    await supabase
      .from("multiplayer_rooms")
      .update({
        board: [null, null, null, null, null, null, null, null, null],
        current_turn: "X",
        winner: null,
        status: room.guest_id ? "playing" : "waiting",
      })
      .eq("id", room.id);
  }, [room]);

  const leave = useCallback(async () => {
    setRoom(null);
  }, []);

  const copyCode = () => {
    if (!room) return;
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card">
        <h3 className="text-xl font-bold">Sign in to play online</h3>
        <p className="mt-2 text-sm text-muted-foreground">Create a free account to host and join multiplayer rooms.</p>
        <Button asChild className="mt-4 rounded-full bg-gradient-primary shadow-glow">
          <Link to="/auth">Sign in</Link>
        </Button>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-lg font-bold">Host a room</h3>
          <p className="mt-1 text-sm text-muted-foreground">Get a code, share it with a friend.</p>
          <Button onClick={createRoom} disabled={busy} className="mt-4 w-full rounded-full bg-gradient-primary shadow-glow">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create room"}
          </Button>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <h3 className="text-lg font-bold">Join with code</h3>
          <div className="mt-4 flex gap-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="ABCDE"
              maxLength={5}
              className="rounded-full font-mono uppercase"
            />
            <Button onClick={joinRoom} disabled={busy || !joinCode} className="rounded-full">
              Join
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const myMark: "X" | "O" = room.host_id === user.id ? "X" : "O";
  const isMyTurn = room.current_turn === myMark && room.status === "playing";

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Room code</div>
            <div className="font-mono text-2xl font-bold">{room.code}</div>
          </div>
          <Button size="sm" variant="secondary" onClick={copyCode} className="rounded-full">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <span>
            <span className="text-muted-foreground">X:</span> {room.host_name ?? "Host"}
            {myMark === "X" && " (you)"}
          </span>
          <span>
            <span className="text-muted-foreground">O:</span>{" "}
            {room.guest_name ?? <em className="text-muted-foreground">waiting...</em>}
            {myMark === "O" && " (you)"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {room.board.map((cell, i) => (
            <button
              key={i}
              onClick={() => playCell(i)}
              disabled={!isMyTurn || !!cell || !!room.winner}
              className="aspect-square rounded-2xl border border-border bg-muted/40 text-4xl font-bold transition-colors hover:bg-muted disabled:cursor-not-allowed"
            >
              <span className={cell === "X" ? "text-primary" : "text-accent-foreground"}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm font-medium">
          {room.winner === "draw" ? (
            <span>It's a draw!</span>
          ) : room.winner ? (
            <span className="text-primary">{room.winner} wins! 🎉</span>
          ) : room.status === "waiting" ? (
            <span className="text-muted-foreground">Waiting for opponent...</span>
          ) : isMyTurn ? (
            <span className="text-primary">Your turn ({myMark})</span>
          ) : (
            <span className="text-muted-foreground">Opponent's turn</span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="secondary" onClick={reset} className="flex-1 rounded-full">
            New round
          </Button>
          <Button variant="outline" onClick={leave} className="flex-1 rounded-full">
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
}
