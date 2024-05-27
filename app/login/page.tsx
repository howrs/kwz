"use client"

import { client, parsers, utils } from "@passwordless-id/webauthn"
import type { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types"
import { useMutation } from "@tanstack/react-query"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { assert } from "lib/assert"
import { idb } from "lib/idb"
import { ls } from "lib/localStorage"
import { supa } from "lib/supabase/supa"
import type { Team } from "model/Team/Team"
import { ROLE, type User } from "model/User/User"
import { newUser } from "model/User/newUser"
import { useRouter } from "next-nprogress-bar"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export type Payload = {
  pk: string
}

export const runtime = "edge"

export default function Page() {
  const search = useSearchParams()
  const { push } = useRouter()
  const teamId = search.get("teamId") ?? undefined

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async () => {
      const uuid = utils.randomChallenge()
      let user: User | null

      let reg = await ls.getItem<RegistrationEncoded>("reg")

      if (!reg) {
        reg = await client.register("KWZ", uuid)

        ls.setItem("reg", reg)

        const parsed = parsers.parseRegistration(reg)

        const { credential } = parsed

        const id = credential.id

        user = await newUser({
          id,
          teamId,
          role: teamId ? ROLE.CHILD : ROLE.PARENT,
        })

        if (user.role === ROLE.CHILD) {
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

        if (user.role === ROLE.CHILD) {
          push(`/team/${user.teamId}/missions`)
        } else if (user.role === ROLE.PARENT) {
          push(user.teamId ? `/team/${user.teamId}/qr` : "/team/create")
        }

        toast.success("Successfully logged in!")

        return
      }

      const auth = await client.authenticate([reg.credential.id], uuid)

      const id = auth.credentialId

      user = await supa.getItem<User>(`user:${id}`)

      if (!user) {
        toast.error("User not found.")
        ls.removeItem("reg")
        return
      }

      await idb.setItem("auth", user)

      if (user.role === ROLE.CHILD) {
        push(`/team/${user.teamId}/missions`)
      } else {
        push(user.teamId ? `/team/${user.teamId}/qr` : "/team/create")
      }

      toast.success("Successfully logged in!")

      return
    },
  })

  const isLoading = isPending

  return (
    <div className="flex h-full w-full flex-col items-center gap-12 pt-[30%]">
      <Emoji
        u="man-running-light-skin-tone_1f3c3-1f3fb-200d-2642-fe0f"
        className="size-40"
      />
      <div className="flex items-center justify-center gap-3 text-center font-ink text-3xl">
        <Emoji e="👋" n="waving-hand" className="size-10" />
        <h1 className="my-auto mt-2">Welcome to KWZ!</h1>
      </div>
      <div className="grow" />
      <Button
        type="submit"
        disabled={isLoading}
        className="relative bottom-0 h-16 w-full rounded-none text-3xl"
        onClick={async () => {
          await login()
        }}
      >
        {isLoading ? <Loader className="size-8" /> : "Continue"}
      </Button>
    </div>
  )
}
