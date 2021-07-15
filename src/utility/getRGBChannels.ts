import { normalizeRGBChannels } from './normalizeRGBChannels'

export const getRGBChannels = (rgb: string): string[] => {
  const rgbRegex = /rgba?\(?(.+)\)/gi
  const separator = rgb.indexOf(',') > -1 ? ', ' : ' '
  const rawChannels = rgb
    .replace(rgbRegex, (_, values) => values)
    .split(separator)

  return normalizeRGBChannels(rawChannels)
}
