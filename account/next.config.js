const { withMicrofrontends } = require('@vercel/microfrontends/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_ACCOUNT_BASE_PATH || '/account',
  output: 'standalone',
  transpilePackages: ['@t-shirt-shop/shared'],
};

module.exports = withMicrofrontends(nextConfig);
