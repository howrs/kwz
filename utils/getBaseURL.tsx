import { HOST } from "constants/urls"
import { isLocal } from "utils/isLocal"
import { isProd } from "utils/isProd"

export const getBaseURL = () => {
  if (isLocal()) {
    return "http://localhost:7777"
  } else if (isProd()) {
    return `https://${HOST}`
  }
  throw new Error("Unknown environment")
}
