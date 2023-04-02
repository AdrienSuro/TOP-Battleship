import gameboardArrayA, { shipFleet } from "./index.js";
import {
  addShip,
  addCellsToCurrentShip,
  currentShipLength,
  calculateNextMove,
} from "./gamelogic.js";

let leftgrid = document.getElementById("leftgridcontainer");
let leftgridchilds = leftgrid.childNodes;
let setShipClassFunc = {};
let addCellFunc = {};

function createBothGrids() {
  for (let i = 0; i < 100; i++) {
    let newCell = document.createElement("div");
    newCell.setAttribute("class", "emptyCell");
    newCell.setAttribute("id", `a${i}`);
    leftgrid.appendChild(newCell);
  }
}

function addELAddShip() {
  leftgrid.addEventListener("click", addShipDOM);
}

function removeAllEventListenersFromCells() {
  leftgrid.removeEventListener("click", addShipDOM);
  // leftgridchilds.forEach(() => {
  //   removeEventListener("click", addShipDOM);
  // });
  leftgridchilds.forEach(() => {
    removeEventListener("click", setShipClassFunc);
  });
  leftgridchilds.forEach(() => {
    removeEventListener("click", addCellFunc);
  });
}

function addShipDOM(event) {
  if (event.target.hasAttribute("class", "emptyCell")) {
    event.target.removeAttribute("class", "emptyCell");
    event.target.setAttribute("class", "hasShip");
    addShip(event.target.id);
  }
}

function setShipClass(x) {
  x.removeAttribute("class", "highlight");
  x.setAttribute("class", "hasShip");
}

function addELforNextCells(cellId, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  let possibleCells = calculateNextMove(cellId.slice(1));
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`a${e}`);
    cell.removeAttribute("class", "emptyCell"); //comment leur remettre le class emptyCell ensuite ?
    if (!cell.hasAttribute("class", "hasShip")) {
      cell.setAttribute("class", "highlight");
    }
    addCellFunc = () => {
      addCellsToCurrentShip(cell, currentShipLength, currentShip);
    };
    setShipClassFunc = () => {
      setShipClass(cell);
    };
    cell.addEventListener("click", setShipClassFunc);
    cell.addEventListener("click", addCellFunc);
  });
}

export {
  removeAllEventListenersFromCells,
  addELAddShip,
  createBothGrids,
  addELforNextCells,
};
