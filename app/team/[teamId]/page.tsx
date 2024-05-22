"use client"

import { useTeam } from "hooks/useTeam"
import { cn } from "lib/utils"
import { encode } from "uqr"
import { getBaseURL } from "utils/getBaseURL"

export default function Page() {
  const { team } = useTeam()

  const url = `${getBaseURL()}/login?teamId=${team.id}`

  console.log(url)

  const {
    data, // 2D array of boolean, representing the QR Code
    size, // size of the QR Code
  } = encode(url, {
    boostEcc: true,
    ecc: "H",
    border: 1,
  })

  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-center text-2xl">Team: {team.name}</h1>

      <section>
        {data.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((cell, j) => (
              <div
                key={j}
                className={cn(`h-1.5 w-1.5`, cell ? "bg-black" : "bg-white")}
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}
