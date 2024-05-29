import type { Payload } from "app/login/page"
import { EncryptJWT } from "jose"
import type { User } from "model/User/User"
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"

type Params = Partial<User> & {
  id: string
  role: User["role"]
}

export const newUser = async ({ id, teamId, role }: Params): Promise<User> => {
  const secret = new Uint8Array(32)
  secret.set(new TextEncoder().encode(id))

  const pk = generatePrivateKey()

  const payload: Payload = { pk }

  const address = privateKeyToAddress(pk)

  const encrypted = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .encrypt(secret)

  return {
    id,
    teamId,
    address,
    role,
    encrypted,
  }
}
