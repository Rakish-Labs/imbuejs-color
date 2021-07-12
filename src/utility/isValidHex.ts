export const isValidHex = (alleged: string): boolean | never => {
  /** Verify the length of the passed value (including the '#' prefix) */
  if (alleged.length !== 4 && alleged.length !== 7 && alleged.length !== 9) {
    throw new Error(
      `Expected 3, 6, or 9 hexadecimal values, received ${alleged}`,
    )
  }

  const [_, ...values] = alleged.split('')

  if (alleged[0] !== '#' || values.some(char => !char.match(/([a-f\d])/i))) {
    throw new Error(
      `Expected a hex code whose digits are 0-9 or a-f, received ${alleged}`,
    )
  }

  return true
}
