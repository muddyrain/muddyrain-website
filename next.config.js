/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['muddyrain-oss.oss-cn-hangzhou.aliyuncs.com'],
  },
 webpack(config) {
  return config
 }
};

module.exports = nextConfig;
