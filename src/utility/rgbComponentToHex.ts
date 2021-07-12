import { RGBComponent } from '../types/rgbComponent'

export const rgbComponentToHex = (rgbComponent: RGBComponent) => {
  const hexValue = parseInt(rgbComponent).toString(16)
  return hexValue.length === 1 ? '00' : hexValue
}
