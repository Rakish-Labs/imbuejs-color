/** Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF") */
export const expandHexShorthand = (hex: string): string => {
  if (hex.length === 4) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    return hex.replace(shorthandRegex, function (_, r, g, b) {
      return r + r + g + g + b + b
    })
  } else {
    return hex.replace('#', '')
  }
}
