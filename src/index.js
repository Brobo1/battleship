import "./styles.css";
import { Player } from "./classes/player";
import { showAvailableShips } from "./components/startBoard";
import "./components/game";
import { highlightCells } from "./components/helper/highlightCell";
import { createBoard } from "./components/board";
import("./components/modal");

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");
const rotateBtn = document.getElementById("rotate-btn");
const modalDiv = document.getElementById("modal");
const modalGridDiv = document.getElementById("modal-grid");

const players = {
  p1: new Player("Human", "human"),
  p2: new Player("Computer", "computer"),
};

export function getPlayers() {
  return players;
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

showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
