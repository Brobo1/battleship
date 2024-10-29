function compMove(player) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  player.makeHit(x, y);
}
