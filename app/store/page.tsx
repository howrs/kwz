"use client"

import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { Header } from "components/Header"
import { Button } from "components/ui/button"
import { Separator } from "components/ui/separator"
import { useAuth } from "hooks/useAuth"
import { KWZ, useTokenBalance } from "hooks/useTokenBalance"
import { Fragment } from "react"
import { type Address, formatEther } from "viem"

export default function Page() {
  const { user } = useAuth()

  const { data, isPending } = useTokenBalance({
    address: user?.address! as Address,
    token: KWZ.ADDRESS,
  })

  if (isPending) {
    return null
  }

  const address = user?.address! as Address
  const balance = data!

  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <Emoji u="shopping-bags_1f6cd-fe0f" className="mt-2 size-32" />

      <h1 className="mt-2 text-4xl">Store</h1>

      <div className="mt-2 flex w-full justify-end p-2 px-4">
        <div className="flex items-center gap-2 text-2xl">
          <p className="tabular-nums">
            {Intl.NumberFormat("en-US", {
              currency: "USD",
            }).format(+formatEther(balance))}
          </p>
          <Emoji u="coin_1fa99" className="size-6" />
        </div>
      </div>

      <Separator className="h-px bg-white/10" />

      <div className="w-full flex-1 overflow-y-auto">
        <ul className="flex h-auto w-full flex-col">
          {PRODUCTS.map(({ id, icon, name, price }) => (
            <Fragment key={id}>
              <li className="flex w-full items-center">
                <Button
                  variant="ghost"
                  className="flex h-auto w-full gap-2 p-2"
                >
                  <Emoji u={icon} className="size-16" />
                  <h3 className="grow text-left text-xl">{name}</h3>
                  <div className="flex items-center gap-2 px-2 text-lg tabular-nums">
                    {Intl.NumberFormat("en-US", { currency: "USD" }).format(
                      price,
                    )}
                    <Emoji u="coin_1fa99" className="size-5" />
                  </div>
                </Button>
              </li>
              <Separator className="h-px bg-white/10" />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}

type Product = {
  id: string
  name: string
  icon: string
  price: number
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "BBoRoRo drink",
    icon: "beverage-box_1f9c3",
    price: 100,
  },
  {
    id: "2",
    name: "Strawberry Milk",
    icon: "cup-with-straw_1f964",
    price: 200,
  },
  {
    id: "3",
    name: "Banana Milk",
    icon: "banana_1f34c",
    price: 300,
  },
  {
    id: "4",
    name: "Orange Juice",
    icon: "tangerine_1f34a",
    price: 400,
  },
  {
    id: "5",
    name: "Lemonade",
    icon: "tropical-drink_1f379",
    price: 500,
  },
  {
    id: "6",
    name: "Pizza",
    icon: "pizza_1f355",
    price: 600,
  },
  {
    id: "7",
    name: "Tteokbokki",
    icon: "curry-rice_1f35b",
    price: 700,
  },
  {
    id: "8",
    name: "Ice Cream",
    icon: "ice-cream_1f368",
    price: 800,
  },
  {
    id: "9",
    name: "Hot Dog",
    icon: "hot-dog_1f32d",
    price: 900,
  },
  {
    id: "10",
    name: "Fried Rice",
    icon: "cooked-rice_1f35a",
    price: 1000,
  },
  {
    id: "11",
    name: "Doll",
    icon: "teddy-bear_1f9f8",
    price: 1100,
  },
  {
    id: "12",
    name: "Puzzle",
    icon: "puzzle-piece_1f9e9",
    price: 1200,
  },
  {
    id: "13",
    name: "Robot",
    icon: "robot_1f916",
    price: 1300,
  },
]
