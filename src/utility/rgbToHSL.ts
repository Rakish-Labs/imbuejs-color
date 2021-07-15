import { getRGBChannels } from './getRGBChannels'
import { normalizeRGBChannels } from './normalizeRGBChannels'

export const rgbToHSL = (rgb: string): string => {
  const channels = normalizeRGBChannels(getRGBChannels(rgb))

  // Make r, g, and b fractions of 1
  let r = parseFloat(channels[0]) / 255,
    g = parseFloat(channels[1]) / 255,
    b = parseFloat(channels[2]) / 255

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  /**
   * Hue
   */
  if (delta == 0) h = 0
  // Red is max
  else if (cmax == r) {
    const segment = (g - b) / delta
    let shift = 0 / 60 // R° / (360° / hex sides)
    if (segment < 0) {
      // hue > 180, full rotation
      shift = 360 / 60 // R° / (360° / hex sides)
    }
    h = segment + shift
  }
  // Green is max
  else if (cmax == g) {
    const segment = (b - r) / delta
    const shift = 120 / 60 // G° / (360° / hex sides)
    h = segment + shift
  }
  // Blue is max
  else {
    const segment = (r - g) / delta
    const shift = 240 / 60 // B° / (360° / hex sides)
    h = segment + shift
  }

  h = Math.round(h * 60) // hue is in [0,6], scale it up

  /**
   * Lightness
   */
  l = (cmax + cmin) / 2

  /**
   * Saturation
   */
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  /**
   * Alpha
   */

  let alpha
  if (channels[3]) {
    alpha = parseFloat(channels[3]).toString()
  }

  return `hsl${alpha ? 'a' : ''}(${h}, ${s}%, ${l}%${
    alpha ? `, ${alpha}` : ''
  })`
}
