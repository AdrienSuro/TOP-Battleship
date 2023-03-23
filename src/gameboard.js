import ship from "./ship";

export default function gameboard(width) {
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
    let newShip = ship(length);
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
