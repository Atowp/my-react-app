import { useState } from "react";
import Nav from "../../component/Nav/Nav";
import styles from "./TicTacToe.module.less";

function Square({
  value,
  onSquareClick,
}: {
  value: string | null;
  onSquareClick: () => void;
}) {
  // use {} to destructure the props
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
}) {
  const Winner = calculateWinner(squares);
  let status: string = "";
  if (Winner) {
    status = `Winner is: ${Winner}, Congradulations!`;
  } else {
    status = `Next player is: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(index: number) {
    // direct reception parameters
    const nextSquares = squares.slice();
    if (squares[index] || calculateWinner(squares)) return; // if the square is already filled, return
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  }

  function calculateWinner(squares: Array<string | null>) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div>{status}</div>
        <div>
          <div className="flex">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="flex">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="flex">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </div>
    </>
  );
}

function Todo() {
  return (
    <>
      <div>Todo List Component Placeholder</div>
      <div className="text-left">
        <ol>
          <li>Add a reset button</li>
          <li>Add a restart button</li>
          <li>Add a timer</li>
        </ol>
      </div>
    </>
  );
}

function TicTacToe() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string | null>) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <Nav />
      <div className={`${styles.box} flex justify-between`}>
        <div className={styles.board}>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="flex flex-col">
          <Todo />
        </div>
      </div>
    </>
  );
}

export default TicTacToe;
