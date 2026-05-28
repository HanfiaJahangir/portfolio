"use client";

import { useEffect, useMemo, useState } from "react";
import { usePageVisible } from "@/hooks/usePageVisible";

type CandyKind = "rose" | "sun" | "leaf" | "water" | "berry" | "honey";
type Cell = {
  id: number;
  kind: CandyKind;
  matched?: boolean;
  fresh?: boolean;
};
type Position = { row: number; col: number };
type MatchGroup = Position[];
type Burst = {
  id: number;
  row: number;
  col: number;
  label: string;
  tone: "match" | "combo" | "booster";
};
type GameState = "ready" | "playing" | "gameover";

const size = 7;
const roundSeconds = 75;
const kinds: CandyKind[] = ["rose", "sun", "leaf", "water", "berry", "honey"];
const candyStyles: Record<CandyKind, string> = {
  rose: "bg-[#ff5f8a] shadow-[0_0_18px_rgba(255,95,138,0.35)]",
  sun: "bg-[#ffd166] shadow-[0_0_18px_rgba(255,209,102,0.35)]",
  leaf: "bg-[#58d68d] shadow-[0_0_18px_rgba(88,214,141,0.35)]",
  water: "bg-[#4dabf7] shadow-[0_0_18px_rgba(77,171,247,0.35)]",
  berry: "bg-[#b197fc] shadow-[0_0_18px_rgba(177,151,252,0.35)]",
  honey: "bg-[#ff922b] shadow-[0_0_18px_rgba(255,146,43,0.35)]"
};
const candyShapes: Record<CandyKind, string> = {
  rose: "rounded-[44%_56%_48%_52%]",
  sun: "rounded-full",
  leaf: "rounded-[60%_40%_62%_38%]",
  water: "rounded-[50%_50%_46%_54%]",
  berry: "rounded-[38%_62%_42%_58%]",
  honey: "rounded-md rotate-45"
};

let nextCellId = 1;
let nextBurstId = 1;

export function PollenPopDemo() {
  const isPageVisible = usePageVisible();
  const [board, setBoard] = useState<Cell[][]>(() => createBoard());
  const [selected, setSelected] = useState<Position | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(18);
  const [combo, setCombo] = useState(0);
  const [booster, setBooster] = useState(0);
  const [message, setMessage] = useState("Swap candies to trigger cascades.");
  const [isResolving, setIsResolving] = useState(false);
  const [timeLeft, setTimeLeft] = useState(roundSeconds);
  const [usingBooster, setUsingBooster] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [shakeBoard, setShakeBoard] = useState(false);
  const [gameState, setGameState] = useState<GameState>("ready");
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((value) =>
        gameState === "playing" && isPageVisible ? Math.max(0, value - 1) : value
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [gameState, isPageVisible]);

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    if (score >= 3200 || moves <= 0 || timeLeft <= 0) {
      setBestScore((value) => Math.max(value, score));
      setGameState("gameover");
      setUsingBooster(false);
      setSelected(null);
      setMessage(score >= 3200 ? "Target cleared. Round complete." : "Round over. Score locked.");
    }
  }, [gameState, moves, score, timeLeft]);

  const progress = useMemo(() => Math.min(1, score / 3200), [score]);
  const pvpPressure = useMemo(() => Math.min(1, 0.18 + (roundSeconds - timeLeft) / 95), [timeLeft]);
  const isComplete = gameState === "gameover";

  function startGame() {
    setGameState("playing");
    setMessage("Swap candies to trigger cascades.");
  }

  function restart() {
    setBoard(createBoard());
    setSelected(null);
    setScore(0);
    setMoves(18);
    setCombo(0);
    setBooster(0);
    setTimeLeft(roundSeconds);
    setMessage("Swap candies to trigger cascades.");
    setUsingBooster(false);
    setBursts([]);
    setShakeBoard(false);
    setGameState("playing");
  }

  async function handleCellClick(position: Position) {
    if (gameState !== "playing" || isResolving || isComplete) {
      return;
    }

    if (usingBooster && booster >= 100) {
      setUsingBooster(false);
      setBooster(0);
      addBursts([{ row: position.row, col: position.col }], "Bee!", "booster");
      pulseBoard();
      await resolveBoard(removeCross(board, position), 2, "Bee booster cleared a pressure lane.");
      return;
    }

    if (!selected) {
      setSelected(position);
      return;
    }

    if (samePosition(selected, position)) {
      setSelected(null);
      return;
    }

    if (!isAdjacent(selected, position)) {
      setSelected(position);
      return;
    }

    const swapped = swapCells(board, selected, position);
    setSelected(null);
    setMoves((value) => value - 1);

    const matches = findMatches(swapped);
    if (matches.length === 0) {
      setBoard(swapped);
      setMessage("No match. In production this is where swap-back feedback plays.");
      pulseBoard();
      window.setTimeout(() => setBoard(board), 180);
      return;
    }

    await resolveBoard(swapped, 1, "Match confirmed. Cascade resolver engaged.");
  }

  async function resolveBoard(nextBoard: Cell[][], startingCombo: number, nextMessage: string) {
    setIsResolving(true);
    setMessage(nextMessage);
    let workingBoard = cloneBoard(nextBoard);
    let chain = startingCombo;
    let totalScore = 0;

    while (true) {
      const matches = findMatches(workingBoard);
      if (matches.length === 0) {
        break;
      }

      workingBoard = markMatches(workingBoard, matches);
      setBoard(workingBoard);
      const clearedPositions = uniquePositions(matches.flat());
      addBursts(clearedPositions, chain > 1 ? `x${chain}` : "Pop", chain > 1 ? "combo" : "match");
      await wait(170);

      const cleared = matches.reduce((sum, group) => sum + group.length, 0);
      totalScore += cleared * 42 * chain;
      setCombo(chain);
      setBooster((value) => Math.min(100, value + cleared * 6));
      workingBoard = collapseBoard(workingBoard);
      setBoard(workingBoard);
      await wait(190);
      chain += 1;
    }

    setScore((value) => value + totalScore);
    setMessage(chain > startingCombo + 1 ? "Cascade chain paid out bonus score." : nextMessage);
    setIsResolving(false);
  }

  function addBursts(positions: Position[], label: string, tone: Burst["tone"]) {
    const next = positions.slice(0, 10).map((position) => ({
      id: nextBurstId++,
      row: position.row,
      col: position.col,
      label,
      tone
    }));
    setBursts((value) => [...value, ...next]);
    window.setTimeout(() => {
      setBursts((value) => value.filter((burst) => !next.some((item) => item.id === burst.id)));
    }, 620);
  }

  function pulseBoard() {
    setShakeBoard(true);
    window.setTimeout(() => setShakeBoard(false), 180);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-panel/85 shadow-command">
      <div className="grid gap-0 xl:grid-cols-[1fr_340px]">
        <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(247,185,85,0.18),transparent_24%),linear-gradient(135deg,#060711,#101421)] p-4 md:p-6">
          <div className="absolute inset-0 bg-scan-grid bg-[length:38px_38px] opacity-15" />
          <div className="relative z-content mx-auto flex h-full max-w-4xl flex-col justify-center gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-void/70 p-4 backdrop-blur-xl">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-reactor">
                  Pollen Pop playable slice
                </p>
                <h3 className="mt-2 text-2xl font-black text-ink">Candy match-3 board loop</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted">
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  {moves} moves
                </span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  {timeLeft}s
                </span>
                <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  x{Math.max(1, combo)}
                </span>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_220px]">
              <div
                className={`relative rounded-lg border border-white/10 bg-void/72 p-3 shadow-command backdrop-blur-xl ${
                  shakeBoard ? "animate-[board-shake_0.18s_ease-out]" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-3 grid aspect-square grid-cols-7 gap-2">
                  {bursts.map((burst) => (
                    <span
                      key={burst.id}
                      className={`grid place-items-center text-xs font-black uppercase tracking-[0.08em] ${
                        burst.tone === "booster"
                          ? "text-signal"
                          : burst.tone === "combo"
                            ? "text-reactor"
                            : "text-ink"
                      }`}
                      style={{
                        gridColumn: burst.col + 1,
                        gridRow: burst.row + 1
                      }}
                    >
                      <span className="animate-[score-pop_0.62s_ease-out_forwards] rounded-full border border-white/20 bg-void/80 px-2 py-1 shadow-glow">
                        {burst.label}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="grid aspect-square grid-cols-7 gap-2">
                  {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const position = { row: rowIndex, col: colIndex };
                      const active = selected && samePosition(selected, position);
                      return (
                        <button
                          key={cell.id}
                          className={`group relative min-h-0 overflow-hidden rounded-md border bg-white/[0.03] transition duration-150 ${
                            cell.matched
                              ? "scale-75 border-white/30 opacity-20"
                              : "border-white/15 hover:scale-105 hover:border-white/40"
                          } ${active ? "scale-105 ring-2 ring-signal ring-offset-2 ring-offset-void" : ""}`}
                          onClick={() => void handleCellClick(position)}
                          aria-label={`${cell.kind} candy at row ${rowIndex + 1}, column ${
                            colIndex + 1
                          }`}
                        >
                          <span
                            className={`absolute inset-[14%] transition ${
                              cell.matched
                                ? "animate-[candy-burst_0.2s_ease-out_forwards]"
                                : cell.fresh
                                  ? "animate-[candy-drop_0.28s_cubic-bezier(.2,.8,.2,1)_both]"
                                  : "animate-[candy-idle_2.8s_ease-in-out_infinite]"
                            } ${candyStyles[cell.kind]} ${candyShapes[cell.kind]}`}
                            style={{ animationDelay: `${((rowIndex + colIndex) % 4) * 0.04}s` }}
                          >
                            <span
                              className={`absolute inset-[18%] border border-white/30 bg-white/20 ${
                                cell.kind === "honey" ? "rounded-sm" : "rounded-full"
                              }`}
                            />
                            <span className="absolute left-[18%] top-[16%] h-[18%] w-[22%] rounded-full bg-white/55 blur-[1px]" />
                          </span>
                          {active ? (
                            <span className="pointer-events-none absolute inset-0 animate-[selection-pulse_0.9s_ease-in-out_infinite] rounded-md border border-signal/80" />
                          ) : null}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="grid content-start gap-3">
                <div className="rounded-lg border border-reactor/25 bg-reactor/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-reactor">
                    Score target
                  </p>
                  <p className="mt-2 text-3xl font-black text-ink">{score}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-reactor"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  className={`min-h-12 rounded-md border px-4 py-3 text-sm font-black uppercase tracking-[0.14em] transition ${
                    booster >= 100
                      ? "border-signal bg-signal text-void hover:brightness-110"
                      : "border-white/10 bg-white/[0.04] text-muted"
                  }`}
                  disabled={booster < 100 || isResolving || isComplete}
                  onClick={() => setUsingBooster(true)}
                >
                  Bee line {booster}%
                </button>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">
                    PVP pressure
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-danger"
                      style={{ width: `${pvpPressure * 100}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    The visible board loop can feed tournament score, PVP pressure, rewards, and
                    economy events.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-void/72 p-4 text-sm leading-6 text-muted backdrop-blur-xl">
              <span className="font-bold text-signal">{usingBooster ? "Select a tile. " : ""}</span>
              {message}
            </div>

            {gameState === "ready" ? (
              <div className="absolute inset-0 z-30 grid place-items-center bg-void/72 p-5 backdrop-blur-md">
                <div className="w-full max-w-xl rounded-lg border border-reactor/35 bg-panel/95 p-6 text-center shadow-command">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-reactor">
                    Pollen Pop round
                  </p>
                  <h3 className="mt-3 text-3xl font-black text-ink">Start match-3 sprint</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                    Score as high as possible before the timer or moves run out. Matches create
                    cascades, and cascades charge the Bee line booster.
                  </p>
                  <div className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-3">
                    <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                      75 seconds
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                      18 moves
                    </span>
                    <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                      3200 target
                    </span>
                  </div>
                  <button
                    className="mt-6 min-h-12 rounded-md border border-reactor/70 bg-reactor px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-void transition hover:brightness-110"
                    onClick={startGame}
                  >
                    Start
                  </button>
                </div>
              </div>
            ) : null}

            {isComplete ? (
              <div className="absolute inset-0 z-30 grid place-items-center bg-void/72 p-5 backdrop-blur-md">
                <div className="w-full max-w-3xl rounded-lg border border-signal/35 bg-panel/95 p-6 shadow-command">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
                    Game over
                  </p>
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <h3 className="text-4xl font-black text-ink">{score}</h3>
                      <p className="mt-1 text-sm text-muted">Final score</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                        Moves {moves}
                      </span>
                      <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                        Combo x{Math.max(1, combo)}
                      </span>
                      <span className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                        Best {Math.max(bestScore, score)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 rounded-lg border border-signal/35 bg-signal/10 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-signal">
                      Systems breakdown
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {[
                        "Match detection, swap validation, collapse, and refill as separated board steps.",
                        "Boosters and rewards are gameplay events that can feed economy and live goals.",
                        "The same core board loop can support tournament, PVP, story, and daily modes."
                      ].map((item) => (
                        <p
                          key={item}
                          className="rounded-md border border-white/10 bg-void/45 p-3 text-sm text-muted"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                    <button
                      className="mt-4 min-h-11 rounded-md border border-signal/70 bg-signal px-4 py-2 text-sm font-bold text-void"
                      onClick={restart}
                    >
                      Restart round
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="grid gap-4 border-t border-white/10 bg-void/72 p-5 xl:border-l xl:border-t-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-reactor">
              Match-3 systems
            </p>
            <h3 className="mt-3 text-2xl font-black text-ink">Puzzle economy slice</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Swap adjacent candy tiles, make matches, trigger cascades, charge a booster, and show
              how board results can feed PVP, tournament, reward, and live event systems.
            </p>
          </div>
          {[
            ["Core loop", "Swap -> match -> clear -> cascade -> reward"],
            ["Booster", "Charged by matches, clears cross lanes"],
            ["Live layer", "Score pressure and economy event surface"],
            ["Architecture", "Board resolver separated from reward systems"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{label}</p>
              <p className="mt-2 text-sm leading-6 text-ink">{value}</p>
            </div>
          ))}
        </aside>
      </div>
      <style jsx>{`
        @keyframes candy-drop {
          0% {
            opacity: 0;
            transform: translateY(-24px) scale(0.82);
          }
          72% {
            opacity: 1;
            transform: translateY(4px) scale(1.08);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes candy-idle {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.02);
          }
        }

        @keyframes candy-burst {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.45) rotate(14deg);
            filter: brightness(1.7);
          }
        }

        @keyframes score-pop {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translateY(-4px) scale(1.08);
          }
          100% {
            opacity: 0;
            transform: translateY(-34px) scale(1);
          }
        }

        @keyframes selection-pulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.94);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes board-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}

function createBoard() {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => createCell(randomKind()))
  );

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      while (createsImmediateMatch(board, row, col)) {
        board[row][col] = createCell(randomKind());
      }
    }
  }

  return board;
}

function createCell(kind: CandyKind, fresh = false): Cell {
  return { id: nextCellId++, kind, fresh };
}

function randomKind(): CandyKind {
  return kinds[Math.floor(Math.random() * kinds.length)];
}

function createsImmediateMatch(board: Cell[][], row: number, col: number) {
  const kind = board[row][col].kind;
  const horizontal =
    col >= 2 && board[row][col - 1]?.kind === kind && board[row][col - 2]?.kind === kind;
  const vertical =
    row >= 2 && board[row - 1]?.[col]?.kind === kind && board[row - 2]?.[col]?.kind === kind;
  return horizontal || vertical;
}

function findMatches(board: Cell[][]) {
  const groups: MatchGroup[] = [];

  for (let row = 0; row < size; row += 1) {
    let start = 0;
    for (let col = 1; col <= size; col += 1) {
      if (col < size && board[row][col].kind === board[row][start].kind) {
        continue;
      }
      if (col - start >= 3) {
        groups.push(
          Array.from({ length: col - start }, (_, index) => ({ row, col: start + index }))
        );
      }
      start = col;
    }
  }

  for (let col = 0; col < size; col += 1) {
    let start = 0;
    for (let row = 1; row <= size; row += 1) {
      if (row < size && board[row][col].kind === board[start][col].kind) {
        continue;
      }
      if (row - start >= 3) {
        groups.push(
          Array.from({ length: row - start }, (_, index) => ({ row: start + index, col }))
        );
      }
      start = row;
    }
  }

  return groups;
}

function markMatches(board: Cell[][], matches: MatchGroup[]) {
  const next = cloneBoard(board);
  matches.flat().forEach(({ row, col }) => {
    next[row][col] = { ...next[row][col], matched: true };
  });
  return next;
}

function collapseBoard(board: Cell[][]) {
  const next = cloneBoard(board);
  for (let col = 0; col < size; col += 1) {
    const remaining = [];
    for (let row = size - 1; row >= 0; row -= 1) {
      if (!next[row][col].matched) {
        remaining.push(next[row][col]);
      }
    }

    for (let row = size - 1; row >= 0; row -= 1) {
      next[row][col] = remaining[size - 1 - row] ?? createCell(randomKind(), true);
    }
  }
  return next;
}

function removeCross(board: Cell[][], position: Position) {
  const next = cloneBoard(board);
  for (let index = 0; index < size; index += 1) {
    next[position.row][index] = { ...next[position.row][index], matched: true };
    next[index][position.col] = { ...next[index][position.col], matched: true };
  }
  return collapseBoard(next);
}

function swapCells(board: Cell[][], a: Position, b: Position) {
  const next = cloneBoard(board);
  const temp = next[a.row][a.col];
  next[a.row][a.col] = next[b.row][b.col];
  next[b.row][b.col] = temp;
  return next;
}

function cloneBoard(board: Cell[][]) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function uniquePositions(positions: Position[]) {
  const seen = new Set<string>();
  return positions.filter((position) => {
    const key = `${position.row}:${position.col}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function isAdjacent(a: Position, b: Position) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
}

function samePosition(a: Position, b: Position) {
  return a.row === b.row && a.col === b.col;
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
