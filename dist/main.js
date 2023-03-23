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
/* harmony export */   "displayGrid": () => (/* binding */ displayGrid)
/* harmony export */ });


function displayGrid(gridArray, location, gameboard) {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray.length; j++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", () => {
        receiveAttack(i, j); // MODIFIER LA FCT receveiveAttack pour qu'elle puisse répondre à cet event listener
        cell.setAttribute("class", "hit");
        gameboard.receiveAttack(gridArray, i, j); //if cell has a ship, isHit = true
        console.log(gridArray);
      });
      location.appendChild(cell);
    }
  }
}

function placeShip() {}


/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


function gameboard(width) {
  const receiveAttack = (grid, row, column) => {
    if (grid[row][column].hasShip === true) {
      grid[row][column].isHit = true;
    } else {
      console.log("missed !");
      console.log(grid[row][column]);
      this.classList.toggle("hit");
      this.classList.toggle("missed");
    }
  };
  const createShip = (length) => {
    let newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
    return newShip; //returns a ship Object
  };
  const createGrid = () => {
    const rows = [];
    for (let i = 0; i < width; i++) {
      rows.push([]);
      for (let j = 0; j < width; j++) {
        rows[i].push({
          x: [i],
          y: [j],
          isHit: false,
          hasShip: false,
          addShip: function (length) {
            if (this.hasShip === false) {
              this.createShip(length);
              this.hasShip = true;
            } else if (this.hasShip === true) {
              return;
            }
          },
        });
      }
    }
    return rows;
  };

  const createShipsGrid = () => {
    const shipsArray = [];
    for (let i = 0; i < width; i++) {
      shipsArray.push([]);
      for (let j = 0; j < width; j++) {
        shipsArray[i].push();
      }
    }
    return shipsArray;
  };

  return {
    receiveAttack,
    createShip,
    createGrid,
    createShipsGrid,
  };
}

let testGameboard = gameboard(10);
let z = testGameboard.createGrid();
console.log(testGameboard);
console.log(z);


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ player)
/* harmony export */ });
// import gameboard from "./gameboard.js";

function player(user) {
  const attack = () => {
    if (user == "computer") {
      let randomRow = Math.floor(Math.random() * 10);
      let randomColumn = Math.floor(Math.random() * 10);
      let coordinates = [];
      coordinates.push(randomRow);
      coordinates.push(randomColumn);
      return coordinates;
    } else {
      return true;
    }
  };
  return { attack };
}


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ship)
/* harmony export */ });
function ship(length) {
  let coordinates = [];
  let hits = 0;
  const hit = () => {
    if (hits == length) {
      return;
    }
    hits++;
  };
  const isSunk = function () {
    if (hits == length) {
      return true;
    } else {
      return false;
    }
  };
  return {
    hit,
    isSunk,
    coordinates,
  };
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/gamelogic.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");





const leftgridcontainer = document.getElementById("leftgridcontainer");
const rightgridcontainer = document.getElementById("rightgridcontainer");
console.log(leftgridcontainer);

function newGame() {
  let leftGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(10);
  let leftGrid = leftGameboard.createGrid(); //is an array
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(leftGrid, leftgridcontainer, leftGameboard);
  let leftShipsGrid = leftGameboard.createShipsGrid();
  let rightGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(10);
  let rightGrid = rightGameboard.createGrid(); // is an array
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(rightGrid, rightgridcontainer, rightGameboard);
  let leftPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("user");
  let rightPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("computer");
  return { leftShipsGrid };
}

newGame();

//Create the ships manually :

let shipBiggest1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_1__["default"])(4);
shipBiggest1.coordinates[0] = [leftShipsGrid[0][0]];
leftGrid[0][0].hasShip = true;
leftGrid[1][0].hasShip = true;
leftGrid[2][0].hasShip = true;
leftGrid[3][0].hasShip = true;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF1Qjs7QUFFdkI7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCMEI7O0FBRVg7QUFDZjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaURBQUk7QUFDdEIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQy9EQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7QUNoQmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3JCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0o7QUFDVTtBQUNBOztBQUV2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IseURBQVM7QUFDL0IsNkNBQTZDO0FBQzdDLEVBQUUsb0RBQVc7QUFDYjtBQUNBLHVCQUF1Qix5REFBUztBQUNoQywrQ0FBK0M7QUFDL0MsRUFBRSxvREFBVztBQUNiLG1CQUFtQixzREFBTTtBQUN6QixvQkFBb0Isc0RBQU07QUFDMUIsV0FBVztBQUNYOztBQUVBOztBQUVBOztBQUVBLG1CQUFtQixvREFBSTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL2dhbWVsb2dpYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkaXNwbGF5R3JpZCB9O1xuXG5mdW5jdGlvbiBkaXNwbGF5R3JpZChncmlkQXJyYXksIGxvY2F0aW9uLCBnYW1lYm9hcmQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyaWRBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICByZWNlaXZlQXR0YWNrKGksIGopOyAvLyBNT0RJRklFUiBMQSBGQ1QgcmVjZXZlaXZlQXR0YWNrIHBvdXIgcXUnZWxsZSBwdWlzc2UgcsOpcG9uZHJlIMOgIGNldCBldmVudCBsaXN0ZW5lclxuICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaGl0XCIpO1xuICAgICAgICBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhncmlkQXJyYXksIGksIGopOyAvL2lmIGNlbGwgaGFzIGEgc2hpcCwgaXNIaXQgPSB0cnVlXG4gICAgICAgIGNvbnNvbGUubG9nKGdyaWRBcnJheSk7XG4gICAgICB9KTtcbiAgICAgIGxvY2F0aW9uLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwbGFjZVNoaXAoKSB7fVxuIiwiaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lYm9hcmQod2lkdGgpIHtcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChncmlkLCByb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChncmlkW3Jvd11bY29sdW1uXS5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICBncmlkW3Jvd11bY29sdW1uXS5pc0hpdCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibWlzc2VkICFcIik7XG4gICAgICBjb25zb2xlLmxvZyhncmlkW3Jvd11bY29sdW1uXSk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJoaXRcIik7XG4gICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJtaXNzZWRcIik7XG4gICAgfVxuICB9O1xuICBjb25zdCBjcmVhdGVTaGlwID0gKGxlbmd0aCkgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gc2hpcChsZW5ndGgpO1xuICAgIHJldHVybiBuZXdTaGlwOyAvL3JldHVybnMgYSBzaGlwIE9iamVjdFxuICB9O1xuICBjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvd3MgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgIHJvd3MucHVzaChbXSk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgcm93c1tpXS5wdXNoKHtcbiAgICAgICAgICB4OiBbaV0sXG4gICAgICAgICAgeTogW2pdLFxuICAgICAgICAgIGlzSGl0OiBmYWxzZSxcbiAgICAgICAgICBoYXNTaGlwOiBmYWxzZSxcbiAgICAgICAgICBhZGRTaGlwOiBmdW5jdGlvbiAobGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNTaGlwID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNoaXAobGVuZ3RoKTtcbiAgICAgICAgICAgICAgdGhpcy5oYXNTaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNTaGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJvd3M7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlU2hpcHNHcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgIHNoaXBzQXJyYXkucHVzaChbXSk7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoOyBqKyspIHtcbiAgICAgICAgc2hpcHNBcnJheVtpXS5wdXNoKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaGlwc0FycmF5O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBjcmVhdGVTaGlwLFxuICAgIGNyZWF0ZUdyaWQsXG4gICAgY3JlYXRlU2hpcHNHcmlkLFxuICB9O1xufVxuXG5sZXQgdGVzdEdhbWVib2FyZCA9IGdhbWVib2FyZCgxMCk7XG5sZXQgeiA9IHRlc3RHYW1lYm9hcmQuY3JlYXRlR3JpZCgpO1xuY29uc29sZS5sb2codGVzdEdhbWVib2FyZCk7XG5jb25zb2xlLmxvZyh6KTtcbiIsIi8vIGltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXllcih1c2VyKSB7XG4gIGNvbnN0IGF0dGFjayA9ICgpID0+IHtcbiAgICBpZiAodXNlciA9PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgIGxldCByYW5kb21Sb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBsZXQgcmFuZG9tQ29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgbGV0IGNvb3JkaW5hdGVzID0gW107XG4gICAgICBjb29yZGluYXRlcy5wdXNoKHJhbmRvbVJvdyk7XG4gICAgICBjb29yZGluYXRlcy5wdXNoKHJhbmRvbUNvbHVtbik7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHsgYXR0YWNrIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwKGxlbmd0aCkge1xuICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgaWYgKGhpdHMgPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpdHMrKztcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChoaXRzID09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBjb29yZGluYXRlcyxcbiAgfTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCBnYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5R3JpZCB9IGZyb20gXCIuL2RvbS5qc1wiO1xuXG5jb25zdCBsZWZ0Z3JpZGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG5jb25zdCByaWdodGdyaWRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0Z3JpZGNvbnRhaW5lclwiKTtcbmNvbnNvbGUubG9nKGxlZnRncmlkY29udGFpbmVyKTtcblxuZnVuY3Rpb24gbmV3R2FtZSgpIHtcbiAgbGV0IGxlZnRHYW1lYm9hcmQgPSBnYW1lYm9hcmQoMTApO1xuICBsZXQgbGVmdEdyaWQgPSBsZWZ0R2FtZWJvYXJkLmNyZWF0ZUdyaWQoKTsgLy9pcyBhbiBhcnJheVxuICBkaXNwbGF5R3JpZChsZWZ0R3JpZCwgbGVmdGdyaWRjb250YWluZXIsIGxlZnRHYW1lYm9hcmQpO1xuICBsZXQgbGVmdFNoaXBzR3JpZCA9IGxlZnRHYW1lYm9hcmQuY3JlYXRlU2hpcHNHcmlkKCk7XG4gIGxldCByaWdodEdhbWVib2FyZCA9IGdhbWVib2FyZCgxMCk7XG4gIGxldCByaWdodEdyaWQgPSByaWdodEdhbWVib2FyZC5jcmVhdGVHcmlkKCk7IC8vIGlzIGFuIGFycmF5XG4gIGRpc3BsYXlHcmlkKHJpZ2h0R3JpZCwgcmlnaHRncmlkY29udGFpbmVyLCByaWdodEdhbWVib2FyZCk7XG4gIGxldCBsZWZ0UGxheWVyID0gcGxheWVyKFwidXNlclwiKTtcbiAgbGV0IHJpZ2h0UGxheWVyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG4gIHJldHVybiB7IGxlZnRTaGlwc0dyaWQgfTtcbn1cblxubmV3R2FtZSgpO1xuXG4vL0NyZWF0ZSB0aGUgc2hpcHMgbWFudWFsbHkgOlxuXG5sZXQgc2hpcEJpZ2dlc3QxID0gc2hpcCg0KTtcbnNoaXBCaWdnZXN0MS5jb29yZGluYXRlc1swXSA9IFtsZWZ0U2hpcHNHcmlkWzBdWzBdXTtcbmxlZnRHcmlkWzBdWzBdLmhhc1NoaXAgPSB0cnVlO1xubGVmdEdyaWRbMV1bMF0uaGFzU2hpcCA9IHRydWU7XG5sZWZ0R3JpZFsyXVswXS5oYXNTaGlwID0gdHJ1ZTtcbmxlZnRHcmlkWzNdWzBdLmhhc1NoaXAgPSB0cnVlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9