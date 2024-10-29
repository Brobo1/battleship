export function createBoard(player, divEle) {
  let grid = divEle.querySelector(`[data-player="${player.playerType}"]`);
  if (!grid) {
    grid = document.createElement("div");
    grid.className = "grid";
    grid.dataset.player = player.playerType;
    divEle.appendChild(grid);
  }
  grid.innerHTML = "";

  for (let i = 0; i < player.board.width; i++) {
    let row = document.createElement("div");
    row.className = "row";

    for (let j = 0; j < player.board.length; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${player.playerType}-${i}-${j}`;
      cell.dataset.row = i.toString();
      cell.dataset.col = j.toString();

      let hits = player.board.hits.find((hit) => hit.x === i && hit.y === j);

      if (player.board.board[i][j]) {
        cell.classList.add("cell-ship");
        if (hits && hits.hit) {
          cell.classList.add("cell-hit");
          cell.style.backgroundColor = "#b13838";
          cell.innerHTML = "X";
        } else {
          if (player.playerType === "human")
            cell.style.backgroundColor = "#191919";
        }
      } else if (hits && !hits.hit) {
        cell.classList.add("cell-miss");
        cell.style.backgroundColor = "#b13838";
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  divEle.appendChild(grid);
}
