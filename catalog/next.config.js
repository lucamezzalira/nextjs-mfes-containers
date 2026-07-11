const { withMicrofrontends } = require('@vercel/microfrontends/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_CATALOG_BASE_PATH || '/catalog',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: ['@t-shirt-shop/shared'],
};

module.exports = withMicrofrontends(nextConfig);
