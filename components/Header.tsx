"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Avatar } from "app/team/[teamId]/qr/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { DropdownMenuShortcut } from "components/ui/dropdown-menu"
import { useAuth } from "hooks/useAuth"
import { idb } from "lib/idb"
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  QrCode,
  Settings,
  User,
  UserPlus,
  Users,
  Wallet,
  Wallet2,
} from "lucide-react"

export function Header() {
  const { user } = useAuth()

  const key = user.id.slice(0, 100)
  const client = useQueryClient()

  return (
    <header className="flex h-16 w-full items-center justify-between px-1">
      <div></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar k={key} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto" align="end">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <QrCode className="mr-2 h-4 w-4" />
              <span>QR Code</span>
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
