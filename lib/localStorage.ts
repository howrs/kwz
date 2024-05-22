import { APP_NAME } from "constants/urls"
import { createStorage } from "unstorage"
import httpDriver from "unstorage/drivers/http"
import localStorageDriver from "unstorage/drivers/localstorage"
import { isServer } from "utils/isServer"

export const ls = createStorage({
  driver: isServer()
    ? httpDriver({ base: "http://dummy.com" })
    : localStorageDriver({ base: `${APP_NAME}:` }),
})
