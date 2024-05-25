import { cn } from "lib/utils"
import Image from "next/image"
import type { ComponentProps } from "react"

type Props = (
  | {
      e: string
      n: string
    }
  | {
      u: string
    }
) &
  Omit<ComponentProps<typeof Image>, "src" | "alt">

export function Emoji({ className, ...props }: Props) {
  if ("u" in props) {
    const { u } = props

    return (
      <Image
        priority
        unoptimized
        key={u}
        src={`https://em-content.zobj.net/source/microsoft-teams/363/${u}.png`}
        className={cn("aspect-square", className)}
        width={120}
        height={120}
        alt={u}
        {...props}
      />
    )
  }

  const { e, n } = props

  const uni = e.codePointAt(0)?.toString(16)
  const url = `https://em-content.zobj.net/source/microsoft-teams/363/${n}_${uni}.png`

  return (
    <Image
      priority
      unoptimized
      key={url}
      src={url}
      className={cn("aspect-square", className)}
      width={120}
      height={120}
      alt={n}
      {...props}
    />
  )
}
