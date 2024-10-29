export function compHit(player) {
  let hits = player.board.hits;
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  if (hits.find((hit) => hit.x === x && hit.y === y)) {
    return compHit(player);
  }
  player.makeHit(x, y);
}
