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
/* harmony import */ var _gamelogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamelogic.js */ "./src/gamelogic.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./src/index.js");




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
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target.id);
    }
  });
}

function addELforNextCells(cellId, shipSize, currentShip) {
  if (_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__.currentShipLength <= 1) {
    removeAllEventListenersFromCells();
    addELAddShip();
    return;
  }
  let possibleCells = (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__.calculateNextMove)(cellId);
  removeAllEventListenersFromCells();
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      e.setAttribute("class", "hasShip");
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__.addCellsToCurrentShip)(e.id, shipSize, currentShip);
    });
  });
}

function highlightCellsAndAddEL(numbersArray, shipSize, shipName) {
  removeAllEventListenersFromCells();
  numbersArray.forEach((e) => {
    let cell = document.getElementById(`_${e}`);
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", (e) => {
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__.addCellsToCurrentShip)(e, shipSize, shipName);
    });
  });
}

function removeAllEventListenersFromCells() {
  //inversement, créer cet Event Listener pour toutes les cases au début
  let allCells = document.querySelectorAll("class", "cell");
  allCells.forEach(() => {
    removeEventListener("click", (e) => {
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e);
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__["default"])(cellId.slice(-1), currentShipLength, newShip);
}

function addCellsToCurrentShip(cell, currentShipLength, currentShip) {
  currentShip.addCoordinates(cell); // OK
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(-1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(-1)].shipName = currentShip.name;
  currentShipLength--;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__["default"])(cell, shipSize, currentShip);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  addShip,
  addCellsToCurrentShip,
  currentShipLength,
  calculateNextMove,
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWRkU2hpcCBmcm9tIFwiLi9nYW1lbG9naWMuanNcIjtcbmltcG9ydCBnYW1lYm9hcmRBcnJheUEgZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7XG4gIGFkZENlbGxzVG9DdXJyZW50U2hpcCxcbiAgY3VycmVudFNoaXBMZW5ndGgsXG4gIGNhbGN1bGF0ZU5leHRNb3ZlLFxufSBmcm9tIFwiLi9nYW1lbG9naWMuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRlQm90aEdyaWRzKCkge1xuICBsZXQgbGVmdGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRncmlkY29udGFpbmVyXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgbGV0IG5ld0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlbXB0eUNlbGxcIik7XG4gICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYSR7aX1gKTtcbiAgICBsZWZ0Z3JpZC5hcHBlbmRDaGlsZCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEVMQWRkU2hpcCgpIHtcbiAgbGV0IExlZnRBbGxFbXB0eUNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0Z3JpZGNvbnRhaW5lclwiKTtcbiAgTGVmdEFsbEVtcHR5Q2VsbHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlbXB0eUNlbGxcIikpIHtcbiAgICAgIGV2ZW50LnRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTtcbiAgICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhhc1NoaXBcIik7XG4gICAgICBhZGRTaGlwKGV2ZW50LnRhcmdldC5pZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRUxmb3JOZXh0Q2VsbHMoY2VsbElkLCBzaGlwU2l6ZSwgY3VycmVudFNoaXApIHtcbiAgaWYgKGN1cnJlbnRTaGlwTGVuZ3RoIDw9IDEpIHtcbiAgICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICAgIGFkZEVMQWRkU2hpcCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgcG9zc2libGVDZWxscyA9IGNhbGN1bGF0ZU5leHRNb3ZlKGNlbGxJZCk7XG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzKCk7XG4gIHBvc3NpYmxlQ2VsbHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYF8ke2V9YCk7XG4gICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpZ2hsaWdodFwiKTtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhhc1NoaXBcIik7XG4gICAgICBhZGRDZWxsc1RvQ3VycmVudFNoaXAoZS5pZCwgc2hpcFNpemUsIGN1cnJlbnRTaGlwKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodENlbGxzQW5kQWRkRUwobnVtYmVyc0FycmF5LCBzaGlwU2l6ZSwgc2hpcE5hbWUpIHtcbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMoKTtcbiAgbnVtYmVyc0FycmF5LmZvckVhY2goKGUpID0+IHtcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBfJHtlfWApO1xuICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaWdobGlnaHRcIik7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGFkZENlbGxzVG9DdXJyZW50U2hpcChlLCBzaGlwU2l6ZSwgc2hpcE5hbWUpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMoKSB7XG4gIC8vaW52ZXJzZW1lbnQsIGNyw6llciBjZXQgRXZlbnQgTGlzdGVuZXIgcG91ciB0b3V0ZXMgbGVzIGNhc2VzIGF1IGTDqWJ1dFxuICBsZXQgYWxsQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiY2xhc3NcIiwgXCJjZWxsXCIpO1xuICBhbGxDZWxscy5mb3JFYWNoKCgpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGFkZFNoaXAoZSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscyxcbiAgaGlnaGxpZ2h0Q2VsbHNBbmRBZGRFTCxcbiAgYWRkRUxBZGRTaGlwLFxuICBjcmVhdGVCb3RoR3JpZHMsXG4gIGFkZEVMZm9yTmV4dENlbGxzLFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICB9XG5cbiAgZ2V0R2FtZWJvYXJkQXJyYXkoKSB7XG4gICAgbGV0IGdhbWVib2FyZEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgbGV0IG5ld09iamVjdCA9IHtcbiAgICAgICAgY2VsbElkOiBgJHt0aGlzLnBsYXllcn0ke2l9YCxcbiAgICAgICAgaGFzU2hpcDogZmFsc2UsXG4gICAgICAgIHNoaXBOYW1lOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgICAgZ2FtZWJvYXJkQXJyYXkucHVzaChuZXdPYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gZ2FtZWJvYXJkQXJyYXk7XG4gIH1cbn1cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCB7IHNoaXBTdG9yZSwgc2hpcEZsZWV0LCBnYW1lYm9hcmRBcnJheUEgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzIGZyb20gXCIuL2RvbS5qc1wiO1xuaW1wb3J0IHsgYWRkRUxBZGRTaGlwIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5pbXBvcnQgYWRkRUxmb3JOZXh0Q2VsbHMgZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmxldCBjdXJyZW50U2hpcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGFkZFNoaXAoY2VsbElkKSB7XG4gIGxldCByZXRyaWV2ZVNoaXAgPSBzaGlwU3RvcmUucG9wKCk7XG4gIGN1cnJlbnRTaGlwTGVuZ3RoID0gcmV0cmlldmVTaGlwLnNpemU7XG4gIGxldCBuZXdTaGlwID0gbmV3IFNoaXAocmV0cmlldmVTaGlwLnNpemUsIHJldHJpZXZlU2hpcC5uYW1lLCBjZWxsSWQpOyAvLyAtPiBjbXQgdXBkYXRlIGN1cnJlbnRTaGlwTGVuZ3RoID9cbiAgc2hpcEZsZWV0LnB1c2gobmV3U2hpcCk7XG4gIGNlbGxJZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhhc1NoaXBcIik7XG4gIGdhbWVib2FyZEFycmF5QVtjZWxsSWQuc2xpY2UoLTEpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGxJZC5zbGljZSgtMSldLnNoaXBOYW1lID0gcmV0cmlldmVTaGlwLm5hbWU7XG4gIGFkZEVMZm9yTmV4dENlbGxzKGNlbGxJZC5zbGljZSgtMSksIGN1cnJlbnRTaGlwTGVuZ3RoLCBuZXdTaGlwKTtcbn1cblxuZnVuY3Rpb24gYWRkQ2VsbHNUb0N1cnJlbnRTaGlwKGNlbGwsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCkge1xuICBjdXJyZW50U2hpcC5hZGRDb29yZGluYXRlcyhjZWxsKTsgLy8gT0tcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGwuc2xpY2UoLTEpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGwuc2xpY2UoLTEpXS5zaGlwTmFtZSA9IGN1cnJlbnRTaGlwLm5hbWU7XG4gIGN1cnJlbnRTaGlwTGVuZ3RoLS07XG4gIGFkZEVMZm9yTmV4dENlbGxzKGNlbGwsIHNoaXBTaXplLCBjdXJyZW50U2hpcCk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZU5leHRNb3ZlKG51bWJlcikge1xuICBsZXQgbnVtYmVyc0FycmF5ID0gW107XG4gIGlmIChcbiAgICBudW1iZXIgIT0gOTAgfHxcbiAgICBudW1iZXIgIT0gOTEgfHxcbiAgICBudW1iZXIgIT0gOTIgfHxcbiAgICBudW1iZXIgIT0gOTMgfHxcbiAgICBudW1iZXIgIT0gOTQgfHxcbiAgICBudW1iZXIgIT0gOTUgfHxcbiAgICBudW1iZXIgIT0gOTYgfHxcbiAgICBudW1iZXIgIT0gOTcgfHxcbiAgICBudW1iZXIgIT0gOTggfHxcbiAgICBudW1iZXIgIT0gOTlcbiAgKSB7XG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtYmVyICsgMTApO1xuICB9XG4gIGlmIChcbiAgICBudW1iZXIgIT0gMCB8fFxuICAgIG51bWJlciAhPSAxIHx8XG4gICAgbnVtYmVyICE9IDIgfHxcbiAgICBudW1iZXIgIT0gMyB8fFxuICAgIG51bWJlciAhPSA0IHx8XG4gICAgbnVtYmVyICE9IDUgfHxcbiAgICBudW1iZXIgIT0gNiB8fFxuICAgIG51bWJlciAhPSA3IHx8XG4gICAgbnVtYmVyICE9IDggfHxcbiAgICBudW1iZXIgIT0gOVxuICApIHtcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW1iZXIgLSAxMCk7XG4gIH1cbiAgaWYgKCEobnVtYmVyICUgMTAgPT09IDApKSB7XG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtYmVyIC0gMSk7XG4gIH1cbiAgaWYgKFxuICAgIG51bWJlciAhPSA5IHx8XG4gICAgbnVtYmVyICE9IDE5IHx8XG4gICAgbnVtYmVyICE9IDI5IHx8XG4gICAgbnVtYmVyICE9IDM5IHx8XG4gICAgbnVtYmVyICE9IDQ5IHx8XG4gICAgbnVtYmVyICE9IDU5IHx8XG4gICAgbnVtYmVyICE9IDY5IHx8XG4gICAgbnVtYmVyICE9IDc5IHx8XG4gICAgbnVtYmVyICE9IDg5IHx8XG4gICAgbnVtYmVyICE9IDk5XG4gICkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciArIDEpO1xuICB9XG4gIHJldHVybiBudW1iZXJzQXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYWRkU2hpcCxcbiAgYWRkQ2VsbHNUb0N1cnJlbnRTaGlwLFxuICBjdXJyZW50U2hpcExlbmd0aCxcbiAgY2FsY3VsYXRlTmV4dE1vdmUsXG59O1xuIiwiLy8gVGhpcyB3aWxsIGJlIHRoZSBtYWluIEpTIHNjcmlwdFxuLy9UT1A6IE5lY2Vzc2FyeSBpbXBvcnRzIGFuZCBnbG9iYWwgdmFyaWFibGVzXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgYWRkRUxBZGRTaGlwIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmxldCBjdXJyZW50Q2VsbCA9IHVuZGVmaW5lZDtcbmxldCBjdXJyZW50U2hpcCA9IHVuZGVmaW5lZDtcbmxldCBzaGlwRmxlZXQgPSBbXTtcbmxldCBzaGlwU3RvcmUgPSBbXG4gIHsgbmFtZTogOSwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDgsIHNpemU6IDEgfSxcbiAgeyBuYW1lOiA3LCBzaXplOiAxIH0sXG4gIHsgbmFtZTogNiwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDUsIHNpemU6IDIgfSxcbiAgeyBuYW1lOiA0LCBzaXplOiAyIH0sXG4gIHsgbmFtZTogMywgc2l6ZTogMiB9LFxuICB7IG5hbWU6IDIsIHNpemU6IDMgfSxcbiAgeyBuYW1lOiAxLCBzaXplOiAzIH0sXG4gIHsgbmFtZTogMCwgc2l6ZTogNCB9LFxuXTtcblxuLy8gTUlERExFIDogR2FtZSBTZXNzaW9uIDpcblxubGV0IGdhbWVib2FyZEEgPSBuZXcgR2FtZWJvYXJkKFwiYVwiKTtcbmxldCBnYW1lYm9hcmRCID0gbmV3IEdhbWVib2FyZChcImJcIik7XG5sZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2V0Z2FtZWJvYXJkQXJyYXlBKCk7XG4vLyBGbiBiYXNpbmcgdXBvbiBnYW1lYm9hcmRBIGNyZWF0ZSBncmlkXG5hZGRFTEFkZFNoaXAoKTsgLy8gYWRkcyBFTCB0byB0aGUgbGVmdCBncmlkXG5cbi8vIEJPVFRPTSA6IGZ1bmN0aW9uIGRlZmluaXRpb25zXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlBKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2FtZWJvYXJkQS5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlBO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlCKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlCID0gZ2FtZWJvYXJkQi5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlCO1xufVxuXG5leHBvcnQgeyBjdXJyZW50U2hpcCwgY3VycmVudENlbGwsIHNoaXBTdG9yZSwgZ2FtZWJvYXJkQXJyYXlBLCBzaGlwRmxlZXQgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaXplLCBuYW1lLCBjZWxsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaGl0Q291bnQgPSAwO1xuICAgIHRoaXMuY29vcmQgPSBbY2VsbF07XG4gICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgfVxuICBhZGRDb29yZGluYXRlcyhjb29yZCkge1xuICAgIHRoaXMuY29vcmQucHVzaChjb29yZCk7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnQrKztcbiAgICBpZiAodGhpcy5oaXRDb3VudCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnN1bmtTaGlwKCk7XG4gICAgfVxuICB9XG4gIHN1bmtTaGlwKCkge1xuICAgIHRoaXMuaXNTdW5rID0gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lbG9naWMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=