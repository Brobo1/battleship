class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(false);
    this.sunk = false;
  }

  hit(pos) {
    if (pos < this.length) this.hits[pos] = true;
    else throw new Error("Invalid position");
  }

  // isHit(coord) {}

  isSunk() {
    if (this.hits.every((hit) => hit === true)) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

module.exports = { Ship };
