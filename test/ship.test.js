import ship from'../src/ship.js';

test('"is sunk" fct works', function() {
    let newShip = ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
})

test('"is sunk" can be falsy', function() {
    let newShip = ship(10);
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(false);
})

test('cannot hit more than length of ship', function() {
    let newShip = ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.hit()).toBe(undefined)
})