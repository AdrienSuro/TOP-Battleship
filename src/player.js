// import gameboard from "./gameboard.js";
import ship from "./ship.js";

export default function player(user) {
  let winner = false;
  let shipsArray = [];
  const addShip = (length) => {
    let newShip = ship(length);
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
