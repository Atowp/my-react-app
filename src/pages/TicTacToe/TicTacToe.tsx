import { useState, type JSX } from "react";
import styles from "./TicTacToe.module.less";

function Square({
  value,
  onSquareClick,
  isWinning,
}: {
  value: string | null;
  onSquareClick: () => void;
  isWinning?: boolean;
}) {
  // use {} to destructure the props
  return (
    <button
      className={`${styles.square} ${isWinning ? styles.winning : ""}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
  winningLine,
}: {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
  winningLine?: number[] | null;
}) {
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((s) => s !== null);

  let status: string = "";
  if (winner) {
    status = `Winner is: ${winner.winner}, Congratulations!`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player is: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(index: number) {
    // direct reception parameters
    if (squares[index] || calculateWinner(squares)) return; // if the square is already filled, return
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const boardSize = 3;
  const boardRows = [];

  for (let row = 0; row < boardSize; row++) {
    const boardRow = [];
    for (let col = 0; col < boardSize; col++) {
      const index = row * boardSize + col;
      const isWinning = winningLine ? winningLine.includes(index) : false;
      boardRow.push(
        <Square
          key={col}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinning={isWinning}
        />
      );
    }
    boardRows.push(
      <div key={row} className="flex">
        {boardRow}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div>{status}</div>
        <div>{boardRows}</div> {/* dynamicly generate board rows */}
      </div>
    </>
  );
}

function calculateWinner(
  squares: Array<string | null>
): { winner: string; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a]!, line };
    }
  }
  return null;
}

function MoveHistory({
  // Todo: move history component
  moves,
  currentMove,
  sortAscending,
  onSortToggle,
}: {
  moves: Array<JSX.Element>;
  currentMove: number;
  sortAscending: boolean;
  onSortToggle: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div>You are at move #{currentMove}</div>
        <button
          onClick={onSortToggle}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm ml-[35px]"
        >
          {sortAscending ? "Asc" : "Des"}
        </button>
      </div>
      <div className="text-left">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

function TicTacToe() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      move: null as { row: number; col: number } | null,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);

  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;
  const winner = calculateWinner(currentSquares);
  const winningLine = winner ? winner.line : null;

  function handlePlay(nextSquares: Array<string | null>) {
    let movePosition: { row: number; col: number } | null = null;
    for (let i = 0; i < nextSquares.length; i++) {
      if (nextSquares[i] !== currentSquares[i]) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        movePosition = { row, col };
        break;
      }
    }
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, move: movePosition },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((step, move) => {
    let description;
    let positionText = "";

    if (move > 0 && step.move) {
      const { row, col } = step.move;
      positionText = `(${row}, ${col})`;
      description = "Go to move #" + move + positionText;
    } else {
      description = "Go to game start";
    }

    if (move === currentMove) {
      return (
        <li key={move}>
          <span>
            You are at move #{move}
            {positionText}
          </span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (!sortAscending) {
    moves = moves.slice().reverse();
  }

  return (
    <>
      <div className={`${styles.box} flex justify-between`}>
        <div className={styles.board}>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningLine={winningLine}
          />
        </div>
        <div className="flex flex-col">
          <MoveHistory
            moves={moves}
            currentMove={currentMove}
            sortAscending={sortAscending}
            onSortToggle={() => setSortAscending(!sortAscending)}
          />
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
