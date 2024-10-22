class Board {
  constructor() {
    this.length = 10;
    this.width = 10;
    this.board = [];
    this.ships = [];
    this.buildBoard();
    this.hits = [];
  }

  buildBoard() {
    this.board = Array.from({ length: this.length }, () =>
      Array(this.width).fill(null),
    );
  }

  placeShip(x, y, ship, direction = "h") {
    x = parseInt(x);
    y = parseInt(y);
    for (let i = 0; i < ship.length; i++) {
      if (direction === "h") {
        this.board[x + i][y] = ship;
      } else this.board[x][y + i] = ship;
    }
    this.ships = [...this.ships, ship];
  }

  hit(x, y) {
    if (this.board[x][y]) {
      let ship = this.board[x][y];
      for (let i = 0; i < ship.hits.length; i++) {
        if (!ship.hits[i]) {
          ship.hits[i] = true;
          ship.isSunk();
          break;
        }
      }
      this.hits.push({ x: x, y: y, hit: true });
    } else this.hits.push({ x: x, y: y, hit: false });
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = { Board };
