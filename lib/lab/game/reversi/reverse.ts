import { Board, Coordinate, Player } from "pages/lab/game/reversi";

export const reverse = (
  board: Board,
  coordinate: Coordinate,
  player: Player
): Board => {
  [
    ...check(board, coordinate, player, { x: -1, y: -1 }),
    ...check(board, coordinate, player, { x: -1, y: 0 }),
    ...check(board, coordinate, player, { x: -1, y: 1 }),
    ...check(board, coordinate, player, { x: 0, y: -1 }),
    coordinate,
    ...check(board, coordinate, player, { x: 0, y: 1 }),
    ...check(board, coordinate, player, { x: 1, y: -1 }),
    ...check(board, coordinate, player, { x: 1, y: 0 }),
    ...check(board, coordinate, player, { x: 1, y: 1 }),
  ].forEach((target) => {
    board[target.y][target.x] = player;
  });
  return board;
};

const reversible = (
  board: Board,
  coordinate: Coordinate,
  player: Player
): number => {
  if (board[coordinate.y][coordinate.x]) return 0;

  return [
    check(board, coordinate, player, { x: -1, y: -1 }).length,
    check(board, coordinate, player, { x: -1, y: 0 }).length,
    check(board, coordinate, player, { x: -1, y: 1 }).length,
    check(board, coordinate, player, { x: 0, y: -1 }).length,
    // check(board, coordinate, player, {x: 0, y: 0}).length,
    check(board, coordinate, player, { x: 0, y: 1 }).length,
    check(board, coordinate, player, { x: 1, y: -1 }).length,
    check(board, coordinate, player, { x: 1, y: 0 }).length,
    check(board, coordinate, player, { x: 1, y: 1 }).length,
  ].reduce((a, b) => a + b);
};

export const getReversibleCells = (
  board: Board,
  player: Player
): number[][] => {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ].map((row, i) =>
    row.map((_, j) => {
      return reversible(board, { x: j, y: i }, player);
    })
  );
};

const check = (
  board: Board,
  coordinate: Coordinate,
  player: Player,
  option: Coordinate,
  result: Coordinate[] = []
) => {
  const target = {
    x: coordinate.x + option.x,
    y: coordinate.y + option.y,
  };

  const cell = board[target.y] ? board[target.y][target.x] : undefined;

  if (cell === (player % 2) + 1) {
    return check(board, target, player, option, [...result, target]);
  } else if (cell === player) {
    return result;
  } else {
    return [];
  }
};
