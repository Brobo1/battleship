import { Board } from "./board";

class Player {
  constructor(name, playerType) {
    this.name = name;
    this.playerType = playerType;
    this.board = new Board();
  }
}
