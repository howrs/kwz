"use client"

import { valibotResolver } from "@hookform/resolvers/valibot"
import { client, parsers, server, utils } from "@passwordless-id/webauthn"
import type { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types"
import { useMutation } from "@tanstack/react-query"
import { Loader } from "components/Loader"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { EncryptJWT, jwtDecrypt } from "jose"
import { idb } from "lib/idb"
import { ls } from "lib/localStorage"
import { supa } from "lib/supabase/supa"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type InferInput, object, pipe, string } from "valibot"
import { generatePrivateKey } from "viem/accounts"

const schema = object({
  // id: pipe(string(), minLength(1)),
})

type FormSchema = InferInput<typeof schema>

export type Payload = {
  pk: string
}

export type User = {
  id: string
  teamId?: string
  encrypted: string
}

export default function Page() {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    setFocus,
  } = useForm<FormSchema>({
    resolver: valibotResolver(schema),
  })

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: async () => {
      const uuid = utils.randomChallenge()

      let reg = await ls.getItem<RegistrationEncoded>("reg")

      if (!reg) {
        reg = await client.register("KWZ", uuid)

        ls.setItem("reg", reg)

        const parsed = parsers.parseRegistration(reg)

        console.log(parsed)
        const { credential } = parsed

        const id = credential.id

        const secret = new Uint8Array(32)
        secret.set(new TextEncoder().encode(id))

        const payload: Payload = {
          pk: generatePrivateKey(),
        }

        const encrypted = await new EncryptJWT(payload)
          .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
          .setIssuedAt()
          .encrypt(secret)

        const user: User = {
          id,
          encrypted,
        }

        await supa.setItem(`user:${id}`, user)
        await idb.setItem("auth", user)

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

      push("/team/create")

      return
    },
  })

  const onSubmit = handleSubmit(async () => {
    await login()
  })

  const isLoading = isPending || isSubmitting

  return (
    <form
      className="flex h-full flex-col items-center justify-center gap-4 p-2"
      onSubmit={onSubmit}
    >
      <h1>KWZ</h1>
      {/* <Input
          className="w-full text-center"
          autoFocus
          disabled={isLoading}
          {...register("id")}
          placeholder="id"
        /> */}
      <Button type="submit" disabled={isLoading} className="relative min-w-32">
        {isLoading ? <Loader /> : "Continue"}
      </Button>
    </form>
  )
}
