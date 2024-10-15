class Ship {
  constructor(length, hits, sunk) {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
  }

  hit() {
    return this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

const ship = new Ship(3, 2, false);
ship.hit();
console.log(ship.isSunk());
