export { displayGrid };

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
