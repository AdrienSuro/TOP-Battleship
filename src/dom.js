export { displayGrid };
import { leftGameboard, rightGameboard, leftGridArray, rightGridArray } from "gamelogic.js"

function displayGrid(gridArray, location, gameboard) {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray.length; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", `C${i}${j}`);
      cell.addEventListener("click", () => {
        let cellCoordinates = ((cell.id).slice(1,3)).split("")
        if (gameboard.allShipsPlaced === false) {
          cell.toggleAttribute("class", "hasShip"); //créer la classe en css
          gameboard[i][j].hasShip = true;
          gameboard.createShip([i, j]);
        }
        else if (gameboard.allShipsPlaced === true) {
          if (gameboard[i][j].hasShip === true) {
            cell.toggleAttribute("class", "shipIsHit")
          }
          else if (gameboard[i][j].hasShip === false) {
            cell.toggleAttribute("class", "emptyIsHit")
          }
          
          // receive attack
        }
        receiveAttack(i, j); // MODIFIER LA FCT receveiveAttack pour qu'elle puisse répondre à cet event listener
        console.log(gridArray);
      });
      location.appendChild(cell);
    }
  }
}

// Essai pour créer un ship :
let shipsArray = [];
if ([i, j]) // n'est pas dans shipsArray alors créer un new ship : 
let newShip = ship(3, i, j);
// dans le cas d'une attaque :
if (shipsArray[i].coordinates === [5, 2]) // the second operand will be a variable passed to receiveattack
shipsArray.push(newShip);
// créer un find pour voir si les coordonnées attaquées correspondent à i, j d'un ship

// TEST FROM BOULOT : 

console.log(shipObject.addCoordinates([[0, 0], [0, 1], [0, 2]]));
