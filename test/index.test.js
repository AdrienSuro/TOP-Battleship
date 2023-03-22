// const testForAdd = require('./index').default

import testForAdd from '../src/index.js';

test('test adding two positive nums', function() {
    
    expect(testForAdd(4, 5)).toBe(9);
});