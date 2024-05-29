"use client"

import type { ComponentProps } from "react"
import { http, createConfig } from "wagmi"
import { WagmiProvider as Wagmi } from "wagmi"
import { bscTestnet } from "wagmi/chains"

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(`https://data-seed-prebsc-2-s3.binance.org:8545/`),
  },
})

type Props = Omit<ComponentProps<typeof Wagmi>, "config">

export const WagmiProvider = ({ children, ...props }: Props) => {
  return (
    <Wagmi {...props} config={config}>
      {children}
    </Wagmi>
  )
}
