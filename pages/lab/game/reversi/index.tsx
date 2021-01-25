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
  selectedCell: Coordinate;
  reversible: number[][];
  player: Player;
  winner: Winner;
};
export type Player = 1 | 2;
export type Winner = 0 | Player | 3;

type GameDataHistory = GameData[];

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
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
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
    selectedCell: { x: 3, y: 3 },
    reversible: getReversibleCells(initBoard, 1),
    player: 1,
    winner: 0,
  });

  const [gameDataHistory, setGameDataHistory]: [
    GameDataHistory,
    React.Dispatch<React.SetStateAction<GameDataHistory>>
  ] = useState([]);

  useEffect(() => {
    database.ref("reversi").on("value", (snapshot) => {
      const data = snapshot.val();
      setGameData(data);
    });
  }, []);

  useEffect(() => {
    setGameDataHistory([
      ...gameDataHistory,
      JSON.parse(JSON.stringify(gameData)),
    ]);
  }, [gameData]);

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
      selectedCell,
      reversible,
      player,
      winner,
    });
  };

  const backHistory = () => {
    if (gameDataHistory.length <= 2) return;

    setGameDataHistory(gameDataHistory.slice(0, -2));
    pushGameData(gameDataHistory.slice(-2)[0]);
  };

  const resetGame = () => {
    const board: Board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    pushGameData({
      board,
      selectedCell: { x: 3, y: 3 },
      reversible: getReversibleCells(board, 1),
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
          selectedCell={gameData.selectedCell}
          gameDataHistory={gameDataHistory}
          reversible={gameData.reversible}
          player={gameData.player}
          handleClick={handleClick}
        />
        {gameData.winner === 1 && (
          <p>
            <span style={{ color: "gray" }}>■</span> WIN
          </p>
        )}
        {gameData.winner === 2 && (
          <p>
            <span style={{ color: "white" }}>■</span> WIN
          </p>
        )}
        {gameData.winner === 3 && <p>DRAW</p>}
        <p>
          <button className={styles.deko} onClick={backHistory}>
            ←
          </button>
          <button className={styles.deko} onClick={resetGame}>
            CONTINUE
          </button>
        </p>
      </div>
    </Layout>
  );
};

type Props = {
  board: Board;
  selectedCell: Coordinate;
  reversible: number[][];
  player: Player;
  gameDataHistory: GameDataHistory;
  handleClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const GameBoard: React.FC<Props> = ({
  board,
  selectedCell,
  gameDataHistory,
  reversible,
  player,
  handleClick,
}: Props) => {
  const calcDistance = (cell: Coordinate) => {
    const dx = cell.x - selectedCell.x;
    const dy = cell.y - selectedCell.y;

    if (dx === dy && dy > 0) return `3${dy}`; // rightDown
    if (dx === dy && dy < 0) return `7${-dy}`; // rightUp
    if (dx === -dy && dy > 0) return `5${dy}`; // leftDown
    if (dx === -dy && dy < 0) return `1${-dy}`; // leftUp
    if (dx === 0 && dy > 0) return `4${dy}`; // Down
    if (dx === 0 && dy < 0) return `0${-dy}`; // Up
    if (dy === 0 && dx > 0) return `2${dx}`; // right
    if (dy === 0 && dx < 0) return `6${-dx}`; // left
    return "99";
  };

  const checkChanged = (cell: Coordinate) => {
    if (gameDataHistory.length <= 2) return false;
    return (
      gameDataHistory.slice(-2)[0].board[cell.y][cell.x] !==
      board[cell.y][cell.x]
    );
  };

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
              className={`${styles.cell} ${
                reversible[i][j] ? styles.deko : styles.boko
              } ${
                checkChanged({ y: i, x: j })
                  ? styles[`boko${player}${calcDistance({ y: i, x: j })}`]
                  : ["", styles.gray, styles.white][cell]
              }`}
            ></span>
          ))}
        </div>
      ))}
    </>
  );
};

export default Game;
