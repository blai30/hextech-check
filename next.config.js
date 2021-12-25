import * as withPWA from 'next-pwa'
import * as runtimeCaching from 'next-pwa/runtime-caching'

const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/hextech-check'
  : ''

/** @type {import('next').NextConfig} */
export default withPWA({
  reactStrictMode: true,
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
  images: {
    domains: [
      'ddragon.leagueoflegends.com',
      'blai30hextechcheck.azurewebsites.net',
    ],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})
