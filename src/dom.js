import addShip from "./gamelogic.js";
import gameboardArrayA from "./index.js";
import {
  addCellsToCurrentShip,
  currentShipLength,
  calculateNextMove,
} from "./gamelogic.js";

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

function addELforNextCells(cellId, shipSize, currentShip) {
  if (currentShipLength <= 1) {
    removeAllEventListenersFromCells();
    addELAddShip();
    return;
  }
  let possibleCells = calculateNextMove(cellId);
  removeAllEventListenersFromCells();
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      e.setAttribute("class", "hasShip");
      addCellsToCurrentShip(e.id, shipSize, currentShip);
    });
  });
}

function highlightCellsAndAddEL(numbersArray, shipSize, shipName) {
  removeAllEventListenersFromCells();
  numbersArray.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      addCellsToCurrentShip(e, shipSize, shipName);
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
