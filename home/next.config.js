const { withMicrofrontends } = require('@vercel/microfrontends/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
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
