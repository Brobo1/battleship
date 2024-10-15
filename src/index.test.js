const battleship = require("./ship").Ship;

test("battleship", () => {
  const ship = new battleship(4, 0);
  ship.hit();
  expect(ship).toEqual({ length: 4, hits: 1, sunk: false });
});
