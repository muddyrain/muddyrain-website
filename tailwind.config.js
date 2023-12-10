import tailwindScrollbar from 'tailwind-scrollbar'
import loadingPlugins from './plugins/loadingPlugins'
/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}']
export const theme = {
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
      content: '960px',
      wrapper: '1680px',
    },
    height: {
      container: '1180px',
    },
  },
}
export const plugins = [tailwindScrollbar({ nocompatible: true }), loadingPlugins]
export const corePlugins = {
  // 一套武断的针对 Tailwind 项目预设的基础样式
  preflight: false,
}
