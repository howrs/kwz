import { assert } from "lib/assert"
import { cn } from "lib/utils"
import Image from "next/image"
import { type ComponentProps, forwardRef } from "react"

type Props = {
  k: string
} & ComponentProps<"div">

export const Avatar = forwardRef<HTMLDivElement, Props>(
  ({ k, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative my-auto aspect-square size-12 cursor-pointer hover:opacity-80",
          className,
        )}
        {...props}
      >
        <Image
          priority
          unoptimized
          key={k}
          src={`https://avatar.vercel.sh/${k}`}
          className="absolute h-full w-full rounded-full opacity-80"
          width={120}
          height={120}
          alt="Avatar"
        />

        <div className="absolute h-full w-full rounded-full bg-black opacity-60" />

        <Image
          priority
          unoptimized
          key={getEmojiURL(k)}
          src={getEmojiURL(k)}
          className="absolute inset-0 m-auto size-7"
          width={120}
          height={120}
          alt="Avatar"
        />
      </div>
    )
  },
)

export const EMOJIS = [
  { e: "👻", n: "ghost" },
  { e: "🐵", n: "monkey-face" },
  { e: "🐶", n: "dog-face" },
  { e: "🐺", n: "wolf" },
  { e: "🦊", n: "fox" },
  { e: "🦝", n: "raccoon" },
  { e: "🐱", n: "cat-face" },
  { e: "🦁", n: "lion" },
  { e: "🐯", n: "tiger-face" },
  { e: "🐴", n: "horse-face" },
  { e: "🫎", n: "moose" },
  { e: "🦄", n: "unicorn" },
  { e: "🐮", n: "cow-face" },
  { e: "🐷", n: "pig-face" },
  { e: "🐭", n: "mouse-face" },
  { e: "🐹", n: "hamster" },
  { e: "🐰", n: "rabbit-face" },
  { e: "🐻", n: "bear" },
  { e: "🐨", n: "koala" },
  { e: "🐼", n: "panda" },
  { e: "🦥", n: "sloth" },
  { e: "🐔", n: "chicken" },
  { e: "🐧", n: "penguin" },
  { e: "🦉", n: "owl" },
  { e: "🦜", n: "parrot" },
  { e: "🐸", n: "frog" },
  { e: "🐋", n: "whale" },
  { e: "🦭", n: "seal" },
  { e: "🦈", n: "shark" },
  { e: "🐙", n: "octopus" },
  { e: "🪼", n: "jellyfish" },
  { e: "🐌", n: "snail" },
  { e: "🌚", n: "new-moon-face" },
  { e: "🌝", n: "full-moon-face" },
  { e: "🌞", n: "sun-with-face" },
  { e: "🌈", n: "rainbow" },
  { e: "🔥", n: "fire" },
  { e: "💩", n: "pile-of-poo" },
  { e: "👽", n: "alien" },
  { e: "🤖", n: "robot" },
  { e: "🥰", n: "smiling-face-with-hearts" },
  { e: "🤑", n: "money-mouth-face" },
  { e: "🤪", n: "zany-face" },
].map(({ e, n }) => {
  const uni = e.codePointAt(0)?.toString(16)
  return {
    e,
    n,
    url: `https://em-content.zobj.net/source/microsoft-teams/363/${n}_${uni}.png`,
  }
})

export const getEmoji = (e: string) => {
  const r = EMOJIS.find((emoji) => emoji.e === e)?.url

  assert(r, `Emoji not found: ${e}`)

  return r
}

const getEmojiURL = (k: string) => {
  const key = k.replace(/\D/g, "")

  return EMOJIS[Number(key) % EMOJIS.length].url
}
