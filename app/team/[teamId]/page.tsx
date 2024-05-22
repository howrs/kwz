import { QRCode } from "app/team/[teamId]/QRCode"
import { TeamName } from "app/team/[teamId]/TeamName"

export const runtime = "edge"
// export const dynamic = "force-dynamic"
// export const fetchCache = "only-no-store"

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="flex w-full justify-center text-2xl">
        <TeamName />
      </h1>

      <QRCode />
    </div>
  )
}
