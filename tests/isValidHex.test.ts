import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { isValidHex } from '../src/utility/isValidHex'

const module = suite('isValidHex')

module('throws if invalid', () => {
  const invalid = [
    '',
    '123',
    '1234',
    '#1234',
    '123456',
    '1234567',
    '#1234567',
    '12345678',
    'ghijkl',
    'mnopqr',
    'stuvwx',
    'yz1234',
  ]

  invalid.forEach(value => {
    const callWithInvalidArg = () => isValidHex(value)
    assert.throws(callWithInvalidArg)
  })
})

module.run()
