import { RGBComponent } from '../types/RGBComponent'

export const rgbComponentToHex = (rgbComponent: RGBComponent) => {
  const hexValue = parseInt(rgbComponent).toString(16)
  return hexValue.length === 1 ? '00' : hexValue
}
