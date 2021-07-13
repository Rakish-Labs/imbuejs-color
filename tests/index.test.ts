import * as assert from 'uvu/assert'
import { suite } from 'uvu'

import Color from '../src/index'

const colorClass = suite('Color')

colorClass('maintains the originally passed value', () => {
  const expected = '#000000'
  const color = new Color(expected)

  assert.equal(color.toString(), '#000000')
})

colorClass('converts hexadecimal to rgb', () => {
  const inputs = [
    /** 6 Digit Hex */
    '#000000',
    '#ffffff',
    /** Hex with alpha */
    '#DD2D4ABB',
    /** Hex with 3-digit shorthand */
    '#123',
  ]
  const expectedValues = [
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgba(221, 45, 74, 0.73)',
    'rgb(17, 34, 51)',
  ]

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).rgb().toString(), expected)
  })
})

colorClass('hex to hex expands shorthand', () => {
  const inputs = ['#123', '#112233', '#11223380']
  const expectedValues = ['#112233', '#112233', '#11223380']

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).hex().toString(), expected)
  })
})

colorClass('converts rgb to hexadecimal', () => {
  const inputs = [
    'rgb(0, 0, 0)',
    'rgb(0 0 0)',
    'rgb(255, 255, 255)',
    'rgb(255 255 255)',
    'rgba(221, 45, 74, 0.73)',
    'rgba(200, 255, 240, 20%)',
    'rgba(200, 255, 240, 20%)',
    'rgb(17, 34, 51)',
    'rgb(17 34 51)',
  ]

  const expectedValues = [
    /** 6 Digit Hex */
    '#000000',
    '#000000',
    '#FFFFFF',
    '#FFFFFF',
    /** Hex with alpha */
    '#DD2D4ABB',
    '#C8FFF014',
    '#C8FFF014',
    /** Hex with 3-digit shorthand */
    '#112233',
  ]

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).hex().toString(), expected)
  })
})

colorClass('converts CSS keyword to rgb', () => {
  const inputs = ['black', 'rebeccapurple', 'palevioletred', 'white']

  const expectedValues = [
    'rgb(0, 0, 0)',
    'rgb(102, 51, 153)',
    'rgb(219, 112, 147)',
    'rgb(255, 255, 255)',
  ]

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).rgb().toString(), expected)
  })
})

colorClass('converts hsl to rgb(a)', () => {
  const inputs = [
    'hsl(0 0% 100%)',
    'hsl(0, 0%, 100%)',
    'hsl(0, 0%, 0%)',
    'hsl(0 0% 0%)',
    'hsl(340, 59.8%, 64.9%)',
    'hsl(340 59.8% 64.9%)',
    'hsla(0, 0%, 0%, .5)',
    'hsla(0, 0%, 0%, 50%)',
    'hsl(3.141592653589793rad, 100.0%, 74.1%)', // π radians === 180º
    'hsl(3.141592653589793rad 100.0% 74.1%)', // π radians === 180º
  ]

  const expectedValues = [
    'rgb(255, 255, 255)',
    'rgb(255, 255, 255)',
    'rgb(0, 0, 0)',
    'rgb(0, 0, 0)',
    'rgb(219, 111, 147)',
    'rgb(219, 111, 147)',
    'rgba(0, 0, 0, .5)',
    'rgba(0, 0, 0, 50%)',
    'rgb(122, 255, 255)',
    'rgb(122, 255, 255)',
  ]

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).rgb().toString(), expected)
  })
})

colorClass('converts CSS keyword to hex', () => {
  const inputs = ['black', 'rebeccapurple', 'palevioletred', 'white']

  const expectedValues = ['#000000', '#663399', '#DB7093', '#FFFFFF']

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).hex().toString(), expected)
  })
})

colorClass('converts hsl to hex', () => {
  const inputs = [
    'hsl(0 0% 100%)',
    'hsl(0, 0%, 100%)',
    'hsl(0, 0%, 0%)',
    'hsl(0 0% 0%)',
    'hsl(340, 59.8%, 64.9%)',
    'hsl(340 59.8% 64.9%)',
    'hsla(0, 0%, 0%, .5)',
    'hsl(3.141592653589793rad, 100.0%, 74.1%)', // π radians === 180º
    'hsl(.5turn 100.0% 74.1%)', // π radians === 180º
  ]

  const expectedValues = [
    '#FFFFFF',
    '#FFFFFF',
    '#000000',
    '#000000',
    '#DB6F93',
    '#DB6F93',
    '#00000080',
    '#7AFFFF',
    '#7AFFFF',
  ]

  expectedValues.forEach((expected: string, index: number) => {
    assert.equal(new Color(inputs[index]).hex().toString(), expected)
  })
})

colorClass('validates CSS keyword', () => {
  const invalid = 'invalid'
  const instantiateColorWithInvalidKeyword = () => new Color(invalid)
  assert.throws(instantiateColorWithInvalidKeyword)
})

colorClass('validates hex', () => {
  const invalid = [
    '#12345',
    '123', // no hex symbol
    '123456', // no hex symbol
    '12345678', // no hex symbol
    '#1', // one value
    '#22', // two values
    '#4444', // four values
    '#55555', // five values
    '#7777777', // seven values
    '#999999999', // nine values
  ]
  invalid.forEach(value => {
    const instantiateColorWithInvalidHex = () => new Color(value)
    assert.throws(instantiateColorWithInvalidHex)
  })
})

colorClass('validates hsl', () => {
  const invalid = [
    'hsl', // missing everything
    'hsl()', // missing everything
    'hsla', // missing everything
    'hsla()', // missing everything
    'hsl(2)', // only 1 value
    'hsla(2)', // only 1 value
    'hsl(100, 100%)', // only 2 values
    'hsl(100, 100%)', // only 2 values
    'hsl(6, 6, 6)', // missing % units for saturation and lightness
    'hsla(6, 6, 6, .5)', // missing % units for saturation and lightness
    'hsla(6deg 6% 6% .5)', // hsla requires ", " separator
    'hsl(10deg, 50%, 50%, .5)', // missina 'a' alpha modifier
    'hsl(10deg, 50%, 50%, 200)', // invalid alpha
  ]

  invalid.forEach(value => {
    const instantiateColorWithInvalidHSL = () => new Color(value)
    assert.throws(instantiateColorWithInvalidHSL)
  })
})

colorClass('validates rgb', () => {
  const invalid = [
    'rgb', // missing everything
    'rgb()', // missing everything
    'rgba', // missing everything
    'rgba()', // missing everything
    'rgb(2)', // only 1 value
    'rgba(2)', // only 1 value
    'rgb(100, 100)', // only 2 values
    'rgb(100, 100)', // only 2 values
    'rgb(256, 100, 100)', // invalid values
    'rgba(1, 256, 0)', // invalid values
    'rgb(100, 100, 256)', // invalid values
    'rgba(-1, 100, 100)', // invalid values
    'rgb(199, -2, 100)', // invalid values
    'rgb(100, 100, -1)', // invalid values
    'rgba(100, 100, 100, 200%)', // invalid values
    'rgba(100 100 100 100%)', // missing commas for rgba
  ]

  invalid.forEach(value => {
    const instantiateColorWithInvalidRGB = () => new Color(value)
    assert.throws(instantiateColorWithInvalidRGB)
  })
})

colorClass('has a red getter that returns the red channel', () => {
  assert.equal(255, new Color('#ff0000').red)
  assert.equal(0, new Color('#000000').red)
  assert.equal(128, new Color('#800000').red)
})

colorClass(
  "has a red setter that sets the class' red channel and sets its model to RGB",
  () => {
    const color = new Color('#ff000080')
    assert.equal(255, color.red)

    color.red = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)
  },
)

colorClass('has a green getter that returns the green channel', () => {
  assert.equal(255, new Color('#00ff00').green)
  assert.equal(0, new Color('#000000').green)
  assert.equal(128, new Color('#008000').green)
})

colorClass(
  "has a green setter that sets the class' green channel and sets its model to RGB",
  () => {
    const color = new Color('#00ff0080')
    assert.equal(255, color.green)

    color.green = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)
  },
)

colorClass('has a blue getter that returns the blue channel', () => {
  assert.equal(255, new Color('#0000ff').blue)
  assert.equal(0, new Color('#000000').blue)
  assert.equal(128, new Color('#000080').blue)
})

colorClass(
  "has a blue setter that sets the class' blue channel and sets its model to RGB",
  () => {
    const color = new Color('#0000ff80')
    assert.equal(255, color.blue)

    color.blue = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)
  },
)

colorClass('has an alpha getter that returns the alpha channel', () => {
  assert.equal(1.0, new Color('#0000ffff').alpha)
  assert.equal(0, new Color('#00000000').alpha)
  assert.equal(0.5, new Color('#00008080').alpha)
})

colorClass(
  "has an alpha setter that sets the class' alpha channel and sets its model to RGB",
  () => {
    const color = new Color('#0000ff80')
    assert.equal(0.5, color.alpha)

    color.alpha = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(255, color.blue)
    assert.equal(0, color.alpha)
  },
)

colorClass.run()
