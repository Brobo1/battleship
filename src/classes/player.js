import { Board } from "./board";
import { Ship } from "./ship";

class Player {
  constructor(name, playerType = "computer") {
    this.name = name;
    this.playerType = playerType;
    this.board = new Board();
    this.avaiableShips = [
      { ship: new Ship(5), placed: false },
      { ship: new Ship(4), placed: false },
      { ship: new Ship(3), placed: false },
      { ship: new Ship(3), placed: false },
      { ship: new Ship(2), placed: false },
    ];
  }

  // placeShip(x, y, ship, direction) {
  //   if (this.playerType === "computer") {
  //     this.board.placeShip(
  //       Math.floor(Math.random() * 10),
  //       Math.floor(Math.random() * 10),
  //       ship,
  //       direction,
  //     );
  //   } else {
  //     this.board.placeShip(x, y, ship, direction);
  //   }
  // }

  // makeHit(x, y) {
  //   if (this.playerType === "computer") {
  //     this.board.hit(
  //       Math.floor(Math.random() * 10),
  //       Math.floor(Math.random() * 10),
  //     );
  //   } else this.board.hit(x, y);
  // }
}

export { Player };
