/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_ACCOUNT_BASE_PATH,
  assetPrefix: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ACCOUNT_ASSET_PREFIX : '',
  transpilePackages: ['@t-shirt-shop/shared'],
};

module.exports = nextConfig; 