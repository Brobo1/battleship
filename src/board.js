class Board {
  constructor() {
    this.length = 10;
    this.width = 10;
    this.board = [];
    this.buildBoard();
    this.hits = [];
  }

  buildBoard() {
    this.board = Array.from({ length: this.length }, () =>
      Array(this.width).fill(0),
    );
  }

  placeShip(x, y, ship) {
    for (let i = 0; i < ship.length; i++) {}
  }
}

// let board = new Board();

module.exports = { Board };
