import "./styles.css";
import { Player } from "./classes/player";
import { Ship } from "./classes/ship";
import { createBoard } from "./components/board";
import { showAvailableShips } from "./components/startBoard";
import "./components/game";
import("./components/modal");

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
  while (modalGridDiv.firstChild) {
    modalGridDiv.removeChild(modalGridDiv.firstChild);
  }
}

function assignBoard() {
  clearBoard();
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
  createBoard(players.p1, modalGridDiv);
}

function highlightCells(cell, color, x, y, rot = true) {
  let shipToPlace = players.p1.avaiableShips.find(
    (item) => item.placed === false,
  );

  if (!shipToPlace) return false;

  let shipLen = shipToPlace.ship.length;

  x = parseInt(x);
  y = parseInt(y);

  if (x + shipLen > 10 && rot) x = 10 - shipLen;
  if (y + shipLen > 10 && !rot) y = 10 - shipLen;

  for (let i = 0; i < shipLen; i++) {
    let q;
    if (rot) {
      q = document.querySelector(`[data-row='${x + i}'][data-col='${y}']`);
    } else {
      q = document.querySelector(`[data-row='${x}'][data-col='${y + i}']`);
    }
    if (q && !q.classList.contains("cell-ship"))
      q.style.backgroundColor = color;
  }
}

rotateBtn.addEventListener("click", () => {
  rotateBtn.innerHTML = isRotate ? "Horizontal" : "Vertical";
  isRotate = !isRotate;
});

modalDiv.addEventListener("mouseover", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    highlightCells(
      cell,
      "#ffffff",
      cell.dataset.row,
      cell.dataset.col,
      isRotate,
    );
  }
});

modalDiv.addEventListener("click", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
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
  }
});

modalDiv.addEventListener("mouseout", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    highlightCells(
      cell,
      "#353535",
      cell.dataset.row,
      cell.dataset.col,
      isRotate,
    );
  }
});

showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
