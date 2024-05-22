"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { ComponentProps } from "react"
import { toast } from "sonner"

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e: any) => {
        const msg = e.shortMessage || e.details || e.name
        toast.error(msg)
      },
    },
  },
})

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({ children, ...props }: Props) => {
  return (
    <QueryClientProvider {...props} client={client}>
      {children}
      {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
