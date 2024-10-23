export function highlightCells(cell, color, x, y, player, rot) {
  let shipToPlace = player.availableShips.find((item) => item.placed === false);
  let gridData = document.querySelector("[data-player='human']");
  if (!shipToPlace || !gridData) return false;

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
    if (q && !q.classList.contains("cell-ship") && gridData)
      q.style.backgroundColor = color;
  }
}
