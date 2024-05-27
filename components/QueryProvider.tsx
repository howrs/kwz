"use client"

import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { AppProgressBar as ProgressBar } from "next-nprogress-bar"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { ComponentProps } from "react"
import { toast } from "sonner"
import { isServer } from "utils/isServer"

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
    },
    mutations: {
      onError: (e: any) => {
        const msg = e.shortMessage || e.details || e.name
        toast.error(msg)
      },
    },
  },
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer()) {
    // Server: always make a new query client
    return new QueryClient(config)
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // supsends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = new QueryClient(config)
    return browserQueryClient
  }
}

type Props = {} & Omit<ComponentProps<typeof QueryClientProvider>, "client">

export const QueryProvider = ({ children, ...props }: Props) => {
  const client = getQueryClient()

  return (
    <QueryClientProvider {...props} client={client}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      <ProgressBar
        height="3px"
        color={"hsl(var(--primary))"}
        options={{ showSpinner: false }}
        shallowRouting
      />
      {/* </ReactQueryStreamedHydration> */}

      {/* {!isProd() && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
