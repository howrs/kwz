"use client"

import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Emoji } from "app/team/[teamId]/qr/Emoji"
import { QRCode } from "app/team/[teamId]/qr/QRCode"
import { Header } from "components/Header"
import { Button } from "components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "components/ui/drawer"
import { useAuth } from "hooks/useAuth"
import { TUSD, useTokenBalance } from "hooks/useTokenBalance"
import { maskAddress } from "lib/maskAddress"
import { ArrowUp, DollarSign } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { type Address, erc20Abi, formatEther } from "viem"

export const runtime = "edge"

export default function Page() {
  const { user } = useAuth()

  const { data, isPending } = useTokenBalance({
    address: user?.address! as Address,
    token: TUSD.ADDRESS,
  })

  const [isCopied, copy] = useCopyToClipboard()

  if (isPending) {
    return null
  }

  const address = user?.address!

  return (
    <div className="flex w-full flex-col gap-8">
      <Header />

      <div className="flex w-full flex-col items-center justify-center text-4xl">
        <div className="flex gap-2">
          <p className="tabular-nums">
            {Intl.NumberFormat("en-US", {
              currency: "USD",
            }).format(+formatEther(data!))}
          </p>
          <p className="">TUSD</p>
          <Image
            priority
            unoptimized
            className="size-8 rounded-full"
            width={100}
            height={100}
            alt="TSUD logo"
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/2563.png"
          />
        </div>
        <Button
          variant="ghost"
          className="font-mono opacity-70"
          onClick={async () => {
            await copy(address)
            toast.success("Copied to clipboard")
          }}
        >
          {maskAddress(address)}
        </Button>
      </div>

      <div className="flex justify-center gap-6">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="gap-1 rounded-full">
              <DollarSign className="size-4" />
              Buy
            </Button>
          </DrawerTrigger>
          <DrawerContent className="mx-auto flex max-w-screen-sm gap-8 pb-8">
            <h3 className="px-12 text-center font-ink text-xl">
              Show this QR code to the cashier to buy TUSD with cash or card
            </h3>
            <div className="relative">
              <QRCode
                str={"0x6c95305d05CccD9376799c8e9514ADAAF8a46d6C"}
                className="size-64"
              />
              <Emoji
                e="🤑"
                n="money-mouth-face"
                className="absolute inset-0 m-auto size-24"
              />
            </div>
          </DrawerContent>
        </Drawer>
        <Button className="gap-1 rounded-full" variant="secondary">
          <ArrowUp className="size-4" />
          Send
        </Button>
      </div>

      {/* <div className="flex flex-col text-center">
        <h2 className="">Your wallet address</h2>
        <p className="font-bold font-mono text-sm">{user.address}</p>
      </div> */}
    </div>
  )
}
