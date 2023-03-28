import Ship from "../src/Ship.js";

test("hit method works", () => {
  let testShip = new Ship(4, "battleship1");
  testShip.hit();
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk).toBeTruthy();
});

test("adding coordinates to ship", () => {
  let testShip = new Ship(3, "cruiser2");
  testShip.addCoordinates("a03");
  testShip.addCoordinates("a04");
  expect(testShip.coord).toMatchObject(["a03", "a04"]);
});
