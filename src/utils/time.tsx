import dayjs from 'dayjs'

/**
 * 获取当前时间
 */
export const getCurrentTime = (formate = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs().format(formate)
}
/**
 * 格式化时间
 */
export const formatTime = (
  time: string | number | dayjs.Dayjs | Date,
  formate = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs(time).format(formate)
}
/**
 * 秒数转换为分秒
 */
export const secondToTime = (second: number) => {
  const min = Math.floor(second / 60)
  const sec = Math.floor(second % 60)
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}
/**
 * 时间戳毫秒数转换为分秒
 */
export const millisecondToTime = (millisecond: number) => {
  return secondToTime(Math.floor(millisecond / 1000))
}
