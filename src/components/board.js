import { getPlayers } from "../index";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const modalGridDiv = document.getElementById("modal-grid");

const players = getPlayers();

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
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  divEle.appendChild(grid);
}

function clearBoard() {
  while (gridsDiv.firstChild) {
    gridsDiv.removeChild(gridsDiv.firstChild);
  }
  while (modalGridDiv.firstChild) {
    modalGridDiv.removeChild(modalGridDiv.firstChild);
  }
}

export function assignBoard() {
  clearBoard();
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
  createBoard(players.p1, modalGridDiv);
}
