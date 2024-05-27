import type { Address } from "viem"

export const maskAddress = (address: string | Address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
