import player from "./player.js";
import ship from "./ship.js";
import gameboard from "./gameboard.js";
import { displayGrid } from "./dom.js";

function startNewGame() {
  let player1 = player("user");
  let player2 = player("computer");
}

const leftgridcontainer = document.getElementById("leftgridcontainer");
const rightgridcontainer = document.getElementById("rightgridcontainer");

function newGame() {
  let leftGameboard = gameboard(10);
  let rightGameboard = gameboard(10);
  let leftGridArray = leftGameboard.createGrid(); //is an array
  let rightGridArray = rightGameboard.createGrid(); // is an array
  displayGrid(leftGridArray, leftgridcontainer, leftGameboard);
  displayGrid(rightGridArray, rightgridcontainer, rightGameboard);
  return { leftGameboard, rightGameboard, leftGridArray, rightGridArray };
}

newGame();
console.log(leftGrid);

export { rightGameboard, leftGameboard, leftGridArray, rightGridArray };
