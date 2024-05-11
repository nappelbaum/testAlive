import { describe, it } from 'mocha'
import { assert } from 'chai'
import pow from './func.js'

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(2), 1)
    })
  })
})

describe('pow', function () {
  function makeTest(x) {
    let expected = x * x * x
    it(`${x} в степени 3 будет ${expected}`, function () {
      assert.equal(pow(x, 3), expected)
    })
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x)
  }

  it('для отрицательных n возвращает NaN', function () {
    assert.isNaN(pow(2, -1))
  })

  it('для дробных n возвращает NaN', function () {
    assert.isNaN(pow(2, 1.5))
  })
})
