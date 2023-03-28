// This will be the main JS script
//TOP: Necessary imports and global variables
import Gameboard from "./gameboard.js";
import { addELAddShip } from "./dom.js";

let currentShipLength = 4;
let currentCell = undefined;
let currentShip = undefined;
let shipNames = [
  "corvette4",
  "corvette3",
  "corvette2",
  "corvette1",
  "submarine3",
  "submarine2",
  "submarine1",
  "cruiser2",
  "cruiser1",
  "battleship1",
];

// MIDDLE : Game Session :

let gameboardA = new Gameboard("a");
let gameboardB = new Gameboard("b");
let gameboardArrayA = getgameboardArrayA();
// Fn basing upon gameboardA create grid
addELAddShip(); // adds EL to the left grid

// BOTTOM : function definitions
export function getgameboardArrayA() {
  let gameboardArrayA = gameboardA.getGameboardArray();
  return gameboardArrayA;
}

export function getgameboardArrayB() {
  let gameboardArrayB = gameboardB.getGameboardArray();
  return gameboardArrayB;
}

export {
  currentShip,
  currentCell,
  currentShipLength,
  shipNames,
  gameboardArrayA,
};
