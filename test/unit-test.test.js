const assert = require('chai').assert


function addValue(a, b) {
  return a+b
}

describe('Suite to test', () => {
  
  it('Should return 2', () => {
    const value = addValue(3,3)
    assert.equal(value, 6)
  })

})