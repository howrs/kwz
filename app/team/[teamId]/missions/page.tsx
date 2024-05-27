"use client"

import { Separator } from "@radix-ui/react-dropdown-menu"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { Header } from "components/Header"
import { Button } from "components/ui/button"
import { Progress } from "components/ui/progress"
import { useAuth } from "hooks/useAuth"
import { KWZ, useTokenBalance } from "hooks/useTokenBalance"
import { Fragment } from "react"
import { type Address, formatEther } from "viem"

export const runtime = "edge"

export default function Page() {
  const { user } = useAuth()

  const { data, isPending } = useTokenBalance({
    address: user?.address! as Address,
    token: KWZ.ADDRESS,
  })

  if (isPending) {
    return null
  }

  const balance = data!

  return (
    <div className="flex w-full flex-col">
      <Header />

      <div className="mt-8 flex w-full items-center justify-center gap-3 text-2xl">
        <Emoji u="coin_1fa99" className="size-8" />
        <p className="tabular-nums">
          {Intl.NumberFormat("en-US", {
            currency: "USD",
          }).format(+formatEther(balance))}
        </p>
        <p className="">KWZ</p>
      </div>

      <Separator className="mt-12 h-px bg-white/10" />

      <section className="w-full flex-1 overflow-y-auto">
        <ul className="flex flex-col justify-center">
          {MISSIONS.map(
            ({ id, name, description, reward, icon, current, goal }) => (
              <Fragment key={name}>
                <li className="flex w-full items-center" key={name}>
                  <Button
                    className="flex h-auto w-full gap-3 p-4"
                    variant="ghost"
                  >
                    <Emoji u={icon} className="size-16" />

                    <div className="grow text-left">
                      <h3 className="text-2xl">{name}</h3>
                      <div className="text-base opacity-60">
                        <span className="line-clamp-1 text-wrap">
                          {description}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          className="h-2 max-w-64 flex-1"
                          value={(current / goal) * 100}
                        />
                        <span className="flex gap-0.5 tabular-nums">
                          <span className="opacity-50">{current}</span>
                          <span>/</span>
                          <span>{goal}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex h-full min-w-12 flex-col items-center justify-center">
                      <Emoji u="coin_1fa99" className="size-8" />
                      <div className="text-xl tabular-nums">{reward}</div>
                    </div>
                  </Button>
                </li>
                <Separator className="h-px bg-white/10" />
              </Fragment>
            ),
          )}
        </ul>
      </section>
    </div>
  )
}

type Mission = {
  id: string
  name: string
  description: string
  reward: number
  icon: string
  current: number
  goal: number
}

const MISSIONS: Mission[] = [
  {
    id: "1",
    name: "Steps",
    description: "Do something",
    reward: 100,
    icon: "man-walking-light-skin-tone_1f6b6-1f3fb-200d-2642-fe0f",
    current: 10,
    goal: 10,
  },
  {
    id: "2",
    name: "Calories",
    description: "Do something else",
    reward: 200,
    icon: "fire_1f525",
    current: 10,
    goal: 20,
  },
  {
    id: "3",
    name: "Time Attack",
    description: "Do something else again",
    reward: 300,
    icon: "stopwatch_23f1-fe0f",
    current: 5,
    goal: 30,
  },
  {
    id: "4",
    name: "Bridge Play",
    description: "Do something else again 12312312123",
    reward: 400,
    icon: "person-running_1f3c3",
    current: 25,
    goal: 40,
  },
  {
    id: "5",
    name: "Climbing",
    description: "Do something else again",
    reward: 500,
    icon: "woman-climbing-light-skin-tone_1f9d7-1f3fb-200d-2640-fe0f",
    current: 42,
    goal: 50,
  },
]
