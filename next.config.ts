import type { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // typedRoutes: true,
  },
  compiler: {
    // removeConsole: true,
  },
}

export default config
