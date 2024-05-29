"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { useAuth } from "hooks/useAuth"
import { idb } from "lib/idb"
import { supa } from "lib/supabase/supa"
import { newTeam } from "model/Team/newTeam"
import { useRouter } from "next-nprogress-bar"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(3).max(50),
})

type FormSchema = z.infer<typeof schema>

export default function Page() {
  const { user } = useAuth()
  const { push } = useRouter()

  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    const team = newTeam({
      name,
      creator: user.id,
    })

    const newUser = { ...user, teamId: team.id }

    await Promise.all([
      supa.setItem(`team:${team.id}`, team),
      supa.setItem(`user:${user.id}`, newUser),
      idb.setItem("auth", newUser),
    ])

    push(`/team/${team.id}/qr`)
  })

  return (
    <form className="flex w-full flex-col gap-12 p-2" onSubmit={onSubmit}>
      <h1 className="mt-[20%] text-center font-extrabold font-ink text-5xl">
        Hello, parents!
      </h1>
      <Emoji
        u="woman_light-skin-tone_1f469-1f3fb_1f3fb"
        className="mx-auto size-40"
      />
      <h2 className="text-center font-ink text-3xl">
        Let's create a team
        <br />
        for your child!
      </h2>
      <div className="grid gap-4">
        <Input
          {...register("name")}
          disabled={isSubmitting}
          className="h-auto text-center text-2xl"
          placeholder="Team Name"
          // size={24}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="h-12 text-2xl"
          size="lg"
        >
          {isSubmitting ? <Loader className="size-8" /> : "Create"}
        </Button>
      </div>
    </form>
  )
}
