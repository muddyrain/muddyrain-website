import dayjs from 'dayjs'

// 获取随机数字
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getCurrentTime = (formate = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().format(formate)
}

export const formatTime = (
  time: string | number | dayjs.Dayjs | Date,
  formate = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(formate)
}

/**
 * 节流函数
 */
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

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null

  return function (this: any, ...args: Parameters<T>): void {
    clearTimeout(timerId!)
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
type DeepKeys<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? `${Prefix & string}${K & string}${DeepKeys<T[K], '.'>}`
        : never
    }[keyof T]
  : ''
export function getProperty<T, K extends DeepKeys<T> | (keyof T & string)>(obj: T, property: K) {
  const keys: string[] = property.split('.')
  let value: any = obj
  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      break
    }
  }
  return value
}
