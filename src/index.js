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
    let row = document.createElement("div");
    row.className = "row";
    for (const cell of cells) {
      row.innerHTML += `<div class="cell">| 0 |</div>`;
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
createBoard(players.p1);
