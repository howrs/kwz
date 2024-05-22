"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { useAuth } from "hooks/useAuth"
import { nanoid } from "lib/nanoid"
import { supa } from "lib/supabase/supa"
import { useRouter } from "next/navigation"
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
    <form className="flex flex-col gap-4 p-2" onSubmit={onSubmit}>
      <h1 className="text-center text-2xl">Create Team</h1>
      <Input
        {...register("name")}
        disabled={isSubmitting}
        className="text-center text-lg"
        placeholder="Team Name"
      />
      <Button type="submit" disabled={!isValid || isSubmitting} className="">
        {isSubmitting ? <Loader /> : "Create"}
      </Button>
    </form>
  )
}
