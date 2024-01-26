/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@nicmosc/ui"],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3001'],
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
};
