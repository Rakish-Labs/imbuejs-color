import { RGBComponent } from '../types/rgbComponent'
import { cssColorKeywords } from './cssColorKeywords'
import { rgbComponentToHex } from './rgbComponentToHex'

export const keywordToHex = (keyword: string): string => {
  const rgbValues = cssColorKeywords[keyword]

  const hexValue = rgbValues.reduce((acc: string, value: string) => {
    const hex = rgbComponentToHex(value as RGBComponent)
    return (acc += hex).toUpperCase()
  }, '')
  return `#${hexValue}`
}
