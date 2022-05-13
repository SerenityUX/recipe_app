/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}
module.exports = {
  webpack5: true,
  images: {
    domains: ['dev.createforever.media'],
  },
}
