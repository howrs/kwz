import { ls } from "lib/localStorage"
import { isServer } from "utils/isServer"

export const isRegistered = () => {
  if (isServer()) {
    throw new Error("isRegistered should not be called on the server")
  }
  return ls.getItem("isRegistered")
}
