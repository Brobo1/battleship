import "./styles.css";
import { Player } from "./player";
import { Ship } from "./ship";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");

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
    for (let j = 0; j < player.board.length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i.toString();
      cell.dataset.col = j.toString();
      player.board.placeShip(2, 2, new Ship(4), "h");
      if (player.board.board[i][j] && player.playerType === "human") {
        cell.style.backgroundColor = "#000000";
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  gridsDiv.appendChild(grid);
}

function showAvailableShips() {
  console.table(players.p1.avaiableShips);
}

function assignBoard() {
  for (const player in players) {
    createBoard(players[player]);
  }
}

gridsDiv.addEventListener("click", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    console.log(`${cell.dataset.row}, ${cell.dataset.col}`);
  }
});

showAvailableShips();
// assignBoard();
assignBoard(players);
