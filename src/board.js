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
    let boardCopy = JSON.parse(JSON.stringify(this.board));
    for (let i = 0; i < ship.length; i++) {
      if (direction === "h") {
        boardCopy[x + i][y] = ship;
      } else boardCopy[x][y + i] = ship;
    }
    this.board = boardCopy;
    this.ships = [...this.ships, ship];
  }
}

// let board = new Board();

module.exports = { Board };
