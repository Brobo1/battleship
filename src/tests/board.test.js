const { Ship } = require("../ship");
const Board = require("./../board").Board;

describe("Board", () => {
  let board;

  beforeEach(() => {
    board = new Board();
  });

  test("Should return a correct grid size", () => {
    expect({ x: board.width, y: board.length }).toEqual({ x: 10, y: 10 });
  });

  test("Should place ship on the board", () => {
    let ship = new Ship(4);
    board.placeShip(1, 1, ship, "h");
    expect(board.board[1][1]).toBe(ship);
    expect(board.board[2][1]).toBe(ship);
    expect(board.board[3][1]).toBe(ship);
    expect(board.board[4][1]).toBe(ship);
  });

  test("Should track ships on the board", () => {
    let ship = new Ship(4);
    board.placeShip(1, 1, ship, "h");
    console.log(board.ships);
    expect(board.ships).toContain(ship);
  });
});
