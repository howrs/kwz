import { customAlphabet } from "nanoid"

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export const nanoid = (len = 6) => customAlphabet(alphabet, len)()
