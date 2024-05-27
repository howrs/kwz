import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import type { Payload } from "app/login/page"
import { jwtDecrypt } from "jose"
import { idb } from "lib/idb"
import type { User } from "model/User/User"
import { useRouter } from "next-nprogress-bar"
import { redirect } from "next/navigation"
import { isServer } from "utils/isServer"

export const useAuth = () => {
  const { replace } = useRouter()

  const { data, ...rest } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const user = await idb.getItem<User>("auth")

        if (!user) {
          redirect("/login")
        }

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
    enabled: !isServer(),
  })

  const result = data!

  return { ...result, ...rest }
}
