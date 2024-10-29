import { Player } from "../classes/player";

export function showAvailableShips(players, divEle) {
  let availableShips = players.availableShips;
  const existingShips = divEle.querySelectorAll(`.${players.playerType} `);
  existingShips.forEach((shipDiv) => shipDiv.remove());
  let ships = document.createElement("div");
  //todo status over comp ships left
  ships.className = "ships";
  ships.classList.add(players.playerType);

  for (let i = 0; i < availableShips.length; i++) {
    let ship = document.createElement("div");
    ship.className = "ship";
    ship.draggable = true;

    for (let j = 0; j < availableShips[i].ship.length; j++) {
      let cell = document.createElement("div");

      if (players.playerType === "computer" && availableShips[i].ship.sunk) {
        cell.style.backgroundColor = "#b13838";
      } else if (
        players.playerType === "human" &&
        availableShips[i].ship.sunk
      ) {
        cell.style.backgroundColor = "#b13838";
      } else {
        cell.style.backgroundColor = "#191919";
      }
      cell.style.pointerEvents = "none";
      cell.className = "cell";
      ship.appendChild(cell);
    }
    ships.appendChild(ship);
  }
  divEle.appendChild(ships);
}
