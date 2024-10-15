class Ship {
  constructor(length, hits, sunk) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    return this.hits++;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

const ship = new Ship(3, 2);
ship.hit();
console.log(ship.isSunk());
