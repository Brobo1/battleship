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
    let x = 1;
    board.placeShip(x, 1, ship, "h");
    for (let i = 0; i < ship.length; i++) {
      expect(board.board[x + i][1]).toBe(ship);
    }
  });

  test("Should track ships on the board", () => {
    let ship = new Ship(4);
    board.placeShip(1, 1, ship, "h");
    console.log(board.ships);
    expect(board.ships).toContain(ship);
  });

  test("Should track hit on ship", () => {
    let ship = new Ship(4);
    board.placeShip(1, 1, ship, "h");
    board.hit(1, 1);
    board.hit(2, 1);
    expect(ship.hits).toEqual([true, true, false, false]);
  });

  test("Should return true if all ships sunk", () => {
    let ship = new Ship(4);
    let ship2 = new Ship(3);
    board.placeShip(1, 1, ship, "h");
    board.placeShip(5, 6, ship2, "v");
    expect(board.allSunk()).toBe(false);
    board.hit(1, 1);
    board.hit(2, 1);
    board.hit(3, 1);
    board.hit(4, 1);
    board.hit(5, 6);
    board.hit(5, 7);
    board.hit(5, 8);
    console.log(board.ships);
    expect(board.allSunk()).toBe(true);
  });
});
