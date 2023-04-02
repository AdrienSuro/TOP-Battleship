// This will be the main JS script
//TOP: Necessary imports and global variables
import Gameboard from "./gameboard.js";
import { addELAddShip, createBothGrids } from "./dom.js";

let currentCell = undefined;
let currentShip = undefined;
let shipFleet = [];
let shipStore = [
  { name: 9, size: 1 },
  { name: 8, size: 1 },
  { name: 7, size: 1 },
  { name: 6, size: 1 },
  { name: 5, size: 2 },
  { name: 4, size: 2 },
  { name: 3, size: 2 },
  { name: 2, size: 3 },
  { name: 1, size: 3 },
  { name: 0, size: 4 },
];

// MIDDLE : Game Session :

let gameboardA = new Gameboard("a");
let gameboardB = new Gameboard("b");
let gameboardArrayA = getgameboardArrayA();
createBothGrids();
addELAddShip();

// BOTTOM : function definitions
export function getgameboardArrayA() {
  let gameboardArrayA = gameboardA.getGameboardArray();
  return gameboardArrayA;
}

export function getgameboardArrayB() {
  let gameboardArrayB = gameboardB.getGameboardArray();
  return gameboardArrayB;
}

export { currentShip, currentCell, shipStore, gameboardArrayA, shipFleet };
