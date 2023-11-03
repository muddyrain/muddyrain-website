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
