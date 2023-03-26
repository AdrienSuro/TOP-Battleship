import ship from "./ship.js";

export default function gameboard(width) {
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
      let newShip = ship(4, coordinates);
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
      let newShip = ship(3, coordinates);
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
      let newShip = ship(2, coordinates);
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
      let newShip = ship(1, coordinates);
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
