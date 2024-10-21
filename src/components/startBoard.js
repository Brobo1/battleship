import { Player } from "../classes/player";
import { createBoard } from "./board";

const shipsDiv = document.getElementById("ships");
const modalDiv = document.getElementById("modal-content");

let player = new Player("Human", "human");

createBoard(player, modalDiv);

export function showAvailableShips(players) {
  let availableShips = players.avaiableShips;
  let ships = document.createElement("div");
  ships.className = "ships";
  for (let i = 0; i < availableShips.length; i++) {
    let ship = document.createElement("div");
    ship.className = "ship";
    for (let j = 0; j < availableShips[i].ship.length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = "#191919";
      cell.style.pointerEvents = "none";
      ship.appendChild(cell);
    }
    ships.appendChild(ship);
  }
  modalDiv.appendChild(ships);
}

showAvailableShips(player);
