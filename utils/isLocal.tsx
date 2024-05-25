import { isServer } from "utils/isServer"

export const isLocal = () => {
  if (isServer()) {
    return process.env.ENV === "local"
  }

  return globalThis.location.host.includes("localhost")
}
