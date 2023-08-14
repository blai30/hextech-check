/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'ddragon.leagueoflegends.com',
      'i.imgur.com',
    ],
  },
}

module.exports = nextConfig
