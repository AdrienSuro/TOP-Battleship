import ship from "./ship";

export default function gameboard(width) {
  const receiveAttack = () => {
    return true;
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
        rows[i].push({ isHit: false, hasShip: false });
      }
    }
    return rows;
  };
  return {
    receiveAttack,
    createShip,
    createGrid,
  };
}

let testGameboard = gameboard(10);
let z = testGameboard.createGrid();
console.log(testGameboard);
console.log(z);
