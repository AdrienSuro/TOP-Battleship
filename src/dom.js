import addShip from "./gamelogic.js";
import gameboardArrayA from "./index.js";
import { addCellsToCurrentShip } from "./gamelogic.js";
import calculateNextMove from "./gamelogic.js";

function createBothGrids() {
  let leftgrid = document.getElementById("leftgridcontainer");
  for (let i = 0; i < 100; i++) {
    let newCell = document.createElement("div");
    newCell.setAttribute("class", "emptyCell");
    newCell.setAttribute("id", `a${i}`);
    leftgrid.appendChild();
  }
}

function addELAddShip() {
  let LeftAllEmptyCells = document.getElementById("leftgridcontainer");
  LeftAllEmptyCells.addEventListener("click", (event) => {
    if (event.target.hasAttribute("class", "emptyCell")) {
      event.target.removeAttribute("class", "emptyCell");
      event.target.setAttribute("class", "hasShip");
      addShip(event.target.id);
    }
  });
}

//retravailler pour faire passer tous les arguments d'une fct à l'autre
function addELforNextCells(cellId, shipSize, shipName) {
  if (currentShipLength <= 1) {
    removeAllEventListenersFromCells();
    addELAddShip();
    return;
  }
  let possibleCells = calculateNextMove(previousCell);
  highlightCellsAndAddEL(possibleCells);
}

// mettre le contenu de la fct ci-dessous, dans la fct ci-dessus
function highlightCellsAndAddEL(numbersArray) {
  removeAllEventListenersFromCells(); //remove all event listeners
  numbersArray.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("id", "highlight");
    cell.addEventListener("click", (e) => {
      addCellsToCurrentShip(e, shipSize, shipName);
      let nextCoord = "";
      newShip.addCoordinates(nextCoord); //mettre à jour nextCoord
      currentShipLength--;
      addCellsToCurrentShip(previousCell, currentShipLength, newShip);
    });
  });
}

function removeAllEventListenersFromCells() {
  //inversement, créer cet Event Listener pour toutes les cases au début
  let allCells = document.querySelectorAll("class", "cell");
  allCells.forEach(() => {
    removeEventListener("click", (e) => {
      addShip(e);
    });
  });
}

export {
  removeAllEventListenersFromCells,
  highlightCellsAndAddEL,
  addELAddShip,
  createBothGrids,
  addELforNextCells,
};
