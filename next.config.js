/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['muddyrain-oss.oss-cn-hangzhou.aliyuncs.com'],
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  cssModules: true,
}

module.exports = nextConfig
