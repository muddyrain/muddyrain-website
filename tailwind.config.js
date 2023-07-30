/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#6060e0',
      },
      width: {
        container: '1180px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 一套武断的针对 Tailwind 项目预设的基础样式
    preflight: false,
  },
};
