import gameboardArrayA, { shipFleet } from "./index.js";
import {
  addShip,
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
    leftgrid.appendChild(newCell);
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

function addELforNextCells(cellId, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  if (currentShipLength <= 1) {
    if (shipFleet.length === 0) {
      return;
    }
    addELAddShip();
    return;
  }
  console.log(cellId);
  console.log(currentShipLength);
  let possibleCells = calculateNextMove(cellId.slice(1));
  removeAllEventListenersFromCells();
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`a${e}`);
    cell.removeAttribute("class", "emptyCell");
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      possibleCells.forEach((e) => {
        let cell = document.getElementById(`a${e}`);
        cell.removeAttribute("class", "highlight");
      });
      cell.setAttribute("class", "hasShip");
      console.log("inside event listener for next cell");
      addCellsToCurrentShip(cell.id, currentShipLength, currentShip);
    });
  });
}

function removeAllEventListenersFromCells() {
  //inversement, créer cet Event Listener pour toutes les cases au début
  let allLeftCells = document.getElementById("leftgridcontainer");
  allLeftCells.removeEventListener("click", (event) => {
    if (event.target.hasAttribute("class", "emptyCell")) {
      event.target.removeAttribute("class", "emptyCell");
      event.target.setAttribute("class", "hasShip");
      addShip(event.target.id);
    }
  });
}

export {
  removeAllEventListenersFromCells,
  addELAddShip,
  createBothGrids,
  addELforNextCells,
};
