import { FC, useEffect, useRef, useState } from 'react'
import NextImage, { ImageProps } from 'next/image'
import gsap from 'gsap'
import { RefreshOutlined, RestartAlt, ZoomInOutlined, ZoomOutOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useLayoutStore } from '@/store/useLayoutStore'
import { Mask } from '../Mask'

export const PreviewImage: FC<ImageProps> = ({ ...props }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const previewRef = useRef<HTMLImageElement>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const setIsScrollDisabled = useLayoutStore(state => state.setIsScrollDisabled)
  const handlePreview = () => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    setRect(rect)
    setIsScrollDisabled(true)
  }
  useEffect(() => {
    if (!previewRef.current) return
    if (!rect) return
    // 移动到中心
    gsap.to(previewRef.current, {
      duration: 0.5,
      delay: 0,
      x: window.innerWidth / 2 - rect.width / 2,
      y: window.innerHeight / 2 - rect.height / 2,
      transformOrigin: 'center center',
    })
  }, [rect])
  return (
    <>
      <NextImage
        ref={imageRef}
        width={0}
        height={0}
        className={`w-full h-auto cursor-pointer duration-300 ${props.className}`}
        onClick={() => {
          handlePreview()
        }}
        {...props}
      />
      <Mask
        open={!!rect}
        onClickOutside={() => {
          gsap.to(previewRef.current, {
            duration: 0.3,
            x: rect?.left,
            y: rect?.top,
            scale: 1,
            rotate: 0,
            onComplete: () => {
              setRect(null)
              setIsScrollDisabled(false)
            },
          })
        }}
      >
        <NextImage
          src={props.src}
          width={rect?.width || 0}
          height={rect?.height || 0}
          alt="preview-image"
          ref={previewRef}
          className="cursor-pointer"
          draggable="false"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateX(${rect?.left || 0}px) translateY(${rect?.top || 0}px)`,
          }}
        />
        {/* 工具条 */}
        <div
          className="absolute bottom-10 z-50 left-1/2 translate-x-[-50%] flex rounded-xl bg-zinc-600/75 py-2 px-3 justify-center items-center"
          onClick={e => {
            e.stopPropagation()
          }}
        >
          {/* 缩小 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              gsap.to(previewRef.current, {
                duration: 0.3,
                scale: '-=0.1',
              })
            }}
          >
            <ZoomOutOutlined />
          </IconButton>
          {/* 放大 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              gsap.to(previewRef.current, {
                duration: 0.3,
                scale: '+=0.1',
              })
            }}
          >
            <ZoomInOutlined />
          </IconButton>
          {/* 复原 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              gsap.to(previewRef.current, {
                duration: 0.3,
                scale: 1,
                rotate: 0,
              })
            }}
          >
            <RestartAlt />
          </IconButton>
          {/* 逆时针旋转 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              gsap.to(previewRef.current, {
                duration: 0.3,
                rotate: '-=90',
              })
            }}
          >
            <RefreshOutlined className="-scale-x-100" />
          </IconButton>
          {/* 顺时针旋转 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              gsap.to(previewRef.current, {
                duration: 0.3,
                rotate: '+=90',
              })
            }}
          >
            <RefreshOutlined />
          </IconButton>
        </div>
      </Mask>
    </>
  )
}
