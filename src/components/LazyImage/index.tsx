import { srcType } from '@/types'
import NextImage from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

export const LazyImage: FC<{
  src: srcType
}> = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(src.small)
  const currentQuality = useRef<'small' | 'medium' | 'large' | 'large2x'>('small')
  const getNextQuality = (
    quality: typeof currentQuality.current
  ): typeof currentQuality.current => {
    if (quality === 'small') {
      return 'medium'
    } else if (quality === 'medium') {
      return 'large'
    } else if (quality === 'large') {
      return 'large2x'
    } else return 'large2x'
  }
  const loadImage = () => {
    const tempImage = new Image()
    tempImage.src = src[currentQuality.current]
    tempImage.onload = () => {
      currentQuality.current = getNextQuality(currentQuality.current)
      setImageSrc(src[currentQuality.current])
    }
  }
  useEffect(() => {
    loadImage()
  }, [imageSrc])
  return (
    <NextImage
      src={`${imageSrc}`}
      width={0}
      height={0}
      alt={'picture'}
      className="w-full h-auto"
      priority={true}
    />
  )
}
