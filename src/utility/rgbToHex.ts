import { getRGBChannels } from './getRGBChannels'
import { rgbComponentToHex } from './rgbComponentToHex'
import { validateRGBComponent } from './validateRGBComponent'
import type { RGBComponent } from '../types/RGBComponent'

export const rgbToHex = (rgb: string) => {
  let alpha: string = ''
  const channels = getRGBChannels(rgb)

  /** Alpha */
  if (channels[3]) {
    alpha = Math.ceil(parseFloat(channels[3]) * 255).toString(16)

    if (alpha === '0') alpha = '00'

    channels.pop()
  }

  try {
    if (
      ![channels[0], channels[1], channels[2]].some(
        channel => !validateRGBComponent(channel),
      )
    ) {
      return `#${rgbComponentToHex(
        channels[0] as RGBComponent,
      )}${rgbComponentToHex(channels[1] as RGBComponent)}${rgbComponentToHex(
        channels[2] as RGBComponent,
      )}${alpha}`.toUpperCase()
    }
  } catch (error) {
    throw new Error(error)
  }
}
