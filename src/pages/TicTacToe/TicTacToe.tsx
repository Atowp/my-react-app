import { useState } from "react";
import Nav from "../../component/Nav/Nav";
import styles from "./TicTacToe.module.less";

function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: () => void;
}) {
  // use {} to destructure the props
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function TicTacToe() {
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquare] = useState(Array(9).fill(null));
  const Winner = calculateWinner(squares);
  let status: string = "";
  if (Winner) {
    status = `Winner: ${Winner}, Congradulations!`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }
  function handleClick(index: number) {
    // direct reception parameters
    const nextSquares = squares.slice();
    if (squares[index] || calculateWinner(squares)) return; // if the square is already filled, return
    if (isXNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    setSquare(nextSquares);
    setIsXNext(!isXNext);
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
      <Nav />
      <div>{status}</div>
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
    </>
  );
}

export default TicTacToe;
