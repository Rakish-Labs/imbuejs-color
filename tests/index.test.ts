import * as assert from 'uvu/assert'
import { suite } from 'uvu'

import Color from '../src/index'

const colorClass = suite('Color')

colorClass('maintains the originally passed value', () => {
  const expected = '#000000'
  const color = new Color(expected)

  assert.equal(color.toString(), '#000000')
})

colorClass('accepts an instance of itself as argument', () => {
  const color = new Color('#000000')
  const anotherColor = new Color(color)

  assert.equal(anotherColor.hex().toString(), '#000000')
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
    '#000000',
    '#000000',
    '#FFFFFF',
    '#FFFFFF',
    '#DD2D4ABB',
    '#C8FFF033',
    '#C8FFF033',
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
    'hsla(0deg, 0%, 0%, 50%)',
    'hsl(3.141592653589793rad, 100.0%, 74.1%)', // ?? radians === 180??
    'hsl(3.141592653589793rad 100.0% 74.1%)', // ?? radians === 180??
    'hsl(61 100.0% 74.1%)',
    'hsl(121 100.0% 74.1%)',
    'hsl(241 100.0% 74.1%)',
    'hsl(1turn 100% 90%)',
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
    'rgba(0, 0, 0, 50%)',
    'rgb(122, 255, 255)',
    'rgb(122, 255, 255)',
    'rgb(252, 255, 122)',
    'rgb(122, 255, 125)',
    'rgb(125, 122, 255)',
    'rgb(255, 204, 204)',
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
    'hsl(3.141592653589793rad, 100.0%, 74.1%)', // ?? radians === 180??
    'hsl(.5turn 100.0% 74.1%)', // ?? radians === 180??
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

colorClass('hsl to hsl returns original value', () => {
  const inputs = [
    'hsl(270, 50%, 40%)',
    'hsla(270, 50%, 40%, 1)',
    'hsla(270deg, 50%, 40%, 1)',
    'hsla(270, 50%, 40%, 0.5)',
  ]

  const expectedOutputs = [
    'hsl(270, 50%, 40%)',
    'hsla(270, 50%, 40%, 1)',
    'hsla(270deg, 50%, 40%, 1)',
    'hsla(270, 50%, 40%, 0.5)',
  ]

  expectedOutputs.forEach((value: string, index: number) => {
    assert.equal(value, new Color(inputs[index]).hsl().toString())
  })
})

colorClass('converts keyword to hsl', () => {
  const inputs = ['palevioletred', 'rebeccapurple']
  const expectedOutputs = ['hsl(340, 60%, 65%)', 'hsl(270, 50%, 40%)']

  expectedOutputs.forEach((value: string, index: number) => {
    assert.equal(value, new Color(inputs[index]).hsl().toString())
  })
})

colorClass('converts hex to hsl', () => {
  const inputs = ['#639', '#663399', '#663399ff', '#66339980']
  const expectedOutputs = [
    'hsl(270, 50%, 40%)',
    'hsl(270, 50%, 40%)',
    'hsla(270, 50%, 40%, 1)',
    'hsla(270, 50%, 40%, 0.5)',
  ]

  expectedOutputs.forEach((value: string, index: number) => {
    assert.equal(new Color(inputs[index]).hsl().toString(), value)
  })
})

colorClass('converts rgb to hsl', () => {
  const inputs = [
    'rgb(102, 51, 183)',
    'rgb(102 51 183)',
    'rgb(40% 20% 71.71%)',
    'rgba(102, 51, 183, .5)',
    'rgba(102, 51, 183, 50%)',
    'rgb(0, 255, 0)',
    'rgb(254, 255, 1)',
    'rgb(0, 0, 0)',
    'rgb(255 255 255)',
  ]

  const expectedOutputs = [
    'hsl(263, 56%, 46%)',
    'hsl(263, 56%, 46%)',
    'hsl(263, 56%, 46%)',
    'hsla(263, 56%, 46%, 0.5)',
    'hsla(263, 56%, 46%, 0.5)',
    'hsl(120, 100%, 50%)',
    'hsl(60, 100%, 50%)',
    'hsl(0, 0%, 0%)',
    'hsl(0, 0%, 100%)',
  ]

  expectedOutputs.forEach((value: string, index: number) => {
    assert.equal(new Color(inputs[index]).hsl().toString(), value)
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
    /** With alpha */
    const color = new Color('#ff000080')
    assert.equal(255, color.red)
    assert.equal('#ff000080', color['originalValue'])
    assert.equal('Hex', color['model'])

    color.red = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)

    assert.equal('rgba(0, 0, 0, 0.50)', color['originalValue'])
    assert.equal('RGB', color['model'])

    /* Without alpha */
    const withoutAlpha = new Color('#ff0000')
    assert.equal(255, withoutAlpha.red)
    assert.equal('#ff0000', withoutAlpha['originalValue'])
    assert.equal('Hex', withoutAlpha['model'])

    withoutAlpha.red = 0

    assert.equal(0, withoutAlpha.red)
    assert.equal(0, withoutAlpha.green)
    assert.equal(0, withoutAlpha.blue)
    assert.equal(1, withoutAlpha.alpha)

    assert.equal('rgb(0, 0, 0)', withoutAlpha['originalValue'])
    assert.equal('RGB', withoutAlpha['model'])
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
    /** With alpha */
    const color = new Color('#00ff0080')
    assert.equal(255, color.green)
    assert.equal('#00ff0080', color['originalValue'])
    assert.equal('Hex', color['model'])

    color.green = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)

    assert.equal('rgba(0, 0, 0, 0.50)', color['originalValue'])
    assert.equal('RGB', color['model'])

    /* Without alpha */
    const withoutAlpha = new Color('#00ff00')
    assert.equal(255, withoutAlpha.green)
    assert.equal('#00ff00', withoutAlpha['originalValue'])
    assert.equal('Hex', withoutAlpha['model'])

    withoutAlpha.green = 0

    assert.equal(0, withoutAlpha.red)
    assert.equal(0, withoutAlpha.green)
    assert.equal(0, withoutAlpha.blue)
    assert.equal(1, withoutAlpha.alpha)

    assert.equal('rgb(0, 0, 0)', withoutAlpha['originalValue'])
    assert.equal('RGB', withoutAlpha['model'])
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
    /** With alpha */
    const color = new Color('#0000ff80')
    assert.equal(255, color.blue)

    color.blue = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(0, color.blue)
    assert.equal(0.5, color.alpha)

    /* Without alpha */
    const withoutAlpha = new Color('#0000ff')
    assert.equal(255, withoutAlpha.blue)
    assert.equal('#0000ff', withoutAlpha['originalValue'])
    assert.equal('Hex', withoutAlpha['model'])

    withoutAlpha.blue = 0

    assert.equal(0, withoutAlpha.red)
    assert.equal(0, withoutAlpha.green)
    assert.equal(0, withoutAlpha.blue)
    assert.equal(1, withoutAlpha.alpha)

    assert.equal('rgb(0, 0, 0)', withoutAlpha['originalValue'])
    assert.equal('RGB', withoutAlpha['model'])
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
    assert.equal('Hex', color['model'])
    assert.equal('#0000ff80', color['originalValue'])

    color.alpha = 0

    assert.equal(0, color.red)
    assert.equal(0, color.green)
    assert.equal(255, color.blue)
    assert.equal(0, color.alpha)

    assert.equal('RGB', color['model'])
    assert.equal('rgba(0, 0, 255, 0)', color['originalValue'])
  },
)

colorClass.run()
