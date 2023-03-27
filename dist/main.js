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


function displayGrid(gridArray, location, leftorright, gameboard) {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray.length; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", `${leftorright}${i}${j}`);
      cell.addEventListener("click", () => {
        if (gameboard.allShipsPlaced === false) {
          console.log(gameboard.allShipsPlaced);
          console.log(gameboard.numberOfShips);
          cell.classList.toggle("hasShip");
          gridArray[i][j].hasShip = true;
          gameboard.createShip([i, j]);
          gameboard.allShipsCoord.forEach((e) => {
            let i = e[0];
            let j = e[1];
            gridArray[i][j].hasShip = true;
            let getCell = document.getElementById(`${leftorright}${i}${j}`);
            if (!getCell.classList.contains("hasShip")) {
              getCell.classList.toggle("hasShip");
            }
          });
        } else if (gameboard.allShipsPlaced === true) {
          if (gridArray[i][j].hasShip === true) {
            cell.toggleAttribute("class", "shipIsHit");
          } else if (gridArray[i][j].hasShip === false) {
            cell.toggleAttribute("class", "emptyIsHit");
          }
        }
      });
      location.appendChild(cell);
    }
  }
}


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
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");


function gameboard(width) {
  let allShipsCoord = [];
  let shipsArray = []; //array d'objets ship qu'on va looper pour voir si la case cliquée a un bateau et identifier le bateau "à détruire"
  let allShipsPlaced = false;
  let numberOfShips = 0;
  const createGrid = () => {
    const gameboardArray = [];
    for (let i = 0; i < width; i++) {
      gameboardArray.push([]);
      for (let j = 0; j < width; j++) {
        gameboardArray[i].push({
          isHit: false,
          hasShip: false,
        });
      }
    }
    return gameboardArray;
  };
  const changeAllShipsPlaced = () => {
    allShipsPlaced = true;
  };
  const createShip = (coordinates) => {
    if (numberOfShips === 0) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, coordinates);
      allShipsCoord.push(coordinates);
      for (let i = 1; i < newShip.length; i++) {
        let promptCoordinates = prompt(
          "Enter new coordinates in this format 03"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      newShip.coordinatesArray.forEach((e) => {
        allShipsCoord.push(e);
      });
      numberOfShips++;
    } else if (numberOfShips === 1 || numberOfShips === 2) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(3, coordinates);
      allShipsCoord.push(coordinates);
      for (let i = 1; i < newShip.length; i++) {
        let promptCoordinates = prompt(
          "Enter new coordinates in this format 03"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      newShip.coordinatesArray.forEach((e) => {
        allShipsCoord.push(e);
      });
      numberOfShips++;
    } else if (
      numberOfShips === 3 ||
      numberOfShips === 4 ||
      numberOfShips === 5
    ) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, coordinates);
      for (let i = 1; i < newShip.length; i++) {
        let promptCoordinates = prompt(
          "Enter new coordinates in this format 03"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      newShip.coordinatesArray.forEach((e) => {
        allShipsCoord.push(e);
      });
      numberOfShips++;
    } else if (
      numberOfShips === 6 ||
      numberOfShips === 7 ||
      numberOfShips === 8 ||
      numberOfShips === 9
    ) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, coordinates);
      shipsArray.push(newShip);
      console.log(numberOfShips);
      console.log(allShipsPlaced);
      numberOfShips++;
    } else if (numberOfShips === 10) {
      changeAllShipsPlaced();
      console.log(allShipsPlaced);
    }
  };

  return {
    createGrid,
    createShip,
    allShipsPlaced,
    numberOfShips,
    allShipsCoord,
  };
}


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
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
// import gameboard from "./gameboard.js";


function player(user) {
  let winner = false;
  let shipsArray = [];
  const addShip = (length) => {
    let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
    shipsArray.push(newShip);
  };
  return { winner, shipsArray, addShip };
}

// export default function player(user) {
//   const attack = () => {
//     if (user == "computer") {
//       let randomRow = Math.floor(Math.random() * 10);
//       let randomColumn = Math.floor(Math.random() * 10);
//       let coordinates = [];
//       coordinates.push(randomRow);
//       coordinates.push(randomColumn);
//       return coordinates;
//     } else {
//       return true;
//     }
//   };
//   return { attack };
// }


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
function ship(length, [i, j]) {
  let coordinatesArray = [[i, j]];
  const nextCoordinates = (coordinates) => {
    coordinatesArray.push(coordinates);
  };
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
    length,
    hit,
    isSunk,
    nextCoordinates,
    coordinatesArray,
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





function startNewGame() {
  let player1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("user");
  let player2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("computer");
}

const leftgridcontainer = document.getElementById("leftgridcontainer");
const rightgridcontainer = document.getElementById("rightgridcontainer");

function newGame() {
  let leftGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(10);
  let rightGameboard = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_2__["default"])(10);
  let leftGridArray = leftGameboard.createGrid(); //is an array
  let rightGridArray = rightGameboard.createGrid(); // is an array
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(leftGridArray, leftgridcontainer, "left", leftGameboard);
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(rightGridArray, rightgridcontainer, "right", rightGameboard);
  return { leftGameboard, rightGameboard, leftGridArray, rightGridArray };
}

newGame();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0RBQVc7QUFDYixXQUFXO0FBQ1g7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGRpc3BsYXlHcmlkIH07XG5cbmZ1bmN0aW9uIGRpc3BsYXlHcmlkKGdyaWRBcnJheSwgbG9jYXRpb24sIGxlZnRvcnJpZ2h0LCBnYW1lYm9hcmQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyaWRBcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtsZWZ0b3JyaWdodH0ke2l9JHtqfWApO1xuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkLmFsbFNoaXBzUGxhY2VkID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVib2FyZC5hbGxTaGlwc1BsYWNlZCk7XG4gICAgICAgICAgY29uc29sZS5sb2coZ2FtZWJvYXJkLm51bWJlck9mU2hpcHMpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhhc1NoaXBcIik7XG4gICAgICAgICAgZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgIGdhbWVib2FyZC5jcmVhdGVTaGlwKFtpLCBqXSk7XG4gICAgICAgICAgZ2FtZWJvYXJkLmFsbFNoaXBzQ29vcmQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSBlWzBdO1xuICAgICAgICAgICAgbGV0IGogPSBlWzFdO1xuICAgICAgICAgICAgZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGdldENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtsZWZ0b3JyaWdodH0ke2l9JHtqfWApO1xuICAgICAgICAgICAgaWYgKCFnZXRDZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImhhc1NoaXBcIikpIHtcbiAgICAgICAgICAgICAgZ2V0Q2VsbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGFzU2hpcFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChnYW1lYm9hcmQuYWxsU2hpcHNQbGFjZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAoZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNlbGwudG9nZ2xlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwSXNIaXRcIik7XG4gICAgICAgICAgfSBlbHNlIGlmIChncmlkQXJyYXlbaV1bal0uaGFzU2hpcCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNlbGwudG9nZ2xlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlbXB0eUlzSGl0XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZWJvYXJkKHdpZHRoKSB7XG4gIGxldCBhbGxTaGlwc0Nvb3JkID0gW107XG4gIGxldCBzaGlwc0FycmF5ID0gW107IC8vYXJyYXkgZCdvYmpldHMgc2hpcCBxdSdvbiB2YSBsb29wZXIgcG91ciB2b2lyIHNpIGxhIGNhc2UgY2xpcXXDqWUgYSB1biBiYXRlYXUgZXQgaWRlbnRpZmllciBsZSBiYXRlYXUgXCLDoCBkw6l0cnVpcmVcIlxuICBsZXQgYWxsU2hpcHNQbGFjZWQgPSBmYWxzZTtcbiAgbGV0IG51bWJlck9mU2hpcHMgPSAwO1xuICBjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRBcnJheS5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgICBnYW1lYm9hcmRBcnJheVtpXS5wdXNoKHtcbiAgICAgICAgICBpc0hpdDogZmFsc2UsXG4gICAgICAgICAgaGFzU2hpcDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ2FtZWJvYXJkQXJyYXk7XG4gIH07XG4gIGNvbnN0IGNoYW5nZUFsbFNoaXBzUGxhY2VkID0gKCkgPT4ge1xuICAgIGFsbFNoaXBzUGxhY2VkID0gdHJ1ZTtcbiAgfTtcbiAgY29uc3QgY3JlYXRlU2hpcCA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGlmIChudW1iZXJPZlNoaXBzID09PSAwKSB7XG4gICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoNCwgY29vcmRpbmF0ZXMpO1xuICAgICAgYWxsU2hpcHNDb29yZC5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcHJvbXB0Q29vcmRpbmF0ZXMgPSBwcm9tcHQoXG4gICAgICAgICAgXCJFbnRlciBuZXcgY29vcmRpbmF0ZXMgaW4gdGhpcyBmb3JtYXQgMDNcIlxuICAgICAgICApO1xuICAgICAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgICAgICBbLi4ucHJvbXB0Q29vcmRpbmF0ZXNdLmZvckVhY2goKGUpID0+IGNvb3JkQXJyYXkucHVzaChwYXJzZUludChlKSkpO1xuICAgICAgICBuZXdTaGlwLm5leHRDb29yZGluYXRlcyhjb29yZEFycmF5KTtcbiAgICAgIH1cbiAgICAgIHNoaXBzQXJyYXkucHVzaChuZXdTaGlwKTtcbiAgICAgIG5ld1NoaXAuY29vcmRpbmF0ZXNBcnJheS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGFsbFNoaXBzQ29vcmQucHVzaChlKTtcbiAgICAgIH0pO1xuICAgICAgbnVtYmVyT2ZTaGlwcysrO1xuICAgIH0gZWxzZSBpZiAobnVtYmVyT2ZTaGlwcyA9PT0gMSB8fCBudW1iZXJPZlNoaXBzID09PSAyKSB7XG4gICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoMywgY29vcmRpbmF0ZXMpO1xuICAgICAgYWxsU2hpcHNDb29yZC5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbmV3U2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgcHJvbXB0Q29vcmRpbmF0ZXMgPSBwcm9tcHQoXG4gICAgICAgICAgXCJFbnRlciBuZXcgY29vcmRpbmF0ZXMgaW4gdGhpcyBmb3JtYXQgMDNcIlxuICAgICAgICApO1xuICAgICAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgICAgICBbLi4ucHJvbXB0Q29vcmRpbmF0ZXNdLmZvckVhY2goKGUpID0+IGNvb3JkQXJyYXkucHVzaChwYXJzZUludChlKSkpO1xuICAgICAgICBuZXdTaGlwLm5leHRDb29yZGluYXRlcyhjb29yZEFycmF5KTtcbiAgICAgIH1cbiAgICAgIHNoaXBzQXJyYXkucHVzaChuZXdTaGlwKTtcbiAgICAgIG5ld1NoaXAuY29vcmRpbmF0ZXNBcnJheS5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgIGFsbFNoaXBzQ29vcmQucHVzaChlKTtcbiAgICAgIH0pO1xuICAgICAgbnVtYmVyT2ZTaGlwcysrO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBudW1iZXJPZlNoaXBzID09PSAzIHx8XG4gICAgICBudW1iZXJPZlNoaXBzID09PSA0IHx8XG4gICAgICBudW1iZXJPZlNoaXBzID09PSA1XG4gICAgKSB7XG4gICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoMiwgY29vcmRpbmF0ZXMpO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwcm9tcHRDb29yZGluYXRlcyA9IHByb21wdChcbiAgICAgICAgICBcIkVudGVyIG5ldyBjb29yZGluYXRlcyBpbiB0aGlzIGZvcm1hdCAwM1wiXG4gICAgICAgICk7XG4gICAgICAgIGxldCBjb29yZEFycmF5ID0gW107XG4gICAgICAgIFsuLi5wcm9tcHRDb29yZGluYXRlc10uZm9yRWFjaCgoZSkgPT4gY29vcmRBcnJheS5wdXNoKHBhcnNlSW50KGUpKSk7XG4gICAgICAgIG5ld1NoaXAubmV4dENvb3JkaW5hdGVzKGNvb3JkQXJyYXkpO1xuICAgICAgfVxuICAgICAgc2hpcHNBcnJheS5wdXNoKG5ld1NoaXApO1xuICAgICAgbmV3U2hpcC5jb29yZGluYXRlc0FycmF5LmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgYWxsU2hpcHNDb29yZC5wdXNoKGUpO1xuICAgICAgfSk7XG4gICAgICBudW1iZXJPZlNoaXBzKys7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG51bWJlck9mU2hpcHMgPT09IDYgfHxcbiAgICAgIG51bWJlck9mU2hpcHMgPT09IDcgfHxcbiAgICAgIG51bWJlck9mU2hpcHMgPT09IDggfHxcbiAgICAgIG51bWJlck9mU2hpcHMgPT09IDlcbiAgICApIHtcbiAgICAgIGxldCBuZXdTaGlwID0gc2hpcCgxLCBjb29yZGluYXRlcyk7XG4gICAgICBzaGlwc0FycmF5LnB1c2gobmV3U2hpcCk7XG4gICAgICBjb25zb2xlLmxvZyhudW1iZXJPZlNoaXBzKTtcbiAgICAgIGNvbnNvbGUubG9nKGFsbFNoaXBzUGxhY2VkKTtcbiAgICAgIG51bWJlck9mU2hpcHMrKztcbiAgICB9IGVsc2UgaWYgKG51bWJlck9mU2hpcHMgPT09IDEwKSB7XG4gICAgICBjaGFuZ2VBbGxTaGlwc1BsYWNlZCgpO1xuICAgICAgY29uc29sZS5sb2coYWxsU2hpcHNQbGFjZWQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUdyaWQsXG4gICAgY3JlYXRlU2hpcCxcbiAgICBhbGxTaGlwc1BsYWNlZCxcbiAgICBudW1iZXJPZlNoaXBzLFxuICAgIGFsbFNoaXBzQ29vcmQsXG4gIH07XG59XG4iLCIvLyBpbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF5ZXIodXNlcikge1xuICBsZXQgd2lubmVyID0gZmFsc2U7XG4gIGxldCBzaGlwc0FycmF5ID0gW107XG4gIGNvbnN0IGFkZFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gICAgbGV0IG5ld1NoaXAgPSBzaGlwKGxlbmd0aCk7XG4gICAgc2hpcHNBcnJheS5wdXNoKG5ld1NoaXApO1xuICB9O1xuICByZXR1cm4geyB3aW5uZXIsIHNoaXBzQXJyYXksIGFkZFNoaXAgfTtcbn1cblxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyKHVzZXIpIHtcbi8vICAgY29uc3QgYXR0YWNrID0gKCkgPT4ge1xuLy8gICAgIGlmICh1c2VyID09IFwiY29tcHV0ZXJcIikge1xuLy8gICAgICAgbGV0IHJhbmRvbVJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbi8vICAgICAgIGxldCByYW5kb21Db2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vLyAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSBbXTtcbi8vICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocmFuZG9tUm93KTtcbi8vICAgICAgIGNvb3JkaW5hdGVzLnB1c2gocmFuZG9tQ29sdW1uKTtcbi8vICAgICAgIHJldHVybiBjb29yZGluYXRlcztcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgcmV0dXJuIHRydWU7XG4vLyAgICAgfVxuLy8gICB9O1xuLy8gICByZXR1cm4geyBhdHRhY2sgfTtcbi8vIH1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXAobGVuZ3RoLCBbaSwgal0pIHtcbiAgbGV0IGNvb3JkaW5hdGVzQXJyYXkgPSBbW2ksIGpdXTtcbiAgY29uc3QgbmV4dENvb3JkaW5hdGVzID0gKGNvb3JkaW5hdGVzKSA9PiB7XG4gICAgY29vcmRpbmF0ZXNBcnJheS5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgfTtcbiAgbGV0IGhpdHMgPSAwO1xuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgaWYgKGhpdHMgPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhpdHMrKztcbiAgfTtcbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChoaXRzID09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgbmV4dENvb3JkaW5hdGVzLFxuICAgIGNvb3JkaW5hdGVzQXJyYXksXG4gIH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgc2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgZ2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgZGlzcGxheUdyaWQgfSBmcm9tIFwiLi9kb20uanNcIjtcblxuZnVuY3Rpb24gc3RhcnROZXdHYW1lKCkge1xuICBsZXQgcGxheWVyMSA9IHBsYXllcihcInVzZXJcIik7XG4gIGxldCBwbGF5ZXIyID0gcGxheWVyKFwiY29tcHV0ZXJcIik7XG59XG5cbmNvbnN0IGxlZnRncmlkY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0Z3JpZGNvbnRhaW5lclwiKTtcbmNvbnN0IHJpZ2h0Z3JpZGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHRncmlkY29udGFpbmVyXCIpO1xuXG5mdW5jdGlvbiBuZXdHYW1lKCkge1xuICBsZXQgbGVmdEdhbWVib2FyZCA9IGdhbWVib2FyZCgxMCk7XG4gIGxldCByaWdodEdhbWVib2FyZCA9IGdhbWVib2FyZCgxMCk7XG4gIGxldCBsZWZ0R3JpZEFycmF5ID0gbGVmdEdhbWVib2FyZC5jcmVhdGVHcmlkKCk7IC8vaXMgYW4gYXJyYXlcbiAgbGV0IHJpZ2h0R3JpZEFycmF5ID0gcmlnaHRHYW1lYm9hcmQuY3JlYXRlR3JpZCgpOyAvLyBpcyBhbiBhcnJheVxuICBkaXNwbGF5R3JpZChsZWZ0R3JpZEFycmF5LCBsZWZ0Z3JpZGNvbnRhaW5lciwgXCJsZWZ0XCIsIGxlZnRHYW1lYm9hcmQpO1xuICBkaXNwbGF5R3JpZChyaWdodEdyaWRBcnJheSwgcmlnaHRncmlkY29udGFpbmVyLCBcInJpZ2h0XCIsIHJpZ2h0R2FtZWJvYXJkKTtcbiAgcmV0dXJuIHsgbGVmdEdhbWVib2FyZCwgcmlnaHRHYW1lYm9hcmQsIGxlZnRHcmlkQXJyYXksIHJpZ2h0R3JpZEFycmF5IH07XG59XG5cbm5ld0dhbWUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==