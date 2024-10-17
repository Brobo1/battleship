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
    this.ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      if (direction === "h") {
        this.board[x + i][y] = ship;
      } else this.board[x][y + i] = ship;
    }
  }
}

// let board = new Board();

module.exports = { Board };
