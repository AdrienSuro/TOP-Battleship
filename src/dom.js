export { displayGrid };

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
