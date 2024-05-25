"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Avatar } from "app/team/[teamId]/qr/Avatar"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { useAuth } from "hooks/useAuth"
import { useTeam } from "hooks/useTeam"
import { idb } from "lib/idb"
import { LogOut, QrCode, Wallet } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { user } = useAuth()
  const { team } = useTeam()

  const key = user.id.slice(0, 100)
  const client = useQueryClient()

  return (
    <header className="flex h-16 w-full items-center justify-between px-1">
      <div className="flex items-center gap-2 px-3">
        <Emoji
          u="man-running-light-skin-tone_1f3c3-1f3fb-200d-2642-fe0f"
          className="size-8"
        />
        <h1 className="font-ink text-3xl">KWZ</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar k={key} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/team/${team.id}/wallet`}>
                <Wallet className="mr-2 h-4 w-4" />
                <span>Wallet</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/team/${team.id}/qr`}>
                <QrCode className="mr-2 h-4 w-4" />
                <span>QR Code</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await idb.removeItem("auth")
              client.invalidateQueries({
                queryKey: ["auth"],
              })
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
