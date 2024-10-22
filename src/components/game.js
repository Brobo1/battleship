import { Player } from "../classes/player.js";

const player = new Player("Guman", "human");
player.placeShip(7, 4);

console.log(player.board.board);
