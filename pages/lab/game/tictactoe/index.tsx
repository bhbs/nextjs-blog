import React, { useState } from "react";
import checkGame from "./checkGame";
import styles from "./index.module.scss";

export type GameData = {
  board: Board;
  unselectable: Board;
  player: Player;
  winner: Winner;
};
export type Player = 1 | 2;
export type Winner = string;

export type Board = [Row, Row, Row];
export type Row = [Cell, Cell, Cell];
export type Cell = 0 | 1 | 2;

type Coordinate = {
  x: number;
  y: number;
};

const initBoard: Board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const Game: React.FC = () => {
  const [gameData, setGameData]: [
    GameData,
    React.Dispatch<React.SetStateAction<GameData>>
  ] = useState({
    board: initBoard,
    unselectable: initBoard,
    player: 1,
    winner: "",
  });

  const calcNewBoard = (
    board: Board,
    player: Player,
    selectedCell: Coordinate
  ): Board => {
    board[selectedCell.y][selectedCell.x] = player;
    return [...board];
  };

  const getUnselectable = (board: Board): Board => {
    const unselectable = board.map((row) =>
      row.map((cell) => (cell ? 1 : 0))
    ) as Board;
    return [...unselectable];
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const selectedCell: Coordinate = {
      x: parseInt(target.getAttribute("data-x")),
      y: parseInt(target.getAttribute("data-y")),
    };

    if (gameData.unselectable[selectedCell.y][selectedCell.x]) return;

    const board: Board = calcNewBoard(
      gameData.board,
      gameData.player,
      selectedCell
    );
    const unselectable = getUnselectable(board);
    const player = ((gameData.player % 2) + 1) as Player;
    const winner = checkGame(board);

    setGameData({
      board,
      unselectable,
      player,
      winner,
    });
  };

  const resetGame = () => {
    setGameData({
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      unselectable: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      player: 1,
      winner: "",
    });
  };

  return (
    <div className={styles.board}>
      {gameData.winner ? (
        <>
          <p>{gameData.winner}</p>
          <p>
            <button onClick={resetGame}>CONTINUE</button>
          </p>
        </>
      ) : (
        <GameBoard board={gameData.board} handleClick={handleClick} />
      )}
    </div>
  );
};

type Props = {
  board: Board;
  handleClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const GameBoard: React.FC<Props> = ({ board, handleClick }: Props) => {
  return (
    <>
      {board.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => (
            <span
              key={j}
              data-y={i}
              data-x={j}
              onClick={handleClick}
              className={styles.cell}
              style={{
                background: ["white", "red", "blue"][cell],
              }}
            ></span>
          ))}
        </div>
      ))}
    </>
  );
};

export default Game;
