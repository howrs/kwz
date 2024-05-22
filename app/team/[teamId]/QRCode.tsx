"use client"

import { useTeam } from "hooks/useTeam"
import { cn } from "lib/utils"
import { encode } from "uqr"
import { getBaseURL } from "utils/getBaseURL"

export function QRCode() {
  const { team } = useTeam()

  const url = `${getBaseURL()}/login?teamId=${team.id}`

  const { data } = encode(url, {
    boostEcc: true,
    ecc: "H",
    border: 1,
  })

  return (
    <section>
      {data.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.map((cell, j) => (
            <div
              key={j}
              className={cn(`size-1.5`, cell ? "bg-black" : "bg-white")}
            />
          ))}
        </div>
      ))}
    </section>
  )
}
