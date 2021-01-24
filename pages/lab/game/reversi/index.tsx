import React, { useEffect, useState } from "react";
import checkGame from "../../../../lib/lab/game/reversi/checkGame";
import {
  getReversibleCells,
  reverse,
} from "../../../../lib/lab/game/reversi/reverse";
import styles from "./index.module.scss";
import Layout from "../../../../components/lab/game/layout";
import { database } from "../../../../lib/lab/game/reversi/firebase";

export type GameData = {
  board: Board;
  reversible: number[][];
  player: Player;
  winner: Winner;
};
export type Player = 1 | 2;
export type Winner = 0 | Player | 3;

export type Board = Row[];
export type Row = Cell[];
export type Cell = 0 | 1 | 2;

export type Coordinate = {
  x: number;
  y: number;
};

const initBoard: Board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const Game: React.FC = () => {
  const [gameData, setGameData]: [
    GameData,
    React.Dispatch<React.SetStateAction<GameData>>
  ] = useState({
    board: initBoard,
    reversible: getReversibleCells(initBoard, 1),
    player: 1,
    winner: 0,
  });

  useEffect(() => {
    database.ref("reversi").on("value", (snapshot) => {
      const data = snapshot.val();
      setGameData(data);
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const selectedCell: Coordinate = {
      x: parseInt(target.getAttribute("data-x")),
      y: parseInt(target.getAttribute("data-y")),
    };

    if (!gameData.reversible[selectedCell.y][selectedCell.x]) return;

    const board: Board = reverse(gameData.board, selectedCell, gameData.player);
    const player = ((gameData.player % 2) + 1) as Player;
    const reversible = getReversibleCells(board, player);
    const winner = checkGame(board, reversible);

    pushGameData({
      board,
      reversible,
      player,
      winner,
    });
  };

  const resetGame = () => {
    pushGameData({
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      reversible: getReversibleCells(
        [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 2, 0, 0, 0],
          [0, 0, 0, 2, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ],
        1
      ),
      player: 1,
      winner: 0,
    });
  };

  const pushGameData = async (gameData: GameData): Promise<void> => {
    try {
      await database.ref("reversi").set(gameData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className={styles.board}>
        <GameBoard
          board={gameData.board}
          reversible={gameData.reversible}
          handleClick={handleClick}
        />
        {gameData.winner === 1 && (
          <p>
            <span style={{ color: "red" }}>■</span> WIN
          </p>
        )}
        {gameData.winner === 2 && (
          <p>
            <span style={{ color: "blue" }}>■</span> WIN
          </p>
        )}
        {gameData.winner === 3 && <p>DRAW</p>}
        <p>
          <button onClick={resetGame}>CONTINUE</button>
        </p>
      </div>
    </Layout>
  );
};

type Props = {
  board: Board;
  reversible: number[][];
  handleClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const GameBoard: React.FC<Props> = ({
  board,
  reversible,
  handleClick,
}: Props) => {
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
                background: reversible[i][j]
                  ? "lightgray"
                  : ["white", "red", "blue"][cell],
              }}
            ></span>
          ))}
        </div>
      ))}
    </>
  );
};

export default Game;
