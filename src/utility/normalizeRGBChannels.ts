export const normalizeRGBChannels = (rgb: string[]): string[] => {
  const [r, g, b] = [rgb[0], rgb[1], rgb[2]].map(channel => {
    if (channel.endsWith('%')) {
      return (
        (parseFloat(channel.substring(0, channel.length - 1)) / 100) *
        255
      ).toString()
    } else {
      return channel
    }
  })

  /**
   * Alpha
   */
  let a
  if (rgb[3]) {
    if (rgb[3].endsWith('%')) {
      a = (parseFloat(rgb[3].substring(0, rgb[3].length - 1)) / 100).toString()
    } else {
      a =
        parseFloat(rgb[3]) < 1 && rgb[3].startsWith('.')
          ? `0${rgb[3]}`
          : rgb[3].toString()
    }
  }

  return [r, g, b, ...(a ? [a] : [])]
}
