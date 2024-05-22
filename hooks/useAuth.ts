import { useQuery } from "@tanstack/react-query"
import type { Payload, User } from "app/login/page"
import { jwtDecrypt } from "jose"
import { assert } from "lib/assert"
import { idb } from "lib/idb"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const { replace } = useRouter()

  const { data, ...rest } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const user = await idb.getItem<User>("auth")

        assert(user)

        const { encrypted, id } = user

        const secret = new Uint8Array(32)
        secret.set(new TextEncoder().encode(id))

        const decrypted = await jwtDecrypt<Payload>(encrypted, secret)
        const { payload } = decrypted

        return {
          user,
          pk: payload.pk,
        }
      } catch (e) {
        replace("/login")
      }
    },
  })

  const result = data!

  return { ...result, ...rest }
}
