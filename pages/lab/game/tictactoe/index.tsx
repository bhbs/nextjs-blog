import React, { useEffect, useState } from "react";
import Layout from "../../../../components/lab/game/layout";
import checkGame from "../../../../lib/lab/game/tictactoe/checkGame";
import { database } from "../../../../lib/lab/game/tictactoe/firebase";
import styles from "./index.module.scss";

export type GameData = {
  board: Board;
  unselectable: Board;
  player: Player;
  winner: Winner;
};
export type Player = 1 | 2;
export type Winner = 0 | Player | 3;

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
    winner: 0,
  });

  useEffect(() => {
    database.ref("tictactoe").on("value", (snapshot) => {
      const data = snapshot.val();
      setGameData(data);
    });
  }, []);

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

    pushGameData({
      board,
      unselectable,
      player,
      winner,
    });
  };

  const resetGame = () => {
    pushGameData({
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
      winner: 0,
    });
  };

  const pushGameData = async (gameData: GameData): Promise<void> => {
    try {
      await database.ref("tictactoe").set(gameData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className={styles.board}>
        {gameData.winner ? (
          <>
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
          </>
        ) : (
          <GameBoard board={gameData.board} handleClick={handleClick} />
        )}
      </div>
    </Layout>
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
