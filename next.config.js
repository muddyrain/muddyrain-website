/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'muddyrain-oss.oss-cn-hangzhou.aliyuncs.com',
      'https://images.pexels.com',
      'http://p1.music.126.net',
    ],
  },
  reactStrictMode: true,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  trailingSlash: true,
}

module.exports = nextConfig
