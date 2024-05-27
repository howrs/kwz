import { QueryProvider } from "components/QueryProvider"
import { WagmiProvider } from "components/WagmiProvider"
import type { PropsWithChildren } from "react"

type Props = PropsWithChildren

export const Providers = ({ children }: Props) => {
  return (
    <WagmiProvider>
      <QueryProvider>{children}</QueryProvider>
    </WagmiProvider>
  )
}
