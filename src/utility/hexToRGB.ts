import { expandHexShorthand } from './expandHexShorthand'

export const hexToRGB = (hex: string) => {
  /** Expand Shorthand */
  hex = expandHexShorthand(hex)

  /** With alpha */
  if (hex.length === 8) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex,
    )

    const alpha = parseFloat(
      (parseInt(result[4], 16) / 255).toString(),
    ).toPrecision(2)

    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(
          result[2],
          16,
        )}, ${parseInt(result[3], 16)}, ${alpha})`
      : null

    /** 6-digit */
  } else {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return `rgb(${parseInt(result[1], 16)}, ${parseInt(
      result[2],
      16,
    )}, ${parseInt(result[3], 16)})`
  }
}
