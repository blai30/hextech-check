const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/hextech-check'
  : ''

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
  images: {
    domains: [
      'ddragon.leagueoflegends.com',
      'blai30hextechcheck.azurewebsites.net',
    ],
  },
}
