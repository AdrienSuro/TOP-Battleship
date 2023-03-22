// import gameboard from "./gameboard.js";

export default function player(user) {
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
