/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_CATALOG_BASE_PATH,
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CATALOG_ASSET_PREFIX : '',
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['@t-shirt-shop/shared'],
}

module.exports = nextConfig 