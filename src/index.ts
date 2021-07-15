import { hexToRGB } from './utility/hexToRGB'
import { hslToRGB } from './utility/hslToRGB'
import { keywordToRGB } from './utility/keywordToRGB'
import { keywordToHex } from './utility/keywordToHex'
import { rgbToHex } from './utility/rgbToHex'
import { rgbToHSL } from './utility/rgbToHSL'

import { cssColorKeywords } from './utility/cssColorKeywords'
import { expandHexShorthand } from './utility/expandHexShorthand'
import { getRGBChannels } from './utility/getRGBChannels'

import { isValidHex } from './utility/isValidHex'
import { isValidHSL } from './utility/isValidHSL'
import { isValidRGB } from './utility/isValidRGB'

import type { ColorModel } from './types/ColorModel'

export default class Color {
  private originalValue: string
  private model: ColorModel

  constructor(colorString: string)
  constructor(color: Color)
  constructor(arg: Color | string) {
    if (typeof arg === 'string') {
      this.originalValue = arg

      this.model = (() => {
        if (arg.startsWith('#')) {
          if (isValidHex(arg)) return 'Hex'
        }
        const prefix = arg.substring(0, 3)

        switch (prefix) {
          case 'hsl':
            if (isValidHSL(arg)) return 'HSL'
            throw new Error(`Invalid HSL(A) color format. Received ${arg}`)
          case 'rgb':
            if (isValidRGB(arg)) return 'RGB'
            throw new Error(`Invalid RGB(A) color format. Received ${arg}`)
          default:
            if (cssColorKeywords[arg]) return 'Keyword'

            throw new Error(
              `Unknown color format. Expected RGB(A), HSL(A), Hexidecimal, or CSS Color Value. Received: ${arg}`,
            )
        }
      })()
    } else {
      this.originalValue = arg.originalValue
      this.model = arg.model
    }
  }

  rgb(): Color {
    switch (this.model) {
      case 'Hex':
        return new Color(hexToRGB(this.originalValue))
      case 'Keyword':
        return new Color(keywordToRGB(this.originalValue))
      case 'RGB':
        return new Color(this.originalValue)
      case 'HSL':
        return new Color(hslToRGB(this.originalValue))
    }
  }

  hex(): Color {
    switch (this.model) {
      case 'RGB':
        return new Color(rgbToHex(this.originalValue))
      case 'Hex':
        return new Color(`#${expandHexShorthand(this.originalValue)}`)
      case 'Keyword':
        return new Color(keywordToHex(this.originalValue))
      case 'HSL':
        return new Color(this.originalValue).rgb().hex()
    }
  }

  hsl(): Color {
    switch (this.model) {
      case 'RGB':
        return new Color(rgbToHSL(this.originalValue))
      case 'Keyword':
        return new Color(new Color(this.originalValue).rgb()).hsl()
      case 'Hex':
        return new Color(new Color(this.originalValue).rgb()).hsl()
      case 'HSL':
        return new Color(this.originalValue)
    }
  }

  toString() {
    return this.originalValue
  }

  get red() {
    const [r] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )
    return parseInt(r)
  }

  set red(newValue: number) {
    const [_, g, b, a] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )

    this.model = 'RGB'
    this.originalValue = `rgb${a ? 'a' : ''}(${[
      newValue,
      g,
      b,
      ...(a ? [a] : []) /** don't include alpha, if not defined */,
    ].join(', ')})`
  }

  get green() {
    const [_, g] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )
    return parseInt(g)
  }

  set green(newValue: number) {
    const [r, _, b, a] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )

    this.model = 'RGB'
    this.originalValue = `rgb${a ? 'a' : ''}(${[
      r,
      newValue,
      b,
      ...(a ? [a] : []) /** don't include alpha, if not defined */,
    ].join(', ')})`
  }

  get blue() {
    const [_, __, b] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )
    return parseInt(b)
  }

  set blue(newValue: number) {
    const [r, g, _, a] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )

    this.model = 'RGB'
    this.originalValue = `rgb${a ? 'a' : ''}(${[
      r,
      g,
      newValue,
      ...(a ? [a] : []) /** don't include alpha, if not defined */,
    ].join(', ')})`
  }

  get alpha() {
    const [_, __, ___, a] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )
    return parseFloat(a ?? '1')
  }

  set alpha(newValue: number) {
    const [r, g, b, _] = getRGBChannels(
      new Color(this.originalValue).rgb().originalValue,
    )

    this.model = 'RGB'
    this.originalValue = `rgba(${[r, g, b, newValue].join(', ')})`
  }
}
