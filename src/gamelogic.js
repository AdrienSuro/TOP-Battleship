import Ship from "./ship.js";
import shipStore from "./index.js";
import gameboardArrayA from "./index.js";

function addShip(cellId) {
  let retrieveShip = shipStore.pop();
  let newShip = new Ship(retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  cellId.setAttribute("class", "hasShip");
  gameboardArrayA[cellId.slice(-1)].hasShip = true;
  gameboardArrayA[cellId.slice(-1)].shipName = retrieveShip.name;
  let possibleCells = calculateNextMove(previousCell);
  highlightCellsAndAddEL(possibleCells);
  return newShip;
}
//supprimer tous les EL et rajouter un EL "général" à tous les autres

function addCellsToCurrentShip(
  previousCell,
  currentShipLength,
  currentShipName
) {
  // créer ici un return statement qui permet d'arrêter l'ajouter de cells et remet des EL classiques partout
  // currentShipName doit permettre d'ajouter les coordonnées de la cell au Ship en cours
  let possibleCells = calculateNextMove(previousCell);
  highlightCellsAndAddEL(possibleCells);
  currentShipLength++;
}

export { addShip, addCellsToCurrentShip };
