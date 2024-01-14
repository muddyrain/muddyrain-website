import { useMemo } from 'react'
import { darkenColor } from '@/utils/color'
import { RGBColor } from '@/types'

export const useColor = (color: RGBColor, deep: number = 50) => {
  const darkBackgroundColor = useMemo(() => {
    const darkenedColor = darkenColor(color, deep)
    return `linear-gradient(to bottom, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 1), #333333)`
  }, [color])

  return {
    darkBackgroundColor,
  }
}
