/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['muddyrain-oss.oss-cn-hangzhou.aliyuncs.com', 'http://p1.music.126.net'],
  },
  output: 'export',
  reactStrictMode: true,
  cssModules: true,
}

module.exports = nextConfig
