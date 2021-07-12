import { cssColorKeywords } from './cssColorKeywords'

export const keywordToRGB = (keyword: string): string => {
  return `rgb(${cssColorKeywords[keyword].join(', ')})`
}
