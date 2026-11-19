import type { NextConfig } from 'next'

// Fully static site: every route is prerendered at build time.
// Cache Components is left off on purpose; with it on, unknown project slugs
// can only return a "soft" 404 (status 200 + noindex) instead of a real 404.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
