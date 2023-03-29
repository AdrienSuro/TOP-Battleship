// This will be the main JS script
//TOP: Necessary imports and global variables
import Gameboard from "./gameboard.js";
import { addELAddShip } from "./dom.js";

let currentCell = undefined;
let currentShip = undefined;
let shipStore = [
  { name: "corvette4", size: 1 },
  { name: "corvette3", size: 1 },
  { name: "corvette2", size: 1 },
  { name: "corvette1", size: 1 },
  { name: "submarine3", size: 2 },
  { name: "submarine2", size: 2 },
  { name: "submarine1", size: 2 },
  { name: "cruiser2", size: 3 },
  { name: "cruiser1", size: 3 },
  { name: "battleship1", size: 4 },
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
  shipStore,
  gameboardArrayA,
};
