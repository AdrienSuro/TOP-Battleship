import Ship from "./ship.js";
import {shipStore, shipFleet, gameboardArrayA} from "./index.js";
import removeAllEventListenersFromCells from "./dom.js";
import { addELAddShip } from "./dom.js";
import addELforNextCells from "./dom.js";

let currentShipLength = 0;

function addShip(cellId) {
  let retrieveShip = shipStore.pop();
  currentShipLength = retrieveShip.size;
  let newShip = new Ship(retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  shipFleet.push(newShip);
  cellId.setAttribute("class", "hasShip");
  gameboardArrayA[cellId.slice(-1)].hasShip = true;
  gameboardArrayA[cellId.slice(-1)].shipName = retrieveShip.name;
  addELforNextCells(cellId.slice(-1), currentShipLength, retrieveShip.name);
}

function addCellsToCurrentShip(cell, currentShipLength, newShip) {
  currentShip.addCoordinates(cell) // OK 
  
  newShip.addCoordinates(nextCoord); //mettre à jour nextCoord
  currentShipLength--;
  addELforNextCells(cell, shipSize, shipName);
}

function calculateNextMove(number) {
  let numbersArray = [];
  if (
    number != 90 ||
    number != 91 ||
    number != 92 ||
    number != 93 ||
    number != 94 ||
    number != 95 ||
    number != 96 ||
    number != 97 ||
    number != 98 ||
    number != 99
  ) {
    numbersArray.push(number + 10);
  }
  if (
    number != 00 ||
    number != 01 ||
    number != 02 ||
    number != 03 ||
    number != 04 ||
    number != 05 ||
    number != 06 ||
    number != 07 ||
    number != 08 ||
    number != 09
  ) {
    numbersArray.push(number - 10);
  }
  if (!(number % 10 === 0)) {
    numbersArray.push(number - 1);
  }
  if (
    number != 9 ||
    number != 19 ||
    number != 29 ||
    number != 39 ||
    number != 49 ||
    number != 59 ||
    number != 69 ||
    number != 79 ||
    number != 89 ||
    number != 99
  ) {
    numbersArray.push(number + 1);
  }
  return numbersArray;
}

export { addShip, addCellsToCurrentShip, currentShipLength };
