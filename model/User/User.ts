import type { ValueOf } from "next/dist/shared/lib/constants"

export const ROLE = {
  PARENT: "parent",
  CHILD: "child",
} as const

export type User = {
  id: string
  name?: string
  teamId?: string
  address: string
  role: ValueOf<typeof ROLE>
  encrypted: string
}
