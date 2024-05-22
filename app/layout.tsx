import "app/globals.css"
import { QueryProvider } from "components/QueryProvider"

import { Toaster } from "components/ui/sonner"
import { HOST } from "constants/urls"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "lib/utils"
import type { Metadata } from "next"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "KWZ"
  const description = "KWZ"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${HOST}`,
      siteName: title,
    },
  }
}

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, "dark")}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="flex justify-center">
        <QueryProvider>
          <main className="flex h-dvh w-full max-w-screen-sm justify-center">
            {children}
          </main>
        </QueryProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
