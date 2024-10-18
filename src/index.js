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

  for (let i = 0; i < player.board.width; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.dataset.row = i.toString();
    for (let j = 0; j < player.board.length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.col = j.toString();
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }

  grids.appendChild(grid);
}

function assignBoard() {
  for (const player in players) {
    createBoard(players[player]);
  }
}
// assignBoard();
assignBoard(players);
