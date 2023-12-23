import { srcType } from '@/types'
import NextImage from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'
import { PreviewImage } from '../PreviewImage'

export const LazyImage: FC<{
  src: srcType
  preview?: boolean
}> = ({ src, preview }) => {
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
      currentQuality.current = getNextQuality(currentQuality.current)
      requestAnimationFrame(() => {
        setImageSrc(currentUrl)
        if (currentQuality.current === 'large2x') return
        loadImage()
      })
    }
  }
  useEffect(() => {
    loadImage()
  }, [])

  return (
    <div className="w-full h-auto relative">
      {preview ? (
        <PreviewImage src={`${imageSrc}`} width={0} height={0} alt={'picture'} />
      ) : (
        <NextImage
          src={`${imageSrc}`}
          width={0}
          height={0}
          alt={'picture'}
          className="w-full h-auto "
        />
      )}
    </div>
  )
}
