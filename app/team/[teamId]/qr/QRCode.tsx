import { cn } from "lib/utils"
import type { ComponentProps } from "react"
import { encode } from "uqr"

type Props = {
  str: string
} & ComponentProps<"section">

export function QRCode({ str, className, ...props }: Props) {
  const { data, size } = encode(str, {
    boostEcc: true,
    ecc: "H",
    border: 0,
  })

  const BLANK_SIZE = 15

  return (
    <section
      className={cn(
        "mx-auto grid size-64 bg-white p-0.5",
        `grid-cols-${size}`,
        `grid-rows-${size}`,
        className,
      )}
      {...props}
    >
      {data.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.map((cell, j) => {
            if (
              i >= size / 2 - BLANK_SIZE / 2 &&
              i < size / 2 + BLANK_SIZE / 2 &&
              j >= size / 2 - BLANK_SIZE / 2 &&
              j < size / 2 + BLANK_SIZE / 2
            ) {
              return (
                <div key={`${i}-${j}`} className="aspect-square bg-white" />
              )
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
                  className={cn(
                    `aspect-square`,
                    cell ? "bg-black" : "bg-white",
                  )}
                />
              )
            }

            return (
              <div
                key={`${i}-${j}`}
                className={cn(
                  `aspect-square rounded-full`,
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
