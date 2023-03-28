import addShip from "./gamelogic.js";
import gameboardArrayA from "./index.js";
import { addCellsToCurrentShip } from "./gamelogic.js";

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
    event.target.removeAttribute("class", "emptyCell");
    event.target.setAttribute("class", "hasShip");
    addShip(event.target.id);
    gameboardArrayA;
  });
}

function highlightCellsAndAddEL(numbersArray) {
  removeAllEventListenersFromCells(); //remove all event listeners
  numbersArray.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("id", "highlight");
    cell.addEventListener("click", (e) => {
      addCellsToCurrentShip(e);
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
};
