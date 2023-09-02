/** @type {import('tailwindcss').Config} */
const tailwindScrollbar = require('tailwind-scrollbar')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#6060e0',
      },
      width: {
        container: '1180px',
        wrapper: '1680px',
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
  corePlugins: {
    // 一套武断的针对 Tailwind 项目预设的基础样式
    preflight: false,
  },
}
