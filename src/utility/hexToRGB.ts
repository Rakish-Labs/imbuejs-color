export const hexToRGB = (hex: string) => {
  /** Shorthand */
  if (hex.length === 4) {
    /** Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF") */
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (_, r, g, b) {
      return r + r + g + g + b + b
    })
  }

  /** With alpha */
  if (hex.length === 9) {
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
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
          result[3],
          16,
        )})`
      : null
  }
}
