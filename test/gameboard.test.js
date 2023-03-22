import gameboard from "../src/gameboard.js";

test("createGrid returns an array", function () {
  let newGameboard = gameboard(4);
  expect(typeof newGameboard.createGrid()).toBe("object");
});

test("gameBoard createShip returns an object", function () {
  let newGameboard = gameboard(4);
  expect(typeof newGameboard.createShip(3)).toBe("object");
});

test("Receive attack returns true", function () {
  let newGameboard = gameboard(10);
  expect(newGameboard.receiveAttack()).toBe(true);
});
