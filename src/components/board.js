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
      if (player.board.board[i][j] && player.playerType === "human") {
        cell.style.backgroundColor = "#191919";
        cell.classList.add("cell-ship");
        console.log(player.board.board[i][j].hits);
        if (player.board.board[i][j].hits[0]) {
          cell.style.backgroundColor = "#ff0000";
          cell.classList.add("cell-hit");
        }
      }
      if (player.board.board[i][j] && player.playerType === "computer") {
        cell.style.backgroundColor = "#191919";
        cell.classList.add("cell-ship");
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  divEle.appendChild(grid);
}
