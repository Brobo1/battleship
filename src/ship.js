class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(false);
    this.sunk = false;
    this.direction = "horizontal";
    this.position = [];
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

  setPosition(position) {
    this.position = position;
  }

  setDirection(direction) {
    this.direction = direction;
  }
}

module.exports = { Ship };
