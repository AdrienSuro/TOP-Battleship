import Ship from "./ship.js";
import shipStore from "./index.js";
import gameboardArrayA from "./index.js";
import removeAllEventListenersFromCells from "./dom.js";
import { addELAddShip } from "./dom.js";
import addELforNextCells from "./dom.js";

function addShip(cellId) {
  let retrieveShip = shipStore.pop();
  let newShip = new Ship(retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  cellId.setAttribute("class", "hasShip");
  gameboardArrayA[cellId.slice(-1)].hasShip = true;
  gameboardArrayA[cellId.slice(-1)].shipName = retrieveShip.name;
  addELforNextCells(cellId, retrieveShip.size, retrieveShip.name);
}
//supprimer tous les EL et rajouter un EL "général" à tous les autres

//ci-dessous à retravailler !! (mer 7h33)
function addCellsToCurrentShip(previousCell, currentShipLength, newShip) {
  addCellsToCurrentShip(e);
  let nextCoord = "";
  newShip.addCoordinates(nextCoord); //mettre à jour nextCoord
  currentShipLength--;
  addELforNextCells(cellId, shipSize, shipName);
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

export { addShip, addCellsToCurrentShip };
