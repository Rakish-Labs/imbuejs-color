import { RGBComponent } from '../types/rgbComponent'
import { getRGBChannels } from './getRGBChannels'
import { rgbComponentToHex } from './rgbComponentToHex'
import { validateRGBComponent } from './validateRGBComponent'

export const rgbToHex = (rgb: string) => {
  let alpha: string = ''
  const channels = getRGBChannels(rgb)

  /** Alpha */
  if (channels[3]) {
    alpha = channels[3].endsWith('%')
      ? /** Alpha channel expressed as percentage */
        Math.ceil(
          parseFloat(channels[3].substring(0, channels[3].length)),
        ).toString(16)
      : /** Alpha channel expressed as decimal 0 - 1 */
        Math.ceil(parseFloat(channels[3]) * 255).toString(16)

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
