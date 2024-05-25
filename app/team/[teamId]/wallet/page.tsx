"use client"

import { Header } from "components/Header"
import { useAuth } from "hooks/useAuth"

export const runtime = "edge"

export default function Page() {
  const { user } = useAuth()

  return (
    <div className="flex w-full flex-col gap-8">
      <Header />
      <h1 className="flex w-full justify-center text-2xl">My Wallet Page</h1>
    </div>
  )
}
