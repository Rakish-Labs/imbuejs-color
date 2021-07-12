import type { ColorModel } from './types/ColorModel'
import { cssColorKeywords } from './utility/cssColorKeywords'
import { hexToRGB } from './utility/hexToRGB'
import { keywordToRGB } from './utility/keywordToRGB'
import { rgbToHex } from './utility/rgbToHex'
import { isValidHex } from './utility/isValidHex'
import { hslToRGB } from './utility/hslToRGB'
import { keywordToHex } from './utility/keywordToHex'
import { isValidHSL } from './utility/isValidHSL'
import { isValidRGB } from './utility/isValidRGB'

interface IColor {
  originalValue: string
  model: ColorModel
}

export default class Color implements IColor {
  public originalValue: string
  public model: ColorModel

  constructor(colorString: string)
  constructor(color: Color)
  constructor(arg: Color | string) {
    if (typeof arg === 'string') {
      this.originalValue = arg

      this.model = (() => {
        if (arg.startsWith('#')) {
          if (isValidHex(arg)) {
            return 'Hex'
          }
        }
        const prefix = arg.substring(0, 3)

        switch (prefix) {
          case 'hsl':
            if (isValidHSL(arg)) return 'HSL'
            throw new Error(`Invalid HSL(A) color format. Received ${arg}`)
          case 'rgb':
            if (isValidRGB(arg)) return 'RGB'
            throw new Error(`Invalid RGB(A) color format. Received $`)
          default:
            if (cssColorKeywords[arg]) return 'Keyword'

            throw new Error(
              `Unknown color format. Expected RGB(A), HSL(A), Lab, HWB, Hexidecimal, or CSS Color Value. Received: ${arg}`,
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
        return new Color(this.originalValue)
      case 'Keyword':
        return new Color(keywordToHex(this.originalValue))
      case 'HSL':
        return new Color(this.originalValue).rgb().hex()
    }
  }

  toString() {
    return this.originalValue
  }
}
