import "./styles.css";
import { Player } from "./player";

const container = document.getElementById("container");
const grids = document.getElementById("grids");

const players = {
  p1: new Player("Human", "human"),
  p2: new Player("Computer", "computer"),
};

function createBoard(player) {
  let grid = document.createElement("div");
  grid.className = "grid";

  for (const cells of player.board.board) {
    for (const cell of cells) {
    }
  }

  grids.appendChild(grid);
}

function assignBoard() {
  for (const player in players) {
    createBoard(players[player]);
  }
}
// assignBoard();
createBoard(players.p1);
