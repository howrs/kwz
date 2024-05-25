"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { ComponentProps } from "react"
import { toast } from "sonner"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
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
      <ReactQueryStreamedHydration>
        {children}
        <ProgressBar
          height="3px"
          color={"hsl(var(--primary))"}
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ReactQueryStreamedHydration>

      {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
