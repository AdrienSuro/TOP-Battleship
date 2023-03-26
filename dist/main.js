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
      cell.setAttribute("id", `C${i}${j}`);
      cell.addEventListener("click", () => {
        console.log("Inside add EL");
        // let cellCoordinates = cell.id.slice(1, 3).split("");
        if (gameboard.allShipsPlaced === false) {
          console.log("Inside add EL && allShipsPlace = false");
          cell.classList.toggle("hasShip");
          gridArray[i][j].hasShip = true;
          console.log(gridArray); //Problème : comment mettre à jour les autres cases du ship ?
          gameboard.createShip([i, j]);
          gameboard.allShipsCoord.forEach((e) => {
            let i = e[0];
            let j = e[1];
            gridArray[i][j].hasShip = true;
            let getCell = document.getElementById(`C${i}${j}`);
            getCell.classList.toggle("hasShip");
          });
        } else if (gameboard.allShipsPlaced === true) {
          console.log("Inside add EL && allShipsPlace = true");
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
  const createShip = (coordinates) => {
    console.log("inside createShip");
    if (numberOfShips === 0) {
      console.log("inside number of ships = 0");
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, coordinates);
      allShipsCoord.push(coordinates);
      for (let i = 1; i < newShip.length; i++) {
        console.log("inside for loop");
        console.log(newShip.length);
        let promptCoordinates = prompt(
          "Enter new coordinates in this format 03"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      newShip.coordinatesArray.forEach((e) => {
        console.log(
          "allShipsCoord / inside loop that adds each coord that has ship"
        );
        allShipsCoord.push(e);
      });
      console.log(shipsArray);
      numberOfShips++;
      return shipsArray;
    } else if (numberOfShips === 1 || numberOfShips === 2) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(3, coordinates);
      for (let i = 1; i < newShip.length; i++) {
        let promptCoordinates = prompt(
          "Enter new coordinates in this format 03"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      numberOfShips++;
    } else if (
      numberOfShips === 3 ||
      numberOfShips === 4 ||
      numberOfShips === 5
    ) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, coordinates);
      for (let i = 1; i < newShip.length; i++) {
        let promptCoordinates = prompt(
          "Enter new coordinates in this format [0, 3]"
        );
        let coordArray = [];
        [...promptCoordinates].forEach((e) => coordArray.push(parseInt(e)));
        newShip.nextCoordinates(coordArray);
      }
      shipsArray.push(newShip);
      numberOfShips++;
    } else if (
      numberOfShips === 6 ||
      numberOfShips === 7 ||
      numberOfShips === 8 ||
      numberOfShips === 9
    ) {
      let newShip = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, coordinates);
      shipsArray.push(newShip);
      numberOfShips++;
    } else if (numberOfShips == 10) {
      allShipsPlaced = true;
      return;
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
  console.log("inside ship");
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
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(leftGridArray, leftgridcontainer, leftGameboard);
  (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.displayGrid)(rightGridArray, rightgridcontainer, rightGameboard);
  return { leftGameboard, rightGameboard, leftGridArray, rightGridArray };
}

newGame();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3AtYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvcC1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9wLWJhdHRsZXNoaXAvLi9zcmMvZ2FtZWxvZ2ljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IGRpc3BsYXlHcmlkIH07XG5cbmZ1bmN0aW9uIGRpc3BsYXlHcmlkKGdyaWRBcnJheSwgbG9jYXRpb24sIGdhbWVib2FyZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JpZEFycmF5Lmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsLnNldEF0dHJpYnV0ZShcImlkXCIsIGBDJHtpfSR7an1gKTtcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJbnNpZGUgYWRkIEVMXCIpO1xuICAgICAgICAvLyBsZXQgY2VsbENvb3JkaW5hdGVzID0gY2VsbC5pZC5zbGljZSgxLCAzKS5zcGxpdChcIlwiKTtcbiAgICAgICAgaWYgKGdhbWVib2FyZC5hbGxTaGlwc1BsYWNlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBhZGQgRUwgJiYgYWxsU2hpcHNQbGFjZSA9IGZhbHNlXCIpO1xuICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnRvZ2dsZShcImhhc1NoaXBcIik7XG4gICAgICAgICAgZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGdyaWRBcnJheSk7IC8vUHJvYmzDqG1lIDogY29tbWVudCBtZXR0cmUgw6Agam91ciBsZXMgYXV0cmVzIGNhc2VzIGR1IHNoaXAgP1xuICAgICAgICAgIGdhbWVib2FyZC5jcmVhdGVTaGlwKFtpLCBqXSk7XG4gICAgICAgICAgZ2FtZWJvYXJkLmFsbFNoaXBzQ29vcmQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGkgPSBlWzBdO1xuICAgICAgICAgICAgbGV0IGogPSBlWzFdO1xuICAgICAgICAgICAgZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGdldENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgQyR7aX0ke2p9YCk7XG4gICAgICAgICAgICBnZXRDZWxsLmNsYXNzTGlzdC50b2dnbGUoXCJoYXNTaGlwXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGdhbWVib2FyZC5hbGxTaGlwc1BsYWNlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW5zaWRlIGFkZCBFTCAmJiBhbGxTaGlwc1BsYWNlID0gdHJ1ZVwiKTtcbiAgICAgICAgICBpZiAoZ3JpZEFycmF5W2ldW2pdLmhhc1NoaXAgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNlbGwudG9nZ2xlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzaGlwSXNIaXRcIik7XG4gICAgICAgICAgfSBlbHNlIGlmIChncmlkQXJyYXlbaV1bal0uaGFzU2hpcCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNlbGwudG9nZ2xlQXR0cmlidXRlKFwiY2xhc3NcIiwgXCJlbXB0eUlzSGl0XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhdGlvbi5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZWJvYXJkKHdpZHRoKSB7XG4gIGxldCBhbGxTaGlwc0Nvb3JkID0gW107XG4gIGxldCBzaGlwc0FycmF5ID0gW107IC8vYXJyYXkgZCdvYmpldHMgc2hpcCBxdSdvbiB2YSBsb29wZXIgcG91ciB2b2lyIHNpIGxhIGNhc2UgY2xpcXXDqWUgYSB1biBiYXRlYXUgZXQgaWRlbnRpZmllciBsZSBiYXRlYXUgXCLDoCBkw6l0cnVpcmVcIlxuICBsZXQgYWxsU2hpcHNQbGFjZWQgPSBmYWxzZTtcbiAgbGV0IG51bWJlck9mU2hpcHMgPSAwO1xuICBjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuICAgIGNvbnN0IGdhbWVib2FyZEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRBcnJheS5wdXNoKFtdKTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgd2lkdGg7IGorKykge1xuICAgICAgICBnYW1lYm9hcmRBcnJheVtpXS5wdXNoKHtcbiAgICAgICAgICBpc0hpdDogZmFsc2UsXG4gICAgICAgICAgaGFzU2hpcDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ2FtZWJvYXJkQXJyYXk7XG4gIH07XG4gIGNvbnN0IGNyZWF0ZVNoaXAgPSAoY29vcmRpbmF0ZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImluc2lkZSBjcmVhdGVTaGlwXCIpO1xuICAgIGlmIChudW1iZXJPZlNoaXBzID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImluc2lkZSBudW1iZXIgb2Ygc2hpcHMgPSAwXCIpO1xuICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwKDQsIGNvb3JkaW5hdGVzKTtcbiAgICAgIGFsbFNoaXBzQ29vcmQucHVzaChjb29yZGluYXRlcyk7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG5ld1NoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgZm9yIGxvb3BcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1NoaXAubGVuZ3RoKTtcbiAgICAgICAgbGV0IHByb21wdENvb3JkaW5hdGVzID0gcHJvbXB0KFxuICAgICAgICAgIFwiRW50ZXIgbmV3IGNvb3JkaW5hdGVzIGluIHRoaXMgZm9ybWF0IDAzXCJcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGNvb3JkQXJyYXkgPSBbXTtcbiAgICAgICAgWy4uLnByb21wdENvb3JkaW5hdGVzXS5mb3JFYWNoKChlKSA9PiBjb29yZEFycmF5LnB1c2gocGFyc2VJbnQoZSkpKTtcbiAgICAgICAgbmV3U2hpcC5uZXh0Q29vcmRpbmF0ZXMoY29vcmRBcnJheSk7XG4gICAgICB9XG4gICAgICBzaGlwc0FycmF5LnB1c2gobmV3U2hpcCk7XG4gICAgICBuZXdTaGlwLmNvb3JkaW5hdGVzQXJyYXkuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcImFsbFNoaXBzQ29vcmQgLyBpbnNpZGUgbG9vcCB0aGF0IGFkZHMgZWFjaCBjb29yZCB0aGF0IGhhcyBzaGlwXCJcbiAgICAgICAgKTtcbiAgICAgICAgYWxsU2hpcHNDb29yZC5wdXNoKGUpO1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhzaGlwc0FycmF5KTtcbiAgICAgIG51bWJlck9mU2hpcHMrKztcbiAgICAgIHJldHVybiBzaGlwc0FycmF5O1xuICAgIH0gZWxzZSBpZiAobnVtYmVyT2ZTaGlwcyA9PT0gMSB8fCBudW1iZXJPZlNoaXBzID09PSAyKSB7XG4gICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoMywgY29vcmRpbmF0ZXMpO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwcm9tcHRDb29yZGluYXRlcyA9IHByb21wdChcbiAgICAgICAgICBcIkVudGVyIG5ldyBjb29yZGluYXRlcyBpbiB0aGlzIGZvcm1hdCAwM1wiXG4gICAgICAgICk7XG4gICAgICAgIGxldCBjb29yZEFycmF5ID0gW107XG4gICAgICAgIFsuLi5wcm9tcHRDb29yZGluYXRlc10uZm9yRWFjaCgoZSkgPT4gY29vcmRBcnJheS5wdXNoKHBhcnNlSW50KGUpKSk7XG4gICAgICAgIG5ld1NoaXAubmV4dENvb3JkaW5hdGVzKGNvb3JkQXJyYXkpO1xuICAgICAgfVxuICAgICAgc2hpcHNBcnJheS5wdXNoKG5ld1NoaXApO1xuICAgICAgbnVtYmVyT2ZTaGlwcysrO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBudW1iZXJPZlNoaXBzID09PSAzIHx8XG4gICAgICBudW1iZXJPZlNoaXBzID09PSA0IHx8XG4gICAgICBudW1iZXJPZlNoaXBzID09PSA1XG4gICAgKSB7XG4gICAgICBsZXQgbmV3U2hpcCA9IHNoaXAoMiwgY29vcmRpbmF0ZXMpO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuZXdTaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBwcm9tcHRDb29yZGluYXRlcyA9IHByb21wdChcbiAgICAgICAgICBcIkVudGVyIG5ldyBjb29yZGluYXRlcyBpbiB0aGlzIGZvcm1hdCBbMCwgM11cIlxuICAgICAgICApO1xuICAgICAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgICAgICBbLi4ucHJvbXB0Q29vcmRpbmF0ZXNdLmZvckVhY2goKGUpID0+IGNvb3JkQXJyYXkucHVzaChwYXJzZUludChlKSkpO1xuICAgICAgICBuZXdTaGlwLm5leHRDb29yZGluYXRlcyhjb29yZEFycmF5KTtcbiAgICAgIH1cbiAgICAgIHNoaXBzQXJyYXkucHVzaChuZXdTaGlwKTtcbiAgICAgIG51bWJlck9mU2hpcHMrKztcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgbnVtYmVyT2ZTaGlwcyA9PT0gNiB8fFxuICAgICAgbnVtYmVyT2ZTaGlwcyA9PT0gNyB8fFxuICAgICAgbnVtYmVyT2ZTaGlwcyA9PT0gOCB8fFxuICAgICAgbnVtYmVyT2ZTaGlwcyA9PT0gOVxuICAgICkge1xuICAgICAgbGV0IG5ld1NoaXAgPSBzaGlwKDEsIGNvb3JkaW5hdGVzKTtcbiAgICAgIHNoaXBzQXJyYXkucHVzaChuZXdTaGlwKTtcbiAgICAgIG51bWJlck9mU2hpcHMrKztcbiAgICB9IGVsc2UgaWYgKG51bWJlck9mU2hpcHMgPT0gMTApIHtcbiAgICAgIGFsbFNoaXBzUGxhY2VkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVHcmlkLFxuICAgIGNyZWF0ZVNoaXAsXG4gICAgYWxsU2hpcHNQbGFjZWQsXG4gICAgbnVtYmVyT2ZTaGlwcyxcbiAgICBhbGxTaGlwc0Nvb3JkLFxuICB9O1xufVxuIiwiLy8gaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBzaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxheWVyKHVzZXIpIHtcbiAgbGV0IHdpbm5lciA9IGZhbHNlO1xuICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuICBjb25zdCBhZGRTaGlwID0gKGxlbmd0aCkgPT4ge1xuICAgIGxldCBuZXdTaGlwID0gc2hpcChsZW5ndGgpO1xuICAgIHNoaXBzQXJyYXkucHVzaChuZXdTaGlwKTtcbiAgfTtcbiAgcmV0dXJuIHsgd2lubmVyLCBzaGlwc0FycmF5LCBhZGRTaGlwIH07XG59XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXllcih1c2VyKSB7XG4vLyAgIGNvbnN0IGF0dGFjayA9ICgpID0+IHtcbi8vICAgICBpZiAodXNlciA9PSBcImNvbXB1dGVyXCIpIHtcbi8vICAgICAgIGxldCByYW5kb21Sb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vLyAgICAgICBsZXQgcmFuZG9tQ29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgICAgbGV0IGNvb3JkaW5hdGVzID0gW107XG4vLyAgICAgICBjb29yZGluYXRlcy5wdXNoKHJhbmRvbVJvdyk7XG4vLyAgICAgICBjb29yZGluYXRlcy5wdXNoKHJhbmRvbUNvbHVtbik7XG4vLyAgICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIHJldHVybiB0cnVlO1xuLy8gICAgIH1cbi8vICAgfTtcbi8vICAgcmV0dXJuIHsgYXR0YWNrIH07XG4vLyB9XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwKGxlbmd0aCwgW2ksIGpdKSB7XG4gIGNvbnNvbGUubG9nKFwiaW5zaWRlIHNoaXBcIik7XG4gIGxldCBjb29yZGluYXRlc0FycmF5ID0gW1tpLCBqXV07XG4gIGNvbnN0IG5leHRDb29yZGluYXRlcyA9IChjb29yZGluYXRlcykgPT4ge1xuICAgIGNvb3JkaW5hdGVzQXJyYXkucHVzaChjb29yZGluYXRlcyk7XG4gIH07XG4gIGxldCBoaXRzID0gMDtcbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIGlmIChoaXRzID09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBoaXRzKys7XG4gIH07XG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaGl0cyA9PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICByZXR1cm4ge1xuICAgIGxlbmd0aCxcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIG5leHRDb29yZGluYXRlcyxcbiAgICBjb29yZGluYXRlc0FycmF5LFxuICB9O1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IHNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IGdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCB7IGRpc3BsYXlHcmlkIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmZ1bmN0aW9uIHN0YXJ0TmV3R2FtZSgpIHtcbiAgbGV0IHBsYXllcjEgPSBwbGF5ZXIoXCJ1c2VyXCIpO1xuICBsZXQgcGxheWVyMiA9IHBsYXllcihcImNvbXB1dGVyXCIpO1xufVxuXG5jb25zdCBsZWZ0Z3JpZGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVmdGdyaWRjb250YWluZXJcIik7XG5jb25zdCByaWdodGdyaWRjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJpZ2h0Z3JpZGNvbnRhaW5lclwiKTtcblxuZnVuY3Rpb24gbmV3R2FtZSgpIHtcbiAgbGV0IGxlZnRHYW1lYm9hcmQgPSBnYW1lYm9hcmQoMTApO1xuICBsZXQgcmlnaHRHYW1lYm9hcmQgPSBnYW1lYm9hcmQoMTApO1xuICBsZXQgbGVmdEdyaWRBcnJheSA9IGxlZnRHYW1lYm9hcmQuY3JlYXRlR3JpZCgpOyAvL2lzIGFuIGFycmF5XG4gIGxldCByaWdodEdyaWRBcnJheSA9IHJpZ2h0R2FtZWJvYXJkLmNyZWF0ZUdyaWQoKTsgLy8gaXMgYW4gYXJyYXlcbiAgZGlzcGxheUdyaWQobGVmdEdyaWRBcnJheSwgbGVmdGdyaWRjb250YWluZXIsIGxlZnRHYW1lYm9hcmQpO1xuICBkaXNwbGF5R3JpZChyaWdodEdyaWRBcnJheSwgcmlnaHRncmlkY29udGFpbmVyLCByaWdodEdhbWVib2FyZCk7XG4gIHJldHVybiB7IGxlZnRHYW1lYm9hcmQsIHJpZ2h0R2FtZWJvYXJkLCBsZWZ0R3JpZEFycmF5LCByaWdodEdyaWRBcnJheSB9O1xufVxuXG5uZXdHYW1lKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=