/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_HOME_ASSET_PREFIX : undefined,
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/catalog/:path*',
          destination: `${process.env.NEXT_PUBLIC_CATALOG_URL}${process.env.NEXT_PUBLIC_CATALOG_BASE_PATH}/:path*`,
        },
        {
          source: '/account/:path*',
          destination: `${process.env.NEXT_PUBLIC_ACCOUNT_URL}${process.env.NEXT_PUBLIC_ACCOUNT_BASE_PATH}/:path*`,
        },
      ],
    };
  },
  transpilePackages: ['@t-shirt-shop/shared'],
};

module.exports = nextConfig; 