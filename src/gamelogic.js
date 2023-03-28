import Ship from "./ship.js";
import currentShipLength from "./index.js";
import shipNames from "./index.js"

function addShip(cellId) {
    let currentShipName = shipNames.pop()
    let newShip = new Ship(currentShipLength, currentShipName, cellId); 
    cellsArray(cellId).hasShip = newShip.shipName; //quand le coordinatesArray est usccèssivement nourri, créer un Ship sur base de cela
    cellId.setAttribute("class", "hasShip");

    let possibleCells = calculateNextMove(previousCell);
    highlightCellsAndAddEL(possibleCells);
    return newShip;
  }
  //supprimer tous les EL et rajouter un EL "général" à tous les autres
}

function addCellsToCurrentShip(previousCell, shipLength, newShip) {
  let possibleCells = calculateNextMove(previousCell);
  highlightCellsAndAddEL(possibleCells);
  currentShipLength++;
}

export { addShip, addCellsToCurrentShip };
