import {
  Board,
  Player,
  Row,
  Winner,
} from "../../../../pages/lab/game/tictactoe";

const resultDraw = 3;
const resultContinue = 0;

const checkLine = (row: Row, player: Player) => {
  return row.every((cell) => cell === player);
};

const checkWinner = (board: Board, player: Player) => {
  if (Array.isArray(board)) {
    return (
      [
        board.some((row) => checkLine(row, player)),
        [0, 1, 2]
          .map((i) => checkLine(board.map((row) => row[i]) as Row, player))
          .some((bool) => bool),
        checkLine([0, 1, 2].map((i) => board[i][i]) as Row, player),
        checkLine([board[0][2], board[1][1], board[2][0]], player),
      ].some((bool) => bool) && player
    );
  } else {
    return resultDraw;
  }
};

const checkDraw = (board: Board) => {
  if (Array.isArray(board)) {
    return board.some((row) => row.some((cell) => !cell))
      ? resultContinue
      : resultDraw;
  } else {
    return resultDraw;
  }
};

const checkGame = (board: Board): Winner => {
  return checkWinner(board, 1) || checkWinner(board, 2) || checkDraw(board);
};

export default checkGame;
