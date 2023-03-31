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
  LeftAllEmptyCells.removeEventListener("click", _gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addCellsToCurrentShip);
}

function addShipDOM(event) {
  if (event.target.hasAttribute("class", "emptyCell")) {
    event.target.removeAttribute("class", "emptyCell");
    event.target.setAttribute("class", "hasShip");
    (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addShip)(event.target.id);
  }
}

function addELforNextCells(cellId, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  let possibleCells = (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.calculateNextMove)(cellId.slice(1));
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`a${e}`);
    cell.removeAttribute("class", "emptyCell"); //comment leur remettre le class emptyCell ensuite ?
    cell.setAttribute("class", "highlight");
    cell.addEventListener("click", () => {
      cell.removeAttribute("class", "highlight");
      cell.setAttribute("class", "hasShip");
      console.log(`cell ${cell.id} has been clicked to add to Ship`);
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addCellsToCurrentShip)(cell.id, currentShipLength, currentShip);
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
  console.log("inside addShip");
  let retrieveShip = _index_js__WEBPACK_IMPORTED_MODULE_1__.shipStore.pop();
  currentShipLength = retrieveShip.size;
  let newShip = new _ship_js__WEBPACK_IMPORTED_MODULE_0__["default"](retrieveShip.size, retrieveShip.name, cellId); // -> cmt update currentShipLength ?
  _index_js__WEBPACK_IMPORTED_MODULE_1__.shipFleet.push(newShip);
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cellId.slice(1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cellId.slice(1)].shipName = retrieveShip.name;
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELforNextCells)(cellId, currentShipLength, newShip);
}

function addCellsToCurrentShip(cell, currentShipLength, currentShip) {
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.removeAllEventListenersFromCells)();
  currentShip.addCoordinates(cell); // OK
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.slice(1)].shipName = currentShip.name;
  currentShipLength--; // à ce point là, ok on a un bateau de 4 cells qui n'invoque pas ADDSHIP
  if (_index_js__WEBPACK_IMPORTED_MODULE_1__.shipFleet.length === 0) {
    return;
  } else if (currentShipLength === 1) {
    console.log(_index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA);
    console.log(_index_js__WEBPACK_IMPORTED_MODULE_1__.shipFleet);
    console.log(_index_js__WEBPACK_IMPORTED_MODULE_1__.shipStore);
    console.log("hi, the ship is already big enough");
    // removeAllEventListenersFromCells();
    // addELAddShip();
  } else if (currentShipLength > 1) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELforNextCells)(cell, currentShipLength, currentShip);
  }
}

function calculateNextMove(number) {
  number = parseFloat(number);
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
  console.log(numbersArray);
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
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.createBothGrids)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVsb2dpYy5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lYm9hcmRBcnJheUEsIHsgc2hpcEZsZWV0IH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7XG4gIGFkZFNoaXAsXG4gIGFkZENlbGxzVG9DdXJyZW50U2hpcCxcbiAgY3VycmVudFNoaXBMZW5ndGgsXG4gIGNhbGN1bGF0ZU5leHRNb3ZlLFxufSBmcm9tIFwiLi9nYW1lbG9naWMuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRlQm90aEdyaWRzKCkge1xuICBsZXQgbGVmdGdyaWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnRncmlkY29udGFpbmVyXCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgbGV0IG5ld0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlbXB0eUNlbGxcIik7XG4gICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYSR7aX1gKTtcbiAgICBsZWZ0Z3JpZC5hcHBlbmRDaGlsZChuZXdDZWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRFTEFkZFNoaXAoKSB7XG4gIGxldCBMZWZ0QWxsRW1wdHlDZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG4gIExlZnRBbGxFbXB0eUNlbGxzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRTaGlwRE9NKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMoKSB7XG4gIGxldCBMZWZ0QWxsRW1wdHlDZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG4gIExlZnRBbGxFbXB0eUNlbGxzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhZGRTaGlwRE9NKTtcbiAgTGVmdEFsbEVtcHR5Q2VsbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZENlbGxzVG9DdXJyZW50U2hpcCk7XG59XG5cbmZ1bmN0aW9uIGFkZFNoaXBET00oZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKSkge1xuICAgIGV2ZW50LnRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTtcbiAgICBldmVudC50YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoYXNTaGlwXCIpO1xuICAgIGFkZFNoaXAoZXZlbnQudGFyZ2V0LmlkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRFTGZvck5leHRDZWxscyhjZWxsSWQsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCkge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICBsZXQgcG9zc2libGVDZWxscyA9IGNhbGN1bGF0ZU5leHRNb3ZlKGNlbGxJZC5zbGljZSgxKSk7XG4gIHBvc3NpYmxlQ2VsbHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGEke2V9YCk7XG4gICAgY2VsbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTsgLy9jb21tZW50IGxldXIgcmVtZXR0cmUgbGUgY2xhc3MgZW1wdHlDZWxsIGVuc3VpdGUgP1xuICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaWdobGlnaHRcIik7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY2VsbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhpZ2hsaWdodFwiKTtcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoYXNTaGlwXCIpO1xuICAgICAgY29uc29sZS5sb2coYGNlbGwgJHtjZWxsLmlkfSBoYXMgYmVlbiBjbGlja2VkIHRvIGFkZCB0byBTaGlwYCk7XG4gICAgICBhZGRDZWxsc1RvQ3VycmVudFNoaXAoY2VsbC5pZCwgY3VycmVudFNoaXBMZW5ndGgsIGN1cnJlbnRTaGlwKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7XG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzLFxuICBhZGRFTEFkZFNoaXAsXG4gIGNyZWF0ZUJvdGhHcmlkcyxcbiAgYWRkRUxmb3JOZXh0Q2VsbHMsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gIH1cblxuICBnZXRHYW1lYm9hcmRBcnJheSgpIHtcbiAgICBsZXQgZ2FtZWJvYXJkQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBsZXQgbmV3T2JqZWN0ID0ge1xuICAgICAgICBjZWxsSWQ6IGAke3RoaXMucGxheWVyfSR7aX1gLFxuICAgICAgICBoYXNTaGlwOiBmYWxzZSxcbiAgICAgICAgc2hpcE5hbWU6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBnYW1lYm9hcmRBcnJheS5wdXNoKG5ld09iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBnYW1lYm9hcmRBcnJheTtcbiAgfVxufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHsgc2hpcFN0b3JlLCBzaGlwRmxlZXQsIGdhbWVib2FyZEFycmF5QSB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscyxcbiAgYWRkRUxBZGRTaGlwLFxuICBhZGRFTGZvck5leHRDZWxscyxcbn0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmV4cG9ydCBsZXQgY3VycmVudFNoaXBMZW5ndGggPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2hpcChjZWxsSWQpIHtcbiAgY29uc29sZS5sb2coXCJpbnNpZGUgYWRkU2hpcFwiKTtcbiAgbGV0IHJldHJpZXZlU2hpcCA9IHNoaXBTdG9yZS5wb3AoKTtcbiAgY3VycmVudFNoaXBMZW5ndGggPSByZXRyaWV2ZVNoaXAuc2l6ZTtcbiAgbGV0IG5ld1NoaXAgPSBuZXcgU2hpcChyZXRyaWV2ZVNoaXAuc2l6ZSwgcmV0cmlldmVTaGlwLm5hbWUsIGNlbGxJZCk7IC8vIC0+IGNtdCB1cGRhdGUgY3VycmVudFNoaXBMZW5ndGggP1xuICBzaGlwRmxlZXQucHVzaChuZXdTaGlwKTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGxJZC5zbGljZSgxKV0uaGFzU2hpcCA9IHRydWU7XG4gIGdhbWVib2FyZEFycmF5QVtjZWxsSWQuc2xpY2UoMSldLnNoaXBOYW1lID0gcmV0cmlldmVTaGlwLm5hbWU7XG4gIGFkZEVMZm9yTmV4dENlbGxzKGNlbGxJZCwgY3VycmVudFNoaXBMZW5ndGgsIG5ld1NoaXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2VsbHNUb0N1cnJlbnRTaGlwKGNlbGwsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCkge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICBjdXJyZW50U2hpcC5hZGRDb29yZGluYXRlcyhjZWxsKTsgLy8gT0tcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGwuc2xpY2UoMSldLmhhc1NoaXAgPSB0cnVlO1xuICBnYW1lYm9hcmRBcnJheUFbY2VsbC5zbGljZSgxKV0uc2hpcE5hbWUgPSBjdXJyZW50U2hpcC5uYW1lO1xuICBjdXJyZW50U2hpcExlbmd0aC0tOyAvLyDDoCBjZSBwb2ludCBsw6AsIG9rIG9uIGEgdW4gYmF0ZWF1IGRlIDQgY2VsbHMgcXVpIG4naW52b3F1ZSBwYXMgQUREU0hJUFxuICBpZiAoc2hpcEZsZWV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmIChjdXJyZW50U2hpcExlbmd0aCA9PT0gMSkge1xuICAgIGNvbnNvbGUubG9nKGdhbWVib2FyZEFycmF5QSk7XG4gICAgY29uc29sZS5sb2coc2hpcEZsZWV0KTtcbiAgICBjb25zb2xlLmxvZyhzaGlwU3RvcmUpO1xuICAgIGNvbnNvbGUubG9nKFwiaGksIHRoZSBzaGlwIGlzIGFscmVhZHkgYmlnIGVub3VnaFwiKTtcbiAgICAvLyByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICAgIC8vIGFkZEVMQWRkU2hpcCgpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRTaGlwTGVuZ3RoID4gMSkge1xuICAgIGFkZEVMZm9yTmV4dENlbGxzKGNlbGwsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZU5leHRNb3ZlKG51bWJlcikge1xuICBudW1iZXIgPSBwYXJzZUZsb2F0KG51bWJlcik7XG4gIGxldCBudW1iZXJzQXJyYXkgPSBbXTtcbiAgaWYgKFxuICAgIG51bWJlciAhPSA5MCB8fFxuICAgIG51bWJlciAhPSA5MSB8fFxuICAgIG51bWJlciAhPSA5MiB8fFxuICAgIG51bWJlciAhPSA5MyB8fFxuICAgIG51bWJlciAhPSA5NCB8fFxuICAgIG51bWJlciAhPSA5NSB8fFxuICAgIG51bWJlciAhPSA5NiB8fFxuICAgIG51bWJlciAhPSA5NyB8fFxuICAgIG51bWJlciAhPSA5OCB8fFxuICAgIG51bWJlciAhPSA5OVxuICApIHtcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW1iZXIgKyAxMCk7XG4gIH1cbiAgaWYgKFxuICAgIG51bWJlciAhPSAwIHx8XG4gICAgbnVtYmVyICE9IDEgfHxcbiAgICBudW1iZXIgIT0gMiB8fFxuICAgIG51bWJlciAhPSAzIHx8XG4gICAgbnVtYmVyICE9IDQgfHxcbiAgICBudW1iZXIgIT0gNSB8fFxuICAgIG51bWJlciAhPSA2IHx8XG4gICAgbnVtYmVyICE9IDcgfHxcbiAgICBudW1iZXIgIT0gOCB8fFxuICAgIG51bWJlciAhPSA5XG4gICkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciAtIDEwKTtcbiAgfVxuICBpZiAoIShudW1iZXIgJSAxMCA9PT0gMCkpIHtcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW1iZXIgLSAxKTtcbiAgfVxuICBpZiAoXG4gICAgbnVtYmVyICE9IDkgfHxcbiAgICBudW1iZXIgIT0gMTkgfHxcbiAgICBudW1iZXIgIT0gMjkgfHxcbiAgICBudW1iZXIgIT0gMzkgfHxcbiAgICBudW1iZXIgIT0gNDkgfHxcbiAgICBudW1iZXIgIT0gNTkgfHxcbiAgICBudW1iZXIgIT0gNjkgfHxcbiAgICBudW1iZXIgIT0gNzkgfHxcbiAgICBudW1iZXIgIT0gODkgfHxcbiAgICBudW1iZXIgIT0gOTlcbiAgKSB7XG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtYmVyICsgMSk7XG4gIH1cbiAgY29uc29sZS5sb2cobnVtYmVyc0FycmF5KTtcbiAgcmV0dXJuIG51bWJlcnNBcnJheTtcbn1cbiIsIi8vIFRoaXMgd2lsbCBiZSB0aGUgbWFpbiBKUyBzY3JpcHRcbi8vVE9QOiBOZWNlc3NhcnkgaW1wb3J0cyBhbmQgZ2xvYmFsIHZhcmlhYmxlc1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IGFkZEVMQWRkU2hpcCwgY3JlYXRlQm90aEdyaWRzIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmxldCBjdXJyZW50Q2VsbCA9IHVuZGVmaW5lZDtcbmxldCBjdXJyZW50U2hpcCA9IHVuZGVmaW5lZDtcbmxldCBzaGlwRmxlZXQgPSBbXTtcbmxldCBzaGlwU3RvcmUgPSBbXG4gIHsgbmFtZTogOSwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDgsIHNpemU6IDEgfSxcbiAgeyBuYW1lOiA3LCBzaXplOiAxIH0sXG4gIHsgbmFtZTogNiwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDUsIHNpemU6IDIgfSxcbiAgeyBuYW1lOiA0LCBzaXplOiAyIH0sXG4gIHsgbmFtZTogMywgc2l6ZTogMiB9LFxuICB7IG5hbWU6IDIsIHNpemU6IDMgfSxcbiAgeyBuYW1lOiAxLCBzaXplOiAzIH0sXG4gIHsgbmFtZTogMCwgc2l6ZTogNCB9LFxuXTtcblxuLy8gTUlERExFIDogR2FtZSBTZXNzaW9uIDpcblxubGV0IGdhbWVib2FyZEEgPSBuZXcgR2FtZWJvYXJkKFwiYVwiKTtcbmxldCBnYW1lYm9hcmRCID0gbmV3IEdhbWVib2FyZChcImJcIik7XG5sZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2V0Z2FtZWJvYXJkQXJyYXlBKCk7XG5jcmVhdGVCb3RoR3JpZHMoKTtcbi8vIEZuIGJhc2luZyB1cG9uIGdhbWVib2FyZEEgY3JlYXRlIGdyaWRcbmFkZEVMQWRkU2hpcCgpOyAvLyBhZGRzIEVMIHRvIHRoZSBsZWZ0IGdyaWRcblxuLy8gQk9UVE9NIDogZnVuY3Rpb24gZGVmaW5pdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBnZXRnYW1lYm9hcmRBcnJheUEoKSB7XG4gIGxldCBnYW1lYm9hcmRBcnJheUEgPSBnYW1lYm9hcmRBLmdldEdhbWVib2FyZEFycmF5KCk7XG4gIHJldHVybiBnYW1lYm9hcmRBcnJheUE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRnYW1lYm9hcmRBcnJheUIoKSB7XG4gIGxldCBnYW1lYm9hcmRBcnJheUIgPSBnYW1lYm9hcmRCLmdldEdhbWVib2FyZEFycmF5KCk7XG4gIHJldHVybiBnYW1lYm9hcmRBcnJheUI7XG59XG5cbmV4cG9ydCB7IGN1cnJlbnRTaGlwLCBjdXJyZW50Q2VsbCwgc2hpcFN0b3JlLCBnYW1lYm9hcmRBcnJheUEsIHNoaXBGbGVldCB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKHNpemUsIG5hbWUsIGNlbGwpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5oaXRDb3VudCA9IDA7XG4gICAgdGhpcy5jb29yZCA9IFtjZWxsXTtcbiAgICB0aGlzLmlzU3VuayA9IGZhbHNlO1xuICB9XG4gIGFkZENvb3JkaW5hdGVzKGNvb3JkKSB7XG4gICAgdGhpcy5jb29yZC5wdXNoKGNvb3JkKTtcbiAgfVxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudCsrO1xuICAgIGlmICh0aGlzLmhpdENvdW50ID09PSB0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMuc3Vua1NoaXAoKTtcbiAgICB9XG4gIH1cbiAgc3Vua1NoaXAoKSB7XG4gICAgdGhpcy5pc1N1bmsgPSB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2dhbWVsb2dpYy5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==