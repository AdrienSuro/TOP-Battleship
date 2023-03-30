/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addELAddShip": () => (/* binding */ addELAddShip),
/* harmony export */   "addELforNextCells": () => (/* binding */ addELforNextCells),
/* harmony export */   "createBothGrids": () => (/* binding */ createBothGrids),
/* harmony export */   "highlightCellsAndAddEL": () => (/* binding */ highlightCellsAndAddEL),
/* harmony export */   "removeAllEventListenersFromCells": () => (/* binding */ removeAllEventListenersFromCells)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _gamelogic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gamelogic.js */ "./src/gamelogic.js");



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
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addShip)(event.target.id);
    }
  });
}

function addELforNextCells(cellId, shipSize, currentShip) {
  if (_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.currentShipLength <= 1) {
    removeAllEventListenersFromCells();
    if (_index_js__WEBPACK_IMPORTED_MODULE_0__.shipFleet.length === 0) {
      return;
    }
    addELAddShip();
    return;
  }
  let possibleCells = (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.calculateNextMove)(cellId);
  removeAllEventListenersFromCells();
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      e.setAttribute("class", "hasShip");
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addCellsToCurrentShip)(e.id, shipSize, currentShip);
    });
  });
}

function highlightCellsAndAddEL(numbersArray, shipSize, shipName) {
  removeAllEventListenersFromCells();
  numbersArray.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addCellsToCurrentShip)(e, shipSize, shipName);
    });
  });
}

function removeAllEventListenersFromCells() {
  //inversement, créer cet Event Listener pour toutes les cases au début
  let allCells = document.querySelectorAll("class", "cell");
  allCells.forEach(() => {
    removeEventListener("click", (e) => {
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addShip)(e);
    });
  });
}




/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
class Gameboard {
  constructor(player) {
    this.player = player;
  }

  getGameboardArray() {
    let gameboardArray = [];
    for (let i = 0; i < 100; i++) {
      let newObject = {
        cellId: `${this.player}${i}`,
        hasShip: false,
        shipName: undefined,
      };
      gameboardArray.push(newObject);
    }
    return gameboardArray;
  }
}


/***/ }),

/***/ "./src/gamelogic.js":
/*!**************************!*\
  !*** ./src/gamelogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCellsToCurrentShip": () => (/* binding */ addCellsToCurrentShip),
/* harmony export */   "addShip": () => (/* binding */ addShip),
/* harmony export */   "calculateNextMove": () => (/* binding */ calculateNextMove),
/* harmony export */   "currentShipLength": () => (/* binding */ currentShipLength)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");




let currentShipLength = 0;

function addShip(cellId) {
  let retrieveShip = _index_js__WEBPACK_IMPORTED_MODULE_1__.shipStore.pop();
  currentShipLength = retrieveShip.size;
  let newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  _index_js__WEBPACK_IMPORTED_MODULE_1__.shipFleet.push(newShip);
  cellId.setAttribute("class", "hasShip");
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cellId.slice(-1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cellId.slice(-1)].shipName = retrieveShip.name;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELforNextCells)(cellId.slice(-1), currentShipLength, newShip);
}

function addCellsToCurrentShip(cell, currentShipLength, currentShip) {
  currentShip.addCoordinates(cell); // OK
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(-1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(-1)].shipName = currentShip.name;
  currentShipLength--;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELforNextCells)(cell, shipSize, currentShip);
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
  return numbersArray;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentCell": () => (/* binding */ currentCell),
/* harmony export */   "currentShip": () => (/* binding */ currentShip),
/* harmony export */   "gameboardArrayA": () => (/* binding */ gameboardArrayA),
/* harmony export */   "getgameboardArrayA": () => (/* binding */ getgameboardArrayA),
/* harmony export */   "getgameboardArrayB": () => (/* binding */ getgameboardArrayB),
/* harmony export */   "shipFleet": () => (/* binding */ shipFleet),
/* harmony export */   "shipStore": () => (/* binding */ shipStore)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
// This will be the main JS script
//TOP: Necessary imports and global variables



let currentCell = undefined;
let currentShip = undefined;
let shipFleet = [];
let shipStore = [
  { name: 9, size: 1 },
  { name: 8, size: 1 },
  { name: 7, size: 1 },
  { name: 6, size: 1 },
  { name: 5, size: 2 },
  { name: 4, size: 2 },
  { name: 3, size: 2 },
  { name: 2, size: 3 },
  { name: 1, size: 3 },
  { name: 0, size: 4 },
];

// MIDDLE : Game Session :

let gameboardA = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]("a");
let gameboardB = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__["default"]("b");
let gameboardArrayA = getgameboardArrayA();
// Fn basing upon gameboardA create grid
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.addELAddShip)(); // adds EL to the left grid

// BOTTOM : function definitions
function getgameboardArrayA() {
  let gameboardArrayA = gameboardA.getGameboardArray();
  return gameboardArrayA;
}

function getgameboardArrayB() {
  let gameboardArrayB = gameboardB.getGameboardArray();
  return gameboardArrayB;
}




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(size, name, cell) {
    this.name = name;
    this.size = size;
    this.hitCount = 0;
    this.coord = [cell];
    this.isSunk = false;
  }
  addCoordinates(coord) {
    this.coord.push(coord);
  }
  hit() {
    this.hitCount++;
    if (this.hitCount === this.size) {
      this.sunkShip();
    }
  }
  sunkShip() {
    this.isSunk = true;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gamelogic.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvZ2ljLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVib2FyZEFycmF5QSwgeyBzaGlwRmxlZXQgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHtcbiAgYWRkU2hpcCxcbiAgYWRkQ2VsbHNUb0N1cnJlbnRTaGlwLFxuICBjdXJyZW50U2hpcExlbmd0aCxcbiAgY2FsY3VsYXRlTmV4dE1vdmUsXG59IGZyb20gXCIuL2dhbWVsb2dpYy5qc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVCb3RoR3JpZHMoKSB7XG4gIGxldCBsZWZ0Z3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTtcbiAgICBuZXdDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhJHtpfWApO1xuICAgIGxlZnRncmlkLmFwcGVuZENoaWxkKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkRUxBZGRTaGlwKCkge1xuICBsZXQgTGVmdEFsbEVtcHR5Q2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRncmlkY29udGFpbmVyXCIpO1xuICBMZWZ0QWxsRW1wdHlDZWxscy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKSkge1xuICAgICAgZXZlbnQudGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZW1wdHlDZWxsXCIpO1xuICAgICAgZXZlbnQudGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGFzU2hpcFwiKTtcbiAgICAgIGFkZFNoaXAoZXZlbnQudGFyZ2V0LmlkKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFTGZvck5leHRDZWxscyhjZWxsSWQsIHNoaXBTaXplLCBjdXJyZW50U2hpcCkge1xuICBpZiAoY3VycmVudFNoaXBMZW5ndGggPD0gMSkge1xuICAgIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzKCk7XG4gICAgaWYgKHNoaXBGbGVldC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYWRkRUxBZGRTaGlwKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBwb3NzaWJsZUNlbGxzID0gY2FsY3VsYXRlTmV4dE1vdmUoY2VsbElkKTtcbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMoKTtcbiAgcG9zc2libGVDZWxscy5mb3JFYWNoKChlKSA9PiB7XG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgXyR7ZX1gKTtcbiAgICBjZWxsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGlnaGxpZ2h0XCIpO1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGFzU2hpcFwiKTtcbiAgICAgIGFkZENlbGxzVG9DdXJyZW50U2hpcChlLmlkLCBzaGlwU2l6ZSwgY3VycmVudFNoaXApO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0Q2VsbHNBbmRBZGRFTChudW1iZXJzQXJyYXksIHNoaXBTaXplLCBzaGlwTmFtZSkge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICBudW1iZXJzQXJyYXkuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYF8ke2V9YCk7XG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpZ2hsaWdodFwiKTtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgYWRkQ2VsbHNUb0N1cnJlbnRTaGlwKGUsIHNoaXBTaXplLCBzaGlwTmFtZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpIHtcbiAgLy9pbnZlcnNlbWVudCwgY3LDqWVyIGNldCBFdmVudCBMaXN0ZW5lciBwb3VyIHRvdXRlcyBsZXMgY2FzZXMgYXUgZMOpYnV0XG4gIGxldCBhbGxDZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJjbGFzc1wiLCBcImNlbGxcIik7XG4gIGFsbENlbGxzLmZvckVhY2goKCkgPT4ge1xuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgYWRkU2hpcChlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzLFxuICBoaWdobGlnaHRDZWxsc0FuZEFkZEVMLFxuICBhZGRFTEFkZFNoaXAsXG4gIGNyZWF0ZUJvdGhHcmlkcyxcbiAgYWRkRUxmb3JOZXh0Q2VsbHMsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gIH1cblxuICBnZXRHYW1lYm9hcmRBcnJheSgpIHtcbiAgICBsZXQgZ2FtZWJvYXJkQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBsZXQgbmV3T2JqZWN0ID0ge1xuICAgICAgICBjZWxsSWQ6IGAke3RoaXMucGxheWVyfSR7aX1gLFxuICAgICAgICBoYXNTaGlwOiBmYWxzZSxcbiAgICAgICAgc2hpcE5hbWU6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBnYW1lYm9hcmRBcnJheS5wdXNoKG5ld09iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBnYW1lYm9hcmRBcnJheTtcbiAgfVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHsgc2hpcFN0b3JlLCBzaGlwRmxlZXQsIGdhbWVib2FyZEFycmF5QSB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscyxcbiAgYWRkRUxBZGRTaGlwLFxuICBhZGRFTGZvck5leHRDZWxscyxcbn0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmV4cG9ydCBsZXQgY3VycmVudFNoaXBMZW5ndGggPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2hpcChjZWxsSWQpIHtcbiAgbGV0IHJldHJpZXZlU2hpcCA9IHNoaXBTdG9yZS5wb3AoKTtcbiAgY3VycmVudFNoaXBMZW5ndGggPSByZXRyaWV2ZVNoaXAuc2l6ZTtcbiAgbGV0IG5ld1NoaXAgPSBuZXcgU2hpcChyZXRyaWV2ZVNoaXAuc2l6ZSwgcmV0cmlldmVTaGlwLm5hbWUsIGNlbGxJZCk7IC8vIC0+IGNtdCB1cGRhdGUgY3VycmVudFNoaXBMZW5ndGggP1xuICBzaGlwRmxlZXQucHVzaChuZXdTaGlwKTtcbiAgY2VsbElkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGFzU2hpcFwiKTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGxJZC5zbGljZSgtMSldLmhhc1NoaXAgPSB0cnVlO1xuICBnYW1lYm9hcmRBcnJheUFbY2VsbElkLnNsaWNlKC0xKV0uc2hpcE5hbWUgPSByZXRyaWV2ZVNoaXAubmFtZTtcbiAgYWRkRUxmb3JOZXh0Q2VsbHMoY2VsbElkLnNsaWNlKC0xKSwgY3VycmVudFNoaXBMZW5ndGgsIG5ld1NoaXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2VsbHNUb0N1cnJlbnRTaGlwKGNlbGwsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCkge1xuICBjdXJyZW50U2hpcC5hZGRDb29yZGluYXRlcyhjZWxsKTsgLy8gT0tcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGwuc2xpY2UoLTEpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGwuc2xpY2UoLTEpXS5zaGlwTmFtZSA9IGN1cnJlbnRTaGlwLm5hbWU7XG4gIGN1cnJlbnRTaGlwTGVuZ3RoLS07XG4gIGFkZEVMZm9yTmV4dENlbGxzKGNlbGwsIHNoaXBTaXplLCBjdXJyZW50U2hpcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVOZXh0TW92ZShudW1iZXIpIHtcbiAgbGV0IG51bWJlcnNBcnJheSA9IFtdO1xuICBpZiAoXG4gICAgbnVtYmVyICE9IDkwIHx8XG4gICAgbnVtYmVyICE9IDkxIHx8XG4gICAgbnVtYmVyICE9IDkyIHx8XG4gICAgbnVtYmVyICE9IDkzIHx8XG4gICAgbnVtYmVyICE9IDk0IHx8XG4gICAgbnVtYmVyICE9IDk1IHx8XG4gICAgbnVtYmVyICE9IDk2IHx8XG4gICAgbnVtYmVyICE9IDk3IHx8XG4gICAgbnVtYmVyICE9IDk4IHx8XG4gICAgbnVtYmVyICE9IDk5XG4gICkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciArIDEwKTtcbiAgfVxuICBpZiAoXG4gICAgbnVtYmVyICE9IDAgfHxcbiAgICBudW1iZXIgIT0gMSB8fFxuICAgIG51bWJlciAhPSAyIHx8XG4gICAgbnVtYmVyICE9IDMgfHxcbiAgICBudW1iZXIgIT0gNCB8fFxuICAgIG51bWJlciAhPSA1IHx8XG4gICAgbnVtYmVyICE9IDYgfHxcbiAgICBudW1iZXIgIT0gNyB8fFxuICAgIG51bWJlciAhPSA4IHx8XG4gICAgbnVtYmVyICE9IDlcbiAgKSB7XG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtYmVyIC0gMTApO1xuICB9XG4gIGlmICghKG51bWJlciAlIDEwID09PSAwKSkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciAtIDEpO1xuICB9XG4gIGlmIChcbiAgICBudW1iZXIgIT0gOSB8fFxuICAgIG51bWJlciAhPSAxOSB8fFxuICAgIG51bWJlciAhPSAyOSB8fFxuICAgIG51bWJlciAhPSAzOSB8fFxuICAgIG51bWJlciAhPSA0OSB8fFxuICAgIG51bWJlciAhPSA1OSB8fFxuICAgIG51bWJlciAhPSA2OSB8fFxuICAgIG51bWJlciAhPSA3OSB8fFxuICAgIG51bWJlciAhPSA4OSB8fFxuICAgIG51bWJlciAhPSA5OVxuICApIHtcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW1iZXIgKyAxKTtcbiAgfVxuICByZXR1cm4gbnVtYmVyc0FycmF5O1xufVxuIiwiLy8gVGhpcyB3aWxsIGJlIHRoZSBtYWluIEpTIHNjcmlwdFxuLy9UT1A6IE5lY2Vzc2FyeSBpbXBvcnRzIGFuZCBnbG9iYWwgdmFyaWFibGVzXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgYWRkRUxBZGRTaGlwIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmxldCBjdXJyZW50Q2VsbCA9IHVuZGVmaW5lZDtcbmxldCBjdXJyZW50U2hpcCA9IHVuZGVmaW5lZDtcbmxldCBzaGlwRmxlZXQgPSBbXTtcbmxldCBzaGlwU3RvcmUgPSBbXG4gIHsgbmFtZTogOSwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDgsIHNpemU6IDEgfSxcbiAgeyBuYW1lOiA3LCBzaXplOiAxIH0sXG4gIHsgbmFtZTogNiwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDUsIHNpemU6IDIgfSxcbiAgeyBuYW1lOiA0LCBzaXplOiAyIH0sXG4gIHsgbmFtZTogMywgc2l6ZTogMiB9LFxuICB7IG5hbWU6IDIsIHNpemU6IDMgfSxcbiAgeyBuYW1lOiAxLCBzaXplOiAzIH0sXG4gIHsgbmFtZTogMCwgc2l6ZTogNCB9LFxuXTtcblxuLy8gTUlERExFIDogR2FtZSBTZXNzaW9uIDpcblxubGV0IGdhbWVib2FyZEEgPSBuZXcgR2FtZWJvYXJkKFwiYVwiKTtcbmxldCBnYW1lYm9hcmRCID0gbmV3IEdhbWVib2FyZChcImJcIik7XG5sZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2V0Z2FtZWJvYXJkQXJyYXlBKCk7XG4vLyBGbiBiYXNpbmcgdXBvbiBnYW1lYm9hcmRBIGNyZWF0ZSBncmlkXG5hZGRFTEFkZFNoaXAoKTsgLy8gYWRkcyBFTCB0byB0aGUgbGVmdCBncmlkXG5cbi8vIEJPVFRPTSA6IGZ1bmN0aW9uIGRlZmluaXRpb25zXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlBKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2FtZWJvYXJkQS5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlBO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlCKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlCID0gZ2FtZWJvYXJkQi5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlCO1xufVxuXG5leHBvcnQgeyBjdXJyZW50U2hpcCwgY3VycmVudENlbGwsIHNoaXBTdG9yZSwgZ2FtZWJvYXJkQXJyYXlBLCBzaGlwRmxlZXQgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaXplLCBuYW1lLCBjZWxsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaGl0Q291bnQgPSAwO1xuICAgIHRoaXMuY29vcmQgPSBbY2VsbF07XG4gICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgfVxuICBhZGRDb29yZGluYXRlcyhjb29yZCkge1xuICAgIHRoaXMuY29vcmQucHVzaChjb29yZCk7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnQrKztcbiAgICBpZiAodGhpcy5oaXRDb3VudCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnN1bmtTaGlwKCk7XG4gICAgfVxuICB9XG4gIHN1bmtTaGlwKCkge1xuICAgIHRoaXMuaXNTdW5rID0gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lbG9naWMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=