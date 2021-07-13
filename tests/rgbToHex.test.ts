import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { rgbToHex } from '../src/utility/rgbToHex'

const module = suite('rgbToHex')

module('throws if an RGB component is invalid', () => {
  const invalid = [
    'rgba(-1, 0, 0, 1)',
    'rgba(256, 0, 0, 1)',
    'rgba(0, -1, 0, 1)',
    'rgba(0, 256, 0, 1)',
    'rgba(0, 0, -1, 1)',
    'rgba(0, 0, 256, 1)',
  ]

  invalid.forEach(value => {
    const callWithInvlidArg = () => rgbToHex(value)
    assert.throws(callWithInvlidArg)
  })
})

module.run()
