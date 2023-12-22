import { srcType } from '@/types'
import NextImage from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

export const LazyImage: FC<{
  src: srcType
}> = ({ src }) => {
  const imageRef = useRef<HTMLImageElement>(null)
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
    const currentUrl = src[currentQuality.current]
    tempImage.src = currentUrl
    tempImage.onload = () => {
      if (imageRef.current) {
        currentQuality.current = getNextQuality(currentQuality.current)
        requestAnimationFrame(() => {
          if (currentQuality.current === 'large2x') return
          loadImage()
          setImageSrc(currentUrl)
        })
      }
    }
  }
  useEffect(() => {
    loadImage()
  }, [])

  return (
    <div className="w-full h-auto relative">
      <NextImage
        src={`${imageSrc}`}
        width={0}
        height={0}
        alt={'picture'}
        className="w-full h-auto "
        ref={imageRef}
      />
    </div>
  )
}
