import { Board, Winner } from "../../../../pages/lab/game/reversi";

const player1 = 1;
const player2 = 2;
const resultDraw = 3;
const resultContinue = 0;

const checkContinue = (reversible: number[][]): boolean => {
  return reversible.flat().some((cell) => cell);
};

const checkWinner = (board: Board): Winner => {
  const counts = [player1, player2].map(
    (player) => board.flat().filter((cell) => cell === player).length
  );

  if (counts[0] > counts[1]) {
    return player1;
  } else if (counts[0] < counts[1]) {
    return player2;
  } else {
    return resultDraw;
  }
};

const checkGame = (board: Board, reversible: number[][]): Winner => {
  return checkContinue(reversible) ? resultContinue : checkWinner(board);
};

export default checkGame;
