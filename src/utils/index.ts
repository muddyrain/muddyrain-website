import dayjs from 'dayjs'

// 获取随机数字
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getCurrentTime = (formate = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().format(formate)
}

export const formateTime = (
  time: string | number | dayjs.Dayjs | Date,
  formate = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(formate)
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let timerId: ReturnType<typeof setTimeout> | null
  let lastExecTime = 0

  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    const currentTime = Date.now()
    const elapsedTime = currentTime - lastExecTime

    if (!timerId && elapsedTime > delay) {
      const result = func.apply(this, args)
      lastExecTime = currentTime
      return result
    } else {
      clearTimeout(timerId!)
      timerId = setTimeout(() => {
        const result = func.apply(this, args)
        lastExecTime = Date.now()
        timerId = null
        return result
      }, delay - elapsedTime)
    }
  }
}
