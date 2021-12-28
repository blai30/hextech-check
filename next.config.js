const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
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
