class Board {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.board = this.buildBoard();
    this.hits = [];
  }

  buildBoard() {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  placeShip(x, y, ship) {}
}

let board = new Board();

module.exports = { Board };
