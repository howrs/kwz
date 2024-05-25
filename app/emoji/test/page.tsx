import { Avatar, EMOJIS } from "app/team/[teamId]/qr/Avatar"

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid grid-cols-6 gap-2">
        {EMOJIS.map(({ url, n }, i) => (
          <Avatar key={n} k={`${i}`} />
        ))}
      </div>
    </div>
  )
}
