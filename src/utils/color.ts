import { RGBColor } from '@/types'

/**
 * 加深颜色
 * @param rgbColor
 * @param amount
 */
export function darkenColor(rgbColor: RGBColor, amount: number): RGBColor {
  const [r, g, b] = rgbColor

  // 计算加深后的颜色值
  const newR = Math.max(r - amount, 0)
  const newG = Math.max(g - amount, 0)
  const newB = Math.max(b - amount, 0)

  return [newR, newG, newB]
}
