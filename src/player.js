import { Board } from "./board";

class Player {
  constructor(name, playerType = "computer") {
    this.name = name;
    this.playerType = playerType;
    this.board = new Board();
  }

  placeShip(x, y, ship, direction) {
    if (this.playerType === "computer") {
      this.board.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        ship,
        direction,
      );
    } else {
      this.board.placeShip(x, y, ship, direction);
    }
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
