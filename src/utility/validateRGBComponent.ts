import { RGBComponent } from '../types/RGBComponent'

export const validateRGBComponent = (
  literal: string,
): literal is RGBComponent | never => {
  const int = parseInt(literal)
  if (int >= 0 && int <= 255) {
    return true
  } else {
    throw new Error(
      `Invalid RGB Component. Expected value within range 0 - 255. Received ${literal}`,
    )
  }
}
