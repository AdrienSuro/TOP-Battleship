import Gameboard from "../src/gameboard.js";

test("gameboard can return an array", function () {
  let gameboardA = new Gameboard("a");
  let gameboardArrayA = gameboardA.getGameboardArray();
  expect(typeof gameboardArrayA).toBe("object");
});

test("gameboardArray returns cell Id in format 'a4'", function () {
  let gameboardA = new Gameboard("a");
  let gameboardArrayA = gameboardA.getGameboardArray();
  expect(gameboardArrayA[4].cellId).toBe("a4");
});
