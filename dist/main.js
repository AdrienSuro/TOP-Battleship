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
    (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addShip)(event.target.id);
  }
}

function setShipClass(x) {
  x.removeAttribute("class", "highlight");
  x.setAttribute("class", "hasShip");
}

function addELforNextCells(cellId, currentShipLength, currentShip) {
  removeAllEventListenersFromCells();
  let possibleCells = (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.calculateNextMove)(cellId.slice(1));
  possibleCells.forEach((e) => {
    let cell = document.getElementById(`a${e}`);
    cell.removeAttribute("class", "emptyCell"); //comment leur remettre le class emptyCell ensuite ?
    if (!cell.hasAttribute("class", "hasShip")) {
      cell.setAttribute("class", "highlight");
    }
    addCellFunc = () => {
      (0,_gamelogic_js__WEBPACK_IMPORTED_MODULE_1__.addCellsToCurrentShip)(cell, currentShipLength, currentShip);
    };
    setShipClassFunc = () => {
      setShipClass(cell);
    };
    cell.addEventListener("click", setShipClassFunc);
    cell.addEventListener("click", addCellFunc);
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
  currentShip.addCoordinates(cell.id);
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.id.slice(1)].hasShip = true;
  _index_js__WEBPACK_IMPORTED_MODULE_1__.gameboardArrayA[cell.id.slice(1)].shipName = currentShip.name;
  currentShipLength--;
  if (_index_js__WEBPACK_IMPORTED_MODULE_1__.shipFleet.length === 0) {
    return;
  } else if (currentShipLength === 1) {
    console.log("hi, the ship is already big enough");
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.removeAllEventListenersFromCells)();
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELAddShip)();
  } else if (currentShipLength > 1) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_2__.addELforNextCells)(cell.id, currentShipLength, currentShip);
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
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.addELAddShip)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9nYW1lbG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZWJvYXJkQXJyYXlBLCB7IHNoaXBGbGVldCB9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQge1xuICBhZGRTaGlwLFxuICBhZGRDZWxsc1RvQ3VycmVudFNoaXAsXG4gIGN1cnJlbnRTaGlwTGVuZ3RoLFxuICBjYWxjdWxhdGVOZXh0TW92ZSxcbn0gZnJvbSBcIi4vZ2FtZWxvZ2ljLmpzXCI7XG5cbmxldCBsZWZ0Z3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG5sZXQgbGVmdGdyaWRjaGlsZHMgPSBsZWZ0Z3JpZC5jaGlsZE5vZGVzO1xubGV0IHNldFNoaXBDbGFzc0Z1bmMgPSB7fTtcbmxldCBhZGRDZWxsRnVuYyA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVCb3RoR3JpZHMoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTtcbiAgICBuZXdDZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIGBhJHtpfWApO1xuICAgIGxlZnRncmlkLmFwcGVuZENoaWxkKG5ld0NlbGwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEVMQWRkU2hpcCgpIHtcbiAgbGVmdGdyaWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFNoaXBET00pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpIHtcbiAgbGVmdGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFNoaXBET00pO1xuICAvLyBsZWZ0Z3JpZGNoaWxkcy5mb3JFYWNoKCgpID0+IHtcbiAgLy8gICByZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkU2hpcERPTSk7XG4gIC8vIH0pO1xuICBsZWZ0Z3JpZGNoaWxkcy5mb3JFYWNoKCgpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0U2hpcENsYXNzRnVuYyk7XG4gIH0pO1xuICBsZWZ0Z3JpZGNoaWxkcy5mb3JFYWNoKCgpID0+IHtcbiAgICByZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkQ2VsbEZ1bmMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkU2hpcERPTShldmVudCkge1xuICBpZiAoZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcImNsYXNzXCIsIFwiZW1wdHlDZWxsXCIpKSB7XG4gICAgZXZlbnQudGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZW1wdHlDZWxsXCIpO1xuICAgIGV2ZW50LnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhhc1NoaXBcIik7XG4gICAgYWRkU2hpcChldmVudC50YXJnZXQuaWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldFNoaXBDbGFzcyh4KSB7XG4gIHgucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaWdobGlnaHRcIik7XG4gIHguc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoYXNTaGlwXCIpO1xufVxuXG5mdW5jdGlvbiBhZGRFTGZvck5leHRDZWxscyhjZWxsSWQsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCkge1xuICByZW1vdmVBbGxFdmVudExpc3RlbmVyc0Zyb21DZWxscygpO1xuICBsZXQgcG9zc2libGVDZWxscyA9IGNhbGN1bGF0ZU5leHRNb3ZlKGNlbGxJZC5zbGljZSgxKSk7XG4gIHBvc3NpYmxlQ2VsbHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGEke2V9YCk7XG4gICAgY2VsbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImVtcHR5Q2VsbFwiKTsgLy9jb21tZW50IGxldXIgcmVtZXR0cmUgbGUgY2xhc3MgZW1wdHlDZWxsIGVuc3VpdGUgP1xuICAgIGlmICghY2VsbC5oYXNBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImhhc1NoaXBcIikpIHtcbiAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJoaWdobGlnaHRcIik7XG4gICAgfVxuICAgIGFkZENlbGxGdW5jID0gKCkgPT4ge1xuICAgICAgYWRkQ2VsbHNUb0N1cnJlbnRTaGlwKGNlbGwsIGN1cnJlbnRTaGlwTGVuZ3RoLCBjdXJyZW50U2hpcCk7XG4gICAgfTtcbiAgICBzZXRTaGlwQ2xhc3NGdW5jID0gKCkgPT4ge1xuICAgICAgc2V0U2hpcENsYXNzKGNlbGwpO1xuICAgIH07XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2V0U2hpcENsYXNzRnVuYyk7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkQ2VsbEZ1bmMpO1xuICB9KTtcbn1cblxuZXhwb3J0IHtcbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMsXG4gIGFkZEVMQWRkU2hpcCxcbiAgY3JlYXRlQm90aEdyaWRzLFxuICBhZGRFTGZvck5leHRDZWxscyxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIpIHtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgfVxuXG4gIGdldEdhbWVib2FyZEFycmF5KCkge1xuICAgIGxldCBnYW1lYm9hcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGxldCBuZXdPYmplY3QgPSB7XG4gICAgICAgIGNlbGxJZDogYCR7dGhpcy5wbGF5ZXJ9JHtpfWAsXG4gICAgICAgIGhhc1NoaXA6IGZhbHNlLFxuICAgICAgICBzaGlwTmFtZTogdW5kZWZpbmVkLFxuICAgICAgfTtcbiAgICAgIGdhbWVib2FyZEFycmF5LnB1c2gobmV3T2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIGdhbWVib2FyZEFycmF5O1xuICB9XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgeyBzaGlwU3RvcmUsIHNoaXBGbGVldCwgZ2FtZWJvYXJkQXJyYXlBIH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7XG4gIGFkZEVMQWRkU2hpcCxcbiAgcmVtb3ZlQWxsRXZlbnRMaXN0ZW5lcnNGcm9tQ2VsbHMsXG4gIGFkZEVMZm9yTmV4dENlbGxzLFxufSBmcm9tIFwiLi9kb20uanNcIjtcblxuZXhwb3J0IGxldCBjdXJyZW50U2hpcExlbmd0aCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTaGlwKGNlbGxJZCkge1xuICBjb25zb2xlLmxvZyhcImluc2lkZSBhZGRTaGlwXCIpO1xuICBsZXQgcmV0cmlldmVTaGlwID0gc2hpcFN0b3JlLnBvcCgpO1xuICBjdXJyZW50U2hpcExlbmd0aCA9IHJldHJpZXZlU2hpcC5zaXplO1xuICBsZXQgbmV3U2hpcCA9IG5ldyBTaGlwKHJldHJpZXZlU2hpcC5zaXplLCByZXRyaWV2ZVNoaXAubmFtZSwgY2VsbElkKTsgLy8gLT4gY210IHVwZGF0ZSBjdXJyZW50U2hpcExlbmd0aCA/XG4gIHNoaXBGbGVldC5wdXNoKG5ld1NoaXApO1xuICBnYW1lYm9hcmRBcnJheUFbY2VsbElkLnNsaWNlKDEpXS5oYXNTaGlwID0gdHJ1ZTtcbiAgZ2FtZWJvYXJkQXJyYXlBW2NlbGxJZC5zbGljZSgxKV0uc2hpcE5hbWUgPSByZXRyaWV2ZVNoaXAubmFtZTtcbiAgYWRkRUxmb3JOZXh0Q2VsbHMoY2VsbElkLCBjdXJyZW50U2hpcExlbmd0aCwgbmV3U2hpcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDZWxsc1RvQ3VycmVudFNoaXAoY2VsbCwgY3VycmVudFNoaXBMZW5ndGgsIGN1cnJlbnRTaGlwKSB7XG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzKCk7XG4gIGN1cnJlbnRTaGlwLmFkZENvb3JkaW5hdGVzKGNlbGwuaWQpO1xuICBnYW1lYm9hcmRBcnJheUFbY2VsbC5pZC5zbGljZSgxKV0uaGFzU2hpcCA9IHRydWU7XG4gIGdhbWVib2FyZEFycmF5QVtjZWxsLmlkLnNsaWNlKDEpXS5zaGlwTmFtZSA9IGN1cnJlbnRTaGlwLm5hbWU7XG4gIGN1cnJlbnRTaGlwTGVuZ3RoLS07XG4gIGlmIChzaGlwRmxlZXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRTaGlwTGVuZ3RoID09PSAxKSB7XG4gICAgY29uc29sZS5sb2coXCJoaSwgdGhlIHNoaXAgaXMgYWxyZWFkeSBiaWcgZW5vdWdoXCIpO1xuICAgIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzRnJvbUNlbGxzKCk7XG4gICAgYWRkRUxBZGRTaGlwKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFNoaXBMZW5ndGggPiAxKSB7XG4gICAgYWRkRUxmb3JOZXh0Q2VsbHMoY2VsbC5pZCwgY3VycmVudFNoaXBMZW5ndGgsIGN1cnJlbnRTaGlwKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlTmV4dE1vdmUobnVtYmVyKSB7XG4gIG51bWJlciA9IHBhcnNlRmxvYXQobnVtYmVyKTtcbiAgbGV0IG51bWJlcnNBcnJheSA9IFtdO1xuICBpZiAoXG4gICAgbnVtYmVyICE9IDkwIHx8XG4gICAgbnVtYmVyICE9IDkxIHx8XG4gICAgbnVtYmVyICE9IDkyIHx8XG4gICAgbnVtYmVyICE9IDkzIHx8XG4gICAgbnVtYmVyICE9IDk0IHx8XG4gICAgbnVtYmVyICE9IDk1IHx8XG4gICAgbnVtYmVyICE9IDk2IHx8XG4gICAgbnVtYmVyICE9IDk3IHx8XG4gICAgbnVtYmVyICE9IDk4IHx8XG4gICAgbnVtYmVyICE9IDk5XG4gICkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciArIDEwKTtcbiAgfVxuICBpZiAoXG4gICAgbnVtYmVyICE9IDAgfHxcbiAgICBudW1iZXIgIT0gMSB8fFxuICAgIG51bWJlciAhPSAyIHx8XG4gICAgbnVtYmVyICE9IDMgfHxcbiAgICBudW1iZXIgIT0gNCB8fFxuICAgIG51bWJlciAhPSA1IHx8XG4gICAgbnVtYmVyICE9IDYgfHxcbiAgICBudW1iZXIgIT0gNyB8fFxuICAgIG51bWJlciAhPSA4IHx8XG4gICAgbnVtYmVyICE9IDlcbiAgKSB7XG4gICAgbnVtYmVyc0FycmF5LnB1c2gobnVtYmVyIC0gMTApO1xuICB9XG4gIGlmICghKG51bWJlciAlIDEwID09PSAwKSkge1xuICAgIG51bWJlcnNBcnJheS5wdXNoKG51bWJlciAtIDEpO1xuICB9XG4gIGlmIChcbiAgICBudW1iZXIgIT0gOSB8fFxuICAgIG51bWJlciAhPSAxOSB8fFxuICAgIG51bWJlciAhPSAyOSB8fFxuICAgIG51bWJlciAhPSAzOSB8fFxuICAgIG51bWJlciAhPSA0OSB8fFxuICAgIG51bWJlciAhPSA1OSB8fFxuICAgIG51bWJlciAhPSA2OSB8fFxuICAgIG51bWJlciAhPSA3OSB8fFxuICAgIG51bWJlciAhPSA4OSB8fFxuICAgIG51bWJlciAhPSA5OVxuICApIHtcbiAgICBudW1iZXJzQXJyYXkucHVzaChudW1iZXIgKyAxKTtcbiAgfVxuICBjb25zb2xlLmxvZyhudW1iZXJzQXJyYXkpO1xuICByZXR1cm4gbnVtYmVyc0FycmF5O1xufVxuIiwiLy8gVGhpcyB3aWxsIGJlIHRoZSBtYWluIEpTIHNjcmlwdFxuLy9UT1A6IE5lY2Vzc2FyeSBpbXBvcnRzIGFuZCBnbG9iYWwgdmFyaWFibGVzXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgYWRkRUxBZGRTaGlwLCBjcmVhdGVCb3RoR3JpZHMgfSBmcm9tIFwiLi9kb20uanNcIjtcblxubGV0IGN1cnJlbnRDZWxsID0gdW5kZWZpbmVkO1xubGV0IGN1cnJlbnRTaGlwID0gdW5kZWZpbmVkO1xubGV0IHNoaXBGbGVldCA9IFtdO1xubGV0IHNoaXBTdG9yZSA9IFtcbiAgeyBuYW1lOiA5LCBzaXplOiAxIH0sXG4gIHsgbmFtZTogOCwgc2l6ZTogMSB9LFxuICB7IG5hbWU6IDcsIHNpemU6IDEgfSxcbiAgeyBuYW1lOiA2LCBzaXplOiAxIH0sXG4gIHsgbmFtZTogNSwgc2l6ZTogMiB9LFxuICB7IG5hbWU6IDQsIHNpemU6IDIgfSxcbiAgeyBuYW1lOiAzLCBzaXplOiAyIH0sXG4gIHsgbmFtZTogMiwgc2l6ZTogMyB9LFxuICB7IG5hbWU6IDEsIHNpemU6IDMgfSxcbiAgeyBuYW1lOiAwLCBzaXplOiA0IH0sXG5dO1xuXG4vLyBNSURETEUgOiBHYW1lIFNlc3Npb24gOlxuXG5sZXQgZ2FtZWJvYXJkQSA9IG5ldyBHYW1lYm9hcmQoXCJhXCIpO1xubGV0IGdhbWVib2FyZEIgPSBuZXcgR2FtZWJvYXJkKFwiYlwiKTtcbmxldCBnYW1lYm9hcmRBcnJheUEgPSBnZXRnYW1lYm9hcmRBcnJheUEoKTtcbmNyZWF0ZUJvdGhHcmlkcygpO1xuYWRkRUxBZGRTaGlwKCk7XG5cbi8vIEJPVFRPTSA6IGZ1bmN0aW9uIGRlZmluaXRpb25zXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlBKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlBID0gZ2FtZWJvYXJkQS5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlBO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Z2FtZWJvYXJkQXJyYXlCKCkge1xuICBsZXQgZ2FtZWJvYXJkQXJyYXlCID0gZ2FtZWJvYXJkQi5nZXRHYW1lYm9hcmRBcnJheSgpO1xuICByZXR1cm4gZ2FtZWJvYXJkQXJyYXlCO1xufVxuXG5leHBvcnQgeyBjdXJyZW50U2hpcCwgY3VycmVudENlbGwsIHNoaXBTdG9yZSwgZ2FtZWJvYXJkQXJyYXlBLCBzaGlwRmxlZXQgfTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihzaXplLCBuYW1lLCBjZWxsKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuaGl0Q291bnQgPSAwO1xuICAgIHRoaXMuY29vcmQgPSBbY2VsbF07XG4gICAgdGhpcy5pc1N1bmsgPSBmYWxzZTtcbiAgfVxuICBhZGRDb29yZGluYXRlcyhjb29yZCkge1xuICAgIHRoaXMuY29vcmQucHVzaChjb29yZCk7XG4gIH1cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnQrKztcbiAgICBpZiAodGhpcy5oaXRDb3VudCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICB0aGlzLnN1bmtTaGlwKCk7XG4gICAgfVxuICB9XG4gIHN1bmtTaGlwKCkge1xuICAgIHRoaXMuaXNTdW5rID0gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lbG9naWMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=