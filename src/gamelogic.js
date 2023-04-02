import Ship from "./ship.js";
import { shipStore, shipFleet, gameboardArrayA } from "./index.js";
import {
  addELAddShip,
  removeAllEventListenersFromCells,
  addELforNextCells,
} from "./dom.js";

export let currentShipLength = 0;

export function addShip(cellId) {
  console.log("inside addShip");
  let retrieveShip = shipStore.pop();
  currentShipLength = retrieveShip.size;
  let newShip = new Ship(retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  shipFleet.push(newShip);
  gameboardArrayA[cellId.slice(1)].hasShip = true;
  gameboardArrayA[cellId.slice(1)].shipName = retrieveShip.name;
  addELforNextCells(cellId, currentShipLength, newShip);
}

export function addCellsToCurrentShip(cell, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  currentShip.addCoordinates(cell.id);
  gameboardArrayA[cell.id.slice(1)].hasShip = true;
  gameboardArrayA[cell.id.slice(1)].shipName = currentShip.name;
  currentShipLength--;
  if (shipFleet.length === 0) {
    return;
  } else if (currentShipLength === 1) {
    console.log("hi, the ship is already big enough");
    removeAllEventListenersFromCells();
    addELAddShip();
  } else if (currentShipLength > 1) {
    addELforNextCells(cell.id, currentShipLength, currentShip);
  }
}

export function calculateNextMove(number) {
  number = parseFloat(number);
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
    number != 0 ||
    number != 1 ||
    number != 2 ||
    number != 3 ||
    number != 4 ||
    number != 5 ||
    number != 6 ||
    number != 7 ||
    number != 8 ||
    number != 9
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
  console.log(numbersArray);
  return numbersArray;
}
