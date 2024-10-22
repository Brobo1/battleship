import "./styles.css";
import { Player } from "./classes/player";
import { Ship } from "./classes/ship";
import { createBoard } from "./components/board";
import { showAvailableShips } from "./components/startBoard";
import "./components/game";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");
const rotateBtn = document.getElementById("rotate-btn");

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

function highlightCells(cell, color, x, y, rot = true) {
  let coord = { x: cell.dataset.row, y: cell.dataset.col };
  let shipLen = players.p1.avaiableShips.find((item) => item.placed === false)
    .ship.length;
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

gridsDiv.addEventListener("mouseover", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    highlightCells(cell, "#ffffff", cell.dataset.row, cell.dataset.col, false);
  }
});

gridsDiv.addEventListener("click", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    players.p1.placeShip(row, col, "h");
    assignBoard();
  }
});

gridsDiv.addEventListener("mouseout", (e) => {
  const cell = e.target;
  if (cell.className === "cell") {
    highlightCells(cell, "#353535", cell.dataset.row, cell.dataset.col, false);
  }
});

showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
