import "app/globals.css"

import { Providers } from "components/Providers"
import { Toaster } from "components/ui/sonner"
import { HOST } from "constants/urls"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { cn } from "lib/utils"
import type { Metadata } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Ink = localFont({
  src: "./KyoboHandwriting2023wsa.woff2",
  display: "swap",
  variable: "--font-ink",
})

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
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        Ink.variable,
        "dark",
      )}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="flex justify-center">
        <Providers>
          <main className="flex h-dvh w-full max-w-screen-sm justify-center bg-background">
            {children}
            <Toaster richColors />
          </main>
        </Providers>
      </body>
    </html>
  )
}
