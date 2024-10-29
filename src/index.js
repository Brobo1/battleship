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

export function assignBoard() {
  while (gridsDiv.firstChild) {
    gridsDiv.removeChild(gridsDiv.firstChild);
  }
  for (const player in players) {
    createBoard(players[player], gridsDiv);
  }
}

function startScreen() {
  const startDiv = document.createElement("div");
  startDiv.className = "start-container";
  startDiv.style.position = "absolute";
  startDiv.style.top = "50%";
  startDiv.style.left = "50%";
  startDiv.style.transform = "translate(-50%, -50%)";
  startDiv.style.padding = "20px";
  startDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  startDiv.style.color = "#fff";
  startDiv.style.textAlign = "center";
  startDiv.style.border = "2px solid #fff";
  startDiv.style.borderRadius = "10px";
  startDiv.innerHTML = "Place your ships to start the game";

  const computerGrid = gridsDiv.querySelector("[data-player='computer']");
  computerGrid.appendChild(startDiv);
}
function hideStartScreen() {
  const startDiv = gridsDiv.querySelector(".start-container");
  if (startDiv) {
    startDiv.style.display = "none";
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
      console.log(123);
      if (cell.className !== "cell" || !cell.closest("[data-player='human']"))
        return;
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);
      let shipToPlace = players.p1.availableShips.find(
        (item) => item.placed === false,
      );

      if (shipToPlace) {
        let shipLen = shipToPlace.ship.length;

        if (isRotate) {
          players.p1.placeShip(
            row + shipLen > 10 ? 10 - shipLen : row,
            col,
            "h",
          );
        } else {
          players.p1.placeShip(
            row,
            col + shipLen > 10 ? 10 - shipLen : col,
            "v",
          );
        }

        players.p2.placeShip();
        createBoard(players.p1, gridsDiv);
        createBoard(players.p2, gridsDiv);
        // Check if all ships are placed
        if (players.p1.availableShips.every((ship) => ship.placed)) {
          hideStartScreen();
          startGame();
        }
      }
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
    if (
      (cell.className !== "cell" && cell.className !== "cell cell-ship") ||
      !cell.closest("[data-player='computer']")
    )
      return;

    cell.style.backgroundColor = "#494949";
  });

  gridsDiv.addEventListener("mouseout", (e) => {
    const cell = e.target;
    if (
      (cell.className !== "cell" && cell.className !== "cell cell-ship") ||
      !cell.closest("[data-player='computer']")
    )
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
    // assignBoard();
    createBoard(players.p1, gridsDiv);
    createBoard(players.p2, gridsDiv);
    checkWin();
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

function checkWin() {
  let winner;
  if (players.p1.board.allSunk()) {
    winner = players.p2.name;
  } else if (players.p2.board.allSunk()) {
    winner = players.p1.name;
  } else return;

  let winText = document.createElement("p");
  winText.className = "win-text";
  winText.textContent = `${winner} wins!`;

  let winDiv = document.createElement("div");
  winDiv.className = "win-container";
  winDiv.appendChild(winText);
  containerDiv.appendChild(winDiv);
}

startGame();
showAvailableShips(players.p1, shipsDiv);
showAvailableShips(players.p2, shipsDiv);
createBoard(players.p1, gridsDiv);
createBoard(players.p2, gridsDiv);
// assignBoard();
// assignBoard(players);
startScreen();
