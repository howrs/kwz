"use client"

import { client, parsers, utils } from "@passwordless-id/webauthn"
import type { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types"
import { useMutation } from "@tanstack/react-query"
import { getEmoji } from "app/team/[teamId]/qr/Avatar"
import type { Team } from "app/team/create/page"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { EncryptJWT } from "jose"
import { assert } from "lib/assert"
import { idb } from "lib/idb"
import { ls } from "lib/localStorage"
import { supa } from "lib/supabase/supa"
import { useRouter } from "next-nprogress-bar"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"

export type Payload = {
  pk: string
}

export type User = {
  id: string
  teamId?: string
  address: string
  encrypted: string
}

export const runtime = "edge"

export default function Page() {
  const pk = generatePrivateKey()

  console.log({ pk })

  const search = useSearchParams()
  const { push } = useRouter()
  const teamId = search.get("teamId") ?? undefined

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async () => {
      const uuid = utils.randomChallenge()

      let reg = await ls.getItem<RegistrationEncoded>("reg")

      if (!reg) {
        reg = await client.register("KWZ", uuid)

        ls.setItem("reg", reg)

        const parsed = parsers.parseRegistration(reg)

        const { credential } = parsed

        const id = credential.id

        const secret = new Uint8Array(32)
        secret.set(new TextEncoder().encode(id))

        const pk = generatePrivateKey()

        const payload: Payload = { pk }

        const address = privateKeyToAddress(pk)

        const encrypted = await new EncryptJWT(payload)
          .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
          .setIssuedAt()
          .encrypt(secret)

        const user: User = {
          id,
          teamId,
          address,
          encrypted,
        }

        if (teamId) {
          const team = await supa.getItem<Team>(`team:${teamId}`)

          assert(team, "Team not found")

          await supa.setItem(`team:${teamId}`, {
            ...team,
            members: [...team.members, id],
          })
        }

        await Promise.all([
          supa.setItem(`user:${id}`, user),
          idb.setItem("auth", user),
        ])

        push("/team/create")

        return
      }

      const auth = await client.authenticate([reg.credential.id], uuid)

      const id = auth.credentialId

      const user = await supa.getItem<User>(`user:${id}`)

      if (!user) {
        toast.error("User not found.")
        ls.removeItem("reg")
        return
      }

      await idb.setItem("auth", user)

      if (user.teamId) {
        push(`/team/${user.teamId}/qr`)
      } else {
        push("/team/create")
      }

      toast.success("Successfully logged in!", {
        position: "top-center",
      })

      return
    },
  })

  const isLoading = isPending

  return (
    <div className="flex h-full w-full flex-col gap-12 p-2 pt-[30%]">
      <h1 className="text-center font-ink text-3xl">Welcome to KWZ!</h1>
      <Image
        priority
        unoptimized
        src={`https://em-content.zobj.net/source/microsoft-teams/363/waving-hand_1f44b.png`}
        className="mx-auto size-40"
        width={120}
        height={120}
        alt="👋"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="relative h-16 w-full text-3xl"
        onClick={async () => {
          await login()
        }}
      >
        {isLoading ? <Loader className="size-8" /> : "Continue"}
      </Button>
    </div>
  )
}
