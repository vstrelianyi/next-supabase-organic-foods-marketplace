import type { NextConfig, } from 'next';

const nextConfig : NextConfig = {
  /* config options here */
  experimental: {},
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'sypzttnhqtqzxuhbrhae.supabase.co',
      },
    ],
  },
};

export default nextConfig;
