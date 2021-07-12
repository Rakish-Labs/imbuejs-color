import { getHSLChannels } from './getHSLChannels'

export const hslToRGB = (hsl: string) => {
  let alpha: string = ''
  const channels = getHSLChannels(hsl)

  /** Alpha */
  if (channels[3]) {
    alpha = channels[3]
  }

  let h = channels[0],
    s = parseFloat(channels[1].substr(0, channels[1].length - 1)) / 100,
    l = parseFloat(channels[2].substr(0, channels[2].length - 1)) / 100

  // Strip label and convert to degrees (if necessary)
  if (h.indexOf('deg') > -1) {
    h = h.substr(0, h.length - 3)
  } else if (h.indexOf('rad') > -1) {
    h = Math.round(
      parseFloat(h.substr(0, h.length - 3)) * (180 / Math.PI),
    ).toString()
  } else if (h.indexOf('turn') > -1) {
    h = Math.round(parseFloat(h.substr(0, h.length - 4)) * 360).toString()
  }

  if (parseFloat(h) >= 360) h = (parseFloat(h) % 360).toString()

  const CHROMA = (1 - Math.abs(2 * l - 1)) * s
  const X = CHROMA * (1 - Math.abs(((parseFloat(h) / 60) % 2) - 1))
  const LIGHTNESS = l - CHROMA / 2

  let r, g, b

  if (0 <= parseFloat(h) && parseFloat(h) < 60) {
    r = CHROMA
    g = X
    b = 0
  } else if (60 <= parseFloat(h) && parseFloat(h) < 120) {
    r = X
    g = CHROMA
    b = 0
  } else if (120 <= parseFloat(h) && parseFloat(h) < 180) {
    r = 0
    g = CHROMA
    b = X
  } else if (180 <= parseFloat(h) && parseFloat(h) < 240) {
    r = 0
    g = X
    b = CHROMA
  } else if (240 <= parseFloat(h) && parseFloat(h) < 300) {
    r = X
    g = 0
    b = CHROMA
  } else if (300 <= parseFloat(h) && parseFloat(h) < 360) {
    r = CHROMA
    g = 0
    b = X
  }

  r = Math.floor((r + LIGHTNESS) * 255)
  g = Math.floor((g + LIGHTNESS) * 255)
  b = Math.floor((b + LIGHTNESS) * 255)

  return `rgb${alpha ? 'a' : ''}(${r}, ${g}, ${b}${alpha ? `, ${alpha}` : ''})`
}
