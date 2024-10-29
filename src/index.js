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

let isRotate = true;
let listeners = false;

const players = {
  p1: new Player("Human", "human"),
  p2: new Player("Computer", "computer"),
};

// players.p1.placeShip(0, 0, "h");
// players.p1.makeHit(0, 0);
// players.p1.makeHit(1, 0);

export function getPlayers() {
  return players;
}

export function assignBoard() {
  while (gridsDiv.firstChild) {
    gridsDiv.removeChild(gridsDiv.firstChild);
  }
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
}

function startBoard() {
  if (!listeners) {
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
      let shipToPlace = players.p1.availableShips.find(
        (item) => item.placed === false,
      );

      let shipLen = shipToPlace ? shipToPlace.ship.length : 0;

      if (isRotate) {
        players.p1.placeShip(row + shipLen > 10 ? 10 - shipLen : row, col, "h");
      } else {
        players.p1.placeShip(row, col + shipLen > 10 ? 10 - shipLen : col, "v");
      }

      //TODO Implement computer placement
      players.p2.placeShip(2, 2, "h");

      assignBoard();
      startGame();
    });

    rotateBtn.addEventListener("click", () => {
      rotateBtn.innerHTML = isRotate ? "Horizontal" : "Vertical";
      isRotate = !isRotate;
    });
    listeners = true;
  }
}

function game() {
  gridsDiv.addEventListener("mouseover", (e) => {
    const cell = e.target;
    if (cell.className !== "cell" || !cell.closest("[data-player='computer']"))
      return;
    cell.style.backgroundColor = "#494949";
  });

  gridsDiv.addEventListener("mouseout", (e) => {
    const cell = e.target;
    if (cell.className !== "cell" || !cell.closest("[data-player='computer']"))
      return;
    cell.style.backgroundColor = "#3c3c3c";
  });

  gridsDiv.addEventListener("click", (e) => {
    const cell = e.target;
    if (
      (cell.className !== "cell" && cell.className !== "cell cell-ship") ||
      !cell.closest("[data-player='computer']")
    )
      return;
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    players.p2.makeHit(row, col);
    console.log(row + " " + col);
    assignBoard();
  });
}

function startGame() {
  if (players.p1.shipsLeft() > 0) {
    startBoard();
    // gridsDiv.removeEventListener("click", (e) => {});
  } else game();
}

startGame();
showAvailableShips(players.p1, shipsDiv);
// assignBoard();
assignBoard(players);
