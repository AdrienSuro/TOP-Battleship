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
  displayGrid(leftGrid, leftgridcontainer, leftGameboard);
  let leftShipsGrid = leftGameboard.createShipsGrid();
  let rightGameboard = gameboard(10);
  let rightGrid = rightGameboard.createGrid(); // is an array
  displayGrid(rightGrid, rightgridcontainer, rightGameboard);
  let leftPlayer = player("user");
  let rightPlayer = player("computer");
  return { leftShipsGrid };
}

newGame();

//Create the ships manually :

let shipBiggest1 = ship(4);
shipBiggest1.coordinates[0] = [leftShipsGrid[0][0]];
leftGrid[0][0].hasShip = true;
leftGrid[1][0].hasShip = true;
leftGrid[2][0].hasShip = true;
leftGrid[3][0].hasShip = true;
