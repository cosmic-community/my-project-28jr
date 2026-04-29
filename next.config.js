/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  images: {
    domains: ['imgix.cosmicjs.com', 'cdn.cosmicjs.com'],
  },
};

module.exports = nextConfig;