/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@nicmosc/ui"],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3001', 'nicmosc-com-admin-6qw52zvcm-nicmoscs-projects.vercel.app'],
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
