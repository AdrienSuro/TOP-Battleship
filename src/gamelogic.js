import player from "./player.js";
import ship from "./ship.js";
import gameboard from "./gameboard.js";
import { displayGrid } from "./dom.js";

const leftgridcontainer = document.getElementById("leftgridcontainer");
const rightgridcontainer = document.getElementById("rightgridcontainer");
console.log(leftgridcontainer);

function newGame() {
  let leftGameboard = gameboard(10);
  let leftGrid = leftGameboard.createGrid(); //is an array
  displayGrid(leftGrid, leftgridcontainer);
  let rightGameboard = gameboard(10);
  let rightGrid = rightGameboard.createGrid(); // is an array
  displayGrid(rightGrid, rightgridcontainer);
  let leftPlayer = player("user");
  let rightPlayer = player("computer");
}

newGame();
