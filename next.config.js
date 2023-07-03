/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ddragon.leagueoflegends.com',
      'blai30hextechcheck.azurewebsites.net',
    ],
  },
}

module.exports = nextConfig
