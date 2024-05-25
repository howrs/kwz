"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { useAuth } from "hooks/useAuth"
import { nanoid } from "lib/nanoid"
import { supa } from "lib/supabase/supa"
import { useRouter } from "next-nprogress-bar"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z.string(),
})

type FormSchema = z.infer<typeof schema>

export type Team = {
  id: string
  name: string
  creator: string
  members: string[]
}

export default function Page() {
  const { pk, user } = useAuth()
  const { push } = useRouter()

  const {
    register,
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ name }) => {
    const team: Team = {
      id: nanoid(),
      name,
      creator: user.id,
      members: [],
    }

    await Promise.all([
      supa.setItem(`team:${team.id}`, team),
      supa.setItem(`user:${user.id}`, { ...user, teamId: team.id }),
    ])

    push(`/team/${team.id}`)
  })

  return (
    <form className="flex w-full flex-col gap-12 p-2" onSubmit={onSubmit}>
      <h1 className="mt-[20%] text-center font-extrabold font-ink text-5xl">
        Hello, parents!
      </h1>
      <Image
        priority
        unoptimized
        src={`https://em-content.zobj.net/source/microsoft-teams/363/woman_light-skin-tone_1f469-1f3fb_1f3fb.png`}
        className="mx-auto size-40"
        width={120}
        height={120}
        alt="👋"
      />
      <h2 className="text-center font-ink text-3xl">
        Let's create a team for your child!
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
