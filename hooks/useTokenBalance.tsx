import { missionManagerAbi } from "hooks/abis"
import { type Address, erc20Abi } from "viem"
import { useReadContract } from "wagmi"

type Params = {
  address: Address
  token: Address
}

type MissionParam = {
  walletAddress: Address
  contractAddress: Address
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

export const missionManagerContract: Address = "0xC745295a144548B25d2a71d6A680cbf363C7c67B";

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

export function getMissionList({ walletAddress, contractAddress}: MissionParam) {
  return useReadContract({
    address: contractAddress,
    abi: missionManagerAbi,
    functionName: "getMissionList",
    args: [walletAddress],
    query: {
      enabled: !!walletAddress && !!contractAddress,
    },
  })
}