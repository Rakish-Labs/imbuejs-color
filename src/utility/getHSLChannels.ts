export const getHSLChannels = (hsl: string): string[] => {
  const hslRegex = /hsla?\(?(.+)\)/gi
  const separator = hsl.indexOf(',') > -1 ? ', ' : ' '
  return hsl.replace(hslRegex, (_, values) => values).split(separator)
}
