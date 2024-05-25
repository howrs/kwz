import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { Header } from "components/Header"
import { Button } from "components/ui/button"
import { Separator } from "components/ui/separator"
import Image from "next/image"
import { Fragment } from "react"

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />

      <Emoji u="shopping-bags_1f6cd-fe0f" className="mt-2 size-32" />

      <h1 className="mt-2 text-4xl">Store</h1>

      {/* Balance */}
      <div className="mt-2 flex w-full justify-end p-2 px-4">
        <div className="flex items-center gap-2 text-2xl">
          <p className="tabular-nums">
            {Intl.NumberFormat("en-US", {
              currency: "USD",
            }).format(1000)}
          </p>
          <Image
            priority
            className="size-6 rounded-full"
            src="/babydoge.jpg"
            width={100}
            height={100}
            alt="Baby Doge"
          />
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
                    <Image
                      priority
                      className="size-5 rounded-full"
                      src="/babydoge.jpg"
                      width={100}
                      height={100}
                      alt="Baby Doge"
                    />
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
    name: "바나나 우유",
    icon: "banana_1f34c",
    price: 300,
  },
  {
    id: "4",
    name: "오렌지 주스",
    icon: "tangerine_1f34a",
    price: 400,
  },
  {
    id: "5",
    name: "레몬에이드",
    icon: "tropical-drink_1f379",
    price: 500,
  },
  {
    id: "6",
    name: "피자",
    icon: "pizza_1f355",
    price: 600,
  },
  {
    id: "7",
    name: "떡볶이",
    icon: "curry-rice_1f35b",
    price: 700,
  },
  {
    id: "8",
    name: "아이스크림",
    icon: "ice-cream_1f368",
    price: 800,
  },
  {
    id: "9",
    name: "핫도그",
    icon: "hot-dog_1f32d",
    price: 900,
  },
  {
    id: "10",
    name: "볶음밥",
    icon: "cooked-rice_1f35a",
    price: 1000,
  },
  {
    id: "11",
    name: "인형",
    icon: "teddy-bear_1f9f8",
    price: 1100,
  },
  {
    id: "12",
    name: "퍼즐",
    icon: "puzzle-piece_1f9e9",
    price: 1200,
  },
  {
    id: "13",
    name: "로봇",
    icon: "robot_1f916",
    price: 1300,
  },
]

// 뽀로로 음료
// 딸기우유
// 바나나 우유
// 오렌지 주스
// 레몬에이드

// 피자
// 떡복이
// 아이스크림
// 핫도그
// 볶음밥

// 슬라임
// 젠가
// 로봇
