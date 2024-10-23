import { assignBoard, createBoard } from "./board";
import { highlightCells } from "./helper/highlightCell";
import { getPlayers } from "../index";

const rotateBtn = document.getElementById("rotate-btn");
const modalDiv = document.getElementById("modal");
const modalGridDiv = document.getElementById("modal-grid");

const players = getPlayers();
let isRotate = true;

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
      players.p1,
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

    if (shipLen === 2) {
      modalDiv.style.display = "none";
    }

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
      players.p1,
      isRotate,
    );
  }
});
