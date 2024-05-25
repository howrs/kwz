"use client"

import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { QRCode } from "app/team/[teamId]/qr/QRCode"
import { TeamName } from "app/team/[teamId]/qr/TeamName"
import { Header } from "components/Header"
import { useAuth } from "hooks/useAuth"

export const runtime = "edge"

export default function Page() {
  const { user } = useAuth()

  const key = user.id.slice(0, 100)

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

      <div className="relative">
        <QRCode />
        {/* fire */}
        {/* <Emoji e="🔥" n="fire" className="absolute inset-0 m-auto size-24" /> */}
        {/* rainbow */}
        {/* <Emoji e="🌈" n="rainbow" className="absolute inset-0 m-auto size-24" /> */}
        {/* unicorn */}
        {/* <Emoji e="🦄" n="unicorn" className="absolute inset-0 m-auto size-24" /> */}
        {/* orange-heart */}
        <Emoji
          e="🧡"
          n="orange-heart"
          className="absolute inset-0 m-auto size-20"
        />
        {/* two hearts */}
      </div>

      {/* <div className="grid grid-cols-6 gap-2">
        {EMOJIS.map(({ url, n }, i) => (
          <Avatar key={n} k={`${i}`} />
        ))}
      </div> */}
    </div>
  )
}
