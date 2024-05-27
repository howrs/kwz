import { APP_NAME } from "constants/urls"
import { createStorage } from "unstorage"
// import indexedDbDriver from "unstorage/drivers/indexedb"
import localStorageDriver from "unstorage/drivers/localstorage"
import memoryDriver from "unstorage/drivers/memory"
import { isServer } from "utils/isServer"

export const idb = createStorage({
  driver: isServer()
    ? memoryDriver()
    : localStorageDriver({ base: `${APP_NAME}:` }),
})
