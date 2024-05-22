import Cookies from "js-cookie"
import { isServer } from "utils/isServer"

export const isLoggedIn = () => {
  if (isServer()) {
    throw new Error("isLoggedIn should not be called on the server")
  }
  return !!Cookies.get("t")
}
