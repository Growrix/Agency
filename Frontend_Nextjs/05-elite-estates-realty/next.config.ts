import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    qualities: [60, 70, 75, 85],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2_592_000,
  },
};

export default nextConfig;
