"use client"

import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { QRCode } from "app/team/[teamId]/qr/QRCode"
import { TeamName } from "app/team/[teamId]/qr/TeamName"
import { Header } from "components/Header"
import { Button } from "components/ui/button"
import { useTeam } from "hooks/useTeam"
import { toast } from "sonner"
import { getBaseURL } from "utils/getBaseURL"

export const runtime = "edge"

export default function Page() {
  const [, copy] = useCopyToClipboard()

  const { team } = useTeam()

  const url = `${getBaseURL()}/login?teamId=${team.id}`

  return (
    <div className="flex w-full flex-col gap-8">
      <Header />
      <h1 className="flex w-full justify-center text-2xl">
        <TeamName />
      </h1>

      <div className="flex justify-center gap-2">
        {/* child emoji */}
        {/* <Emoji e="🧒" n="child" className="size-20" /> */}
        {/* boy */}
        <Emoji u="boy_light-skin-tone_1f466-1f3fb_1f3fb" className="size-24" />

        {/*  selfie emoji */}
        <Emoji e="🤳" n="selfie" className="size-24" />

        <Emoji
          u={`woman_light-skin-tone_1f469-1f3fb_1f3fb`}
          className="size-24"
        />
      </div>

      <div className="flex flex-col justify-center font-ink text-3xl">
        <h2 className="text-center">Share this QR code</h2>
        <h2 className="text-center">with your child</h2>
        <h2 className="text-center">to join the team!</h2>
      </div>

      <div className="flex flex-col gap-2 text-center">
        <div className="relative">
          <QRCode str={url} className="size-64" />
          <Emoji
            e="🧡"
            n="orange-heart"
            className="absolute inset-0 m-auto size-24"
          />
        </div>

        <Button
          className="cursor-pointer text-xs"
          variant="link"
          onClick={async () => {
            await copy(url)

            toast.success("Copied to clipboard!")
          }}
        >
          {url}
        </Button>
      </div>
    </div>
  )
}
