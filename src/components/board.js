import { getPlayers } from "../index";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const modalGridDiv = document.getElementById("modal-grid");

export function createBoard(player, divEle) {
  let grid = document.createElement("div");
  grid.className = "grid";
  grid.dataset.player = player.playerType;
  for (let i = 0; i < player.board.width; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < player.board.length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i.toString();
      cell.dataset.col = j.toString();
      if (player.board.board[i][j]) {
        cell.classList.add("cell-ship");
        if (player.board.board[i][j].hits.some((item) => item === true)) {
          cell.classList.add("cell-hit");
          cell.style.backgroundColor = "red";
        } else {
          cell.style.backgroundColor = "#191919";
        }
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  divEle.appendChild(grid);
}
