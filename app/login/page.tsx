"use client"

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
      const uuid = new TextEncoder().encode(crypto.randomUUID())

      let auth: Credential | null

      try {
        auth = await navigator.credentials.get({
          publicKey: {
            challenge: uuid,
            rpId: window.location.hostname,
            userVerification: "preferred",
          },
        })
      } catch (e) {
        console.error(e)
        return
      }

      assert(auth?.id, "Credential not found")

      const id = auth.id

      const user = await supa.getItem<User>(`user:${id}`)

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

  const { mutateAsync: register, isPending: isPending2 } = useMutation({
    mutationFn: async () => {
      const uuid = new TextEncoder().encode(crypto.randomUUID())
      let user: User | null

      const name = `KWZ (${`${new Date().toISOString()}`
        .slice(0, 16)
        .replace("T", " ")})`

      const credential = await navigator.credentials.create({
        publicKey: {
          attestation: "direct",
          challenge: uuid,
          rp: {
            id: window.location.hostname,
            name: window.location.hostname,
          },
          authenticatorSelection: {
            userVerification: "preferred",
            residentKey: "required",
            requireResidentKey: true,
          },
          extensions: {
            credProps: true,
          },
          user: {
            id: uuid,
            name: name,
            displayName: name,
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        },
      })

      const id = credential?.id

      assert(id, "Credential ID not found")

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
    },
  })

  const isLoading = isPending || isPending2

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
      <div className="flex w-full flex-col items-center gap-2">
        {!teamId && (
          <Button
            className="w-fit"
            variant="ghost"
            disabled={isLoading}
            onClick={async () => {
              await register()
            }}
          >{`I don't have an account`}</Button>
        )}
        <Button
          disabled={isLoading}
          className="relative bottom-0 h-16 w-full rounded-none text-3xl"
          onClick={async () => {
            if (teamId) {
              await register()
            } else {
              await login()
            }
          }}
        >
          {isLoading ? <Loader className="size-8" /> : "Continue"}
        </Button>
      </div>
    </div>
  )
}
