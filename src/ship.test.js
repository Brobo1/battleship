const Ship = require("./ship").Ship;

describe("Ship", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(4);
  });

  test("should create a ship with correct length", () => {
    expect(ship.length).toBe(4);
  });

  // test("should create a ship with correct position", () => {
  //   expect(ship.position.length).toBe(4);
  // });

  test("should mark hit location", () => {
    ship.hit(1);
    expect(ship.hits[1]).toBe(true);
  });

  test("should not mark hit location if out of bounds", () => {
    expect(() => ship.hit(10)).toThrow("Invalid position");
  });

  test("should sink ship if all positions are hit", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });

  test("should not sink ship if not all positions are hit", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
  });
});
