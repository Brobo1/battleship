import "./styles.css";
import { Player } from "./classes/player";
import { showAvailableShips } from "./components/shipsLeft";
// import "./components/game";
import { createBoard } from "./components/createBoard";
import { highlightCells } from "./components/helper/highlightCell";
import { compHit } from "./components/computerHit";

const containerDiv = document.getElementById("container");
const gridsDiv = document.getElementById("grids");
const shipsDiv = document.getElementById("ships");
const rotateBtn = document.getElementById("rotate-btn");

let isRotate = true;
let isStart = false;
let listeners = false;

const players = {
  p1: new Player("Human", "human"),
  p2: new Player("Computer", "computer"),
};

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

      players.p2.placeShip();

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

    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    players.p2.makeHit(row, col);
    compHit(players.p1);
    showAvailableShips(players.p1, shipsDiv);
    showAvailableShips(players.p2, shipsDiv);
    assignBoard();
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
    compHit(players.p1);
    showAvailableShips(players.p1, shipsDiv);
    showAvailableShips(players.p2, shipsDiv);
    assignBoard();
  });
}

function startGame() {
  if (players.p1.shipsLeft() > 0) {
    startBoard();
  } else if (!isStart) {
    rotateBtn.style.display = "none";
    game();
    isStart = true;
  }
}

startGame();
showAvailableShips(players.p1, shipsDiv);
showAvailableShips(players.p2, shipsDiv);
// assignBoard();
assignBoard(players);
