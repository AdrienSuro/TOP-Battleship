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
  LeftAllEmptyCells.addEventListener("click", addShipDOM);
}

function removeAllEventListenersFromCells() {
  let LeftAllEmptyCells = document.getElementById("leftgridcontainer");
  LeftAllEmptyCells.removeEventListener("click", addShipDOM);
  LeftAllEmptyCells.removeEventListener("click", addCellsToCurrentShip);
}

function addShipDOM(event) {
  if (event.target.hasAttribute("class", "emptyCell")) {
    event.target.removeAttribute("class", "emptyCell");
    event.target.setAttribute("class", "hasShip");
    addShip(event.target.id);
  }
}

function addELforNextCells(cellId, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  let possibleCells = calculateNextMove(cellId.slice(1));
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`a${e}`);
    cell.removeAttribute("class", "emptyCell"); //comment leur remettre le class emptyCell ensuite ?
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", () => {
      cell.removeAttribute("class", "highlight");
      cell.setAttribute("class", "hasShip");
      console.log(`cell ${cell.id} has been clicked to add to Ship`);
      addCellsToCurrentShip(cell.id, currentShipLength, currentShip);
    });
  });
}

export {
  removeAllEventListenersFromCells,
  addELAddShip,
  createBothGrids,
  addELforNextCells,
};
