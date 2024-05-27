"use client"

import type { ComponentProps } from "react"
import { http, createConfig } from "wagmi"
import { WagmiProvider as Wagmi } from "wagmi"
import { bscTestnet } from "wagmi/chains"

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
})

type Props = ComponentProps<typeof Wagmi>

export const WagmiProvider = ({ children, ...props }: Props) => {
  return (
    <Wagmi {...props} config={config}>
      {children}
    </Wagmi>
  )
}
