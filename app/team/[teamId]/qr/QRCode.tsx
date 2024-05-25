"use client"

import { useTeam } from "hooks/useTeam"
import { cn } from "lib/utils"
import { encode } from "uqr"
import { getBaseURL } from "utils/getBaseURL"

export function QRCode() {
  const { team } = useTeam()

  const url = `${getBaseURL()}/login?teamId=${team.id}`

  const { data, size } = encode(url, {
    boostEcc: true,
    ecc: "H",
    border: 0,
  })

  const BLANK_SIZE = 15

  return (
    <section className="mx-auto w-fit bg-white p-0.5">
      {data.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.map((cell, j) => {
            if (
              i >= size / 2 - BLANK_SIZE / 2 &&
              i < size / 2 + BLANK_SIZE / 2 &&
              j >= size / 2 - BLANK_SIZE / 2 &&
              j < size / 2 + BLANK_SIZE / 2
            ) {
              return <div key={`${i}-${j}`} className="size-1.5 bg-white" />
            }

            // isMarker
            if (
              (i < 7 && j < 7) ||
              (i < 7 && j >= size - 7) ||
              (i >= size - 7 && j < 7)
            ) {
              return (
                <div
                  key={`${i}-${j}`}
                  className={cn(`size-1.5`, cell ? "bg-black" : "bg-white")}
                />
              )
            }

            return (
              <div
                key={`${i}-${j}`}
                className={cn(
                  `size-1.5 rounded-full`,
                  cell ? "bg-black" : "bg-white",
                )}
              />
            )
          })}
        </div>
      ))}
    </section>
  )
}
