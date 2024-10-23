import "./styles.css";
import { Player } from "./classes/player";
import { showAvailableShips } from "./components/startBoard";
import "./components/game";
import { createBoard } from "./components/board";
import { highlightCells } from "./components/helper/highlightCell";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");
const rotateBtn = document.getElementById("rotate-btn");
const modalDiv = document.getElementById("modal");
const modalGridDiv = document.getElementById("modal-grid");

let isRotate = true;

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
}

export function assignBoard() {
  clearBoard();
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
}

rotateBtn.addEventListener("click", () => {
  rotateBtn.innerHTML = isRotate ? "Horizontal" : "Vertical";
  isRotate = !isRotate;
});

gridsDiv.addEventListener("mouseover", (e) => {
  const cell = e.target;
  if (cell.className !== "cell" || !cell.closest("[data-player='human']"))
    return;
  highlightCells(
    cell,
    "#ffffff",
    cell.dataset.row,
    cell.dataset.col,
    players.p1,
    isRotate,
  );
});

gridsDiv.addEventListener("mouseout", (e) => {
  const cell = e.target;
  if (cell.className !== "cell" || !cell.closest("[data-player='human']"))
    return;
  highlightCells(
    cell,
    "#3c3c3c",
    cell.dataset.row,
    cell.dataset.col,
    players.p1,
    isRotate,
  );
});

gridsDiv.addEventListener("click", (e) => {
  const cell = e.target;
  if (cell.className !== "cell" || !cell.closest("[data-player='human']"))
    return;
  const row = parseInt(cell.dataset.row, 10);
  const col = parseInt(cell.dataset.col, 10);
  let shipToPlace = players.p1.avaiableShips.find(
    (item) => item.placed === false,
  );

  let shipLen = shipToPlace ? shipToPlace.ship.length : 0;

  if (isRotate) {
    if (row + shipLen > 10) {
      players.p1.placeShip(10 - shipLen, col, "h");
    } else {
      players.p1.placeShip(row, col, "h");
    }
  } else {
    if (col + shipLen > 10) {
      players.p1.placeShip(row, 10 - shipLen, "v");
    } else {
      players.p1.placeShip(row, col, "v");
    }
  }
  assignBoard();
});

showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
