import { Board } from "./board";
import { Ship } from "./ship";

class Player {
  constructor(name, playerType = "computer") {
    this.name = name;
    this.playerType = playerType;
    this.board = new Board();
    this.availableShips = [
      { ship: new Ship(5, "Carrier"), placed: false },
      { ship: new Ship(4, "Battleship"), placed: false },
      { ship: new Ship(3, "Cruiser"), placed: false },
      { ship: new Ship(3, "Submarine"), placed: false },
      { ship: new Ship(2, "Destroyer"), placed: false },
    ];
  }

  placeShip(x = 0, y = 0, direction = "v") {
    let shipToPlace = this.availableShips.find((item) => item.placed === false);
    if (!shipToPlace) return false;

    // For computer player, generate random coordinates
    if (this.playerType === "computer") {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      direction = Math.random() < 0.5 ? "v" : "h";
    }

    // Try to place the ship
    if (this.board.placeShip(x, y, shipToPlace.ship, direction)) {
      shipToPlace.placed = true;
      return true;
    }

    // If placement failed for computer, we might want to try again
    if (this.playerType === "computer") {
      return this.placeShip(); // Recursive call with new random coordinates
    }

    return false;
  }

  shipsLeft() {
    let shipLeft = this.availableShips.filter((item) => item.placed === false);
    return shipLeft.length;
  }

  makeHit(x, y) {
    if (this.playerType === "computer") {
      this.board.hit(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      );
    } else this.board.hit(x, y);
  }
}

export { Player };
// module.exports = { Player };
