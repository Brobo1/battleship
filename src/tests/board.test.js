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
    let prevBoard = board.board;
    let ship = new Ship(4);
    board.placeShip(1, 1, ship, "v");
    console.log(board.board);
    expect(board.board).toBe(1);
  });
});
