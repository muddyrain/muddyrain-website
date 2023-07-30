// 获取随机数字
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
