/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@nicmosc/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nicmosc-com-assets.s3.eu-west-1.amazonaws.com',
      },
    ],
  },
};
