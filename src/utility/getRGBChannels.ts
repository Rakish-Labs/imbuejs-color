export const getRGBChannels = (rgb: string): string[] => {
  const rgbRegex = /rgba?\(?(.+)\)/gi
  const separator = rgb.indexOf(',') > -1 ? ', ' : ' '
  return rgb.replace(rgbRegex, (_, values) => values).split(separator)
}
