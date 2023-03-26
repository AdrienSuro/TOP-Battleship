export default function ship(length, [i, j]) {
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
    hit,
    isSunk,
    nextCoordinates,
  };
}
