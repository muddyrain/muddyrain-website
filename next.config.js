/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['muddyrain-oss.oss-cn-hangzhou.aliyuncs.com', 'http://p1.music.126.net'],
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  cssModules: true,
}

module.exports = nextConfig
