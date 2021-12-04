const pathPrefix = process.env.NODE_ENV === 'production'
  ? '/hextech-check'
  : ''

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: pathPrefix,
  assetPrefix: pathPrefix,
}
