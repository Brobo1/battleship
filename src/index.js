import "./styles.css";
import { Player } from "./classes/player";
import { Ship } from "./classes/ship";
import { createBoard } from "./components/board";
import { showAvailableShips } from "./components/startBoard";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");

const players = {
  p1: new Player("Human", "human"),
  p2: new Player("Computer", "computer"),
};

function clearBoard() {
  while (gridsDiv.firstChild) {
    gridsDiv.removeChild(gridsDiv.firstChild);
  }
}

function assignBoard() {
  clearBoard();
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
}

gridsDiv.addEventListener("click", (e) => {
  const cell = e.target;
  // if (cell.className === "cell") {
  //   console.log(`${cell.dataset.row}, ${cell.dataset.col}`);
  // }
});

showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
