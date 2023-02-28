/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lnfts.infura-ipfs.io',
        port: '',
        pathname: '/ipfs/**'
      }
    ]
  }
}

module.exports = nextConfig
