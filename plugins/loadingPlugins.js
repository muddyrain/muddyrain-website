/**
 * 自定义loading插件 ts 类型
 * @param {import('tailwindcss').PluginUtilities} param0
 */
module.exports = function ({ addUtilities }) {
  const utilities = {
    '@keyframes slide': {
      '0%': {
        transform: 'translateX(0)',
        filter: 'brightness(1)',
      },
      '100%': {
        transform: 'translateX(128px)',
        filter: 'brightness(1.45)',
      },
    },
    '.loading-slide': {
      animation: 'slide 1.5s ease-in-out infinite alternate',
    },
  }
  // 剩下的使用 循环生成
  for (let i = 1; i <= 4; i++) {
    utilities[`@keyframes jump-off-${i}`] = {
      '0%': { transform: 'rotate(0deg)' },
      // 15 30 45 60
      [`${i * 15}%`]: { transform: 'rotate(0deg)' },
      // 35 50 65 80
      [`${i * 15 + 20}%`]: {
        transformOrigin: '-50% center',
        transform: 'rotate(-180deg)',
      },
      '100%': {
        transformOrigin: '-50% center',
        transform: 'rotate(-180deg)',
      },
    }
    utilities[`.loading-jump-off-${i}`] = {
      animation: `jump-off-${i} 1.5s ease-in-out infinite alternate`,
    }

    utilities[`@keyframes jump-down-${i}`] = {
      // 5 20 35 50
      [`${5 + (i - 1) * 15}%`]: { transform: 'scale(1, 1)' },
      // 15 30 45 60
      [`${i * 15}%`]: {
        transformOrigin: 'center bottom',
        transform: 'scale(1.3, 0.7)',
      },
      // 20 35 50 65
      [`${20 + (i - 1) * 15}%`]: {
        transformOrigin: 'center bottom',
        transform: 'scale(0.8, 1.4)',
      },
      // 25 40 55 70
      [`${25 + (i - 1) * 15}%`]: {
        transformOrigin: 'center bottom',
        transform: 'scale(0.8, 1.4)',
      },
      // 40 55 70 85
      [`${40 + (i - 1) * 15}%`]: {
        transformOrigin: 'center top',
        transform: 'scale(1.3, 0.7)',
      },
      // 55 70 85 100
      [`${55 + (i - 1) * 15}%`]: { transform: 'scale(1, 1)' },
      '100%': { transform: 'scale(1, 1)' },
    }
    utilities[`.loading-jump-down-${i}`] = {
      animation: `jump-down-${i} 1.5s ease-in-out infinite alternate`,
    }
  }

  addUtilities(utilities)
}
