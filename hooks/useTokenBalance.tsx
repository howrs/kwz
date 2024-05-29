import { type Address, erc20Abi } from "viem"
import { useReadContract } from "wagmi"

type Params = {
  address: Address
  token: Address
}

export const TUSD = {
  ADDRESS: "0xbf29146F8bC461d101D9Aa755cb84EfCF527Bd9d" as Address,
  name: "TrueUSD",
  SYMBOL: "TUSD",
}

export const KWZ = {
  ADDRESS: `0xbf4D6BC5793Fb20e588461783f508F27F87275E1` as Address,
  name: "KWZ",
  SYMBOL: "KWZ",
}

export function useTokenBalance({ address, token }: Params) {
  return useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address && !!token,
    },
  })
}
