import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import NextImage, { ImageProps } from 'next/image'
import gsap from 'gsap'
import { RefreshOutlined, RestartAlt, ZoomInOutlined, ZoomOutOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Mask } from '../Mask'
import { useMouseLeavePage } from '@/hooks/useMouseLeavePage'
import { getTransformScale } from './tools'
import { debounce } from '@/utils'

export const PreviewImage: FC<ImageProps> = ({ ...props }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const previewRef = useRef<HTMLImageElement>(null)
  const [dragging, setDragging] = useState(false)
  const [offsetPosition, setOffsetPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [rect, setRect] = useState<DOMRect | null>(null)
  const isAnimatingRef = useRef(false)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const handlePreview = () => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    setRect(rect)
  }
  useMouseLeavePage(() => {
    if (rect) {
      handleReset(() => {
        setDragging(false)
      })
    }
  })
  // 关闭预览
  const handleClose = useCallback(() => {
    gsap.to(previewRef.current, {
      duration: 0.3,
      x: rect?.left,
      y: rect?.top,
      left: 0,
      top: 0,
      scale: 1,
      rotate: 0,
      onComplete: () => {
        setRect(null)
        setDragging(false)
      },
    })
  }, [rect])
  // 重置属性
  const handleReset = useCallback((onComplete?: GSAPCallback) => {
    gsap.to(previewRef.current, {
      duration: 0.3,
      scale: 1,
      rotate: 0,
      left: 0,
      top: 0,
      onComplete,
    })
  }, [])
  // 监听rect变化后，将图片移动到中心
  useEffect(() => {
    if (!previewRef.current) return
    if (!rect) return
    // 移动到中心
    gsap.to(previewRef.current, {
      duration: 0.5,
      delay: 0,
      scale: 1,
      rotate: 0,
      x: window.innerWidth / 2 - rect.width / 2,
      y: window.innerHeight / 2 - rect.height / 2,
    })
  }, [rect])

  // 拖拽
  const handleDragStart = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const draggableElement = previewRef.current
    if (draggableElement) {
      // 计算鼠标在拖动元素内的偏移量
      const offsetX = e.clientX - (draggableElement?.offsetLeft || 0)
      const offsetY = e.clientY - (draggableElement?.offsetTop || 0)
      // 添加拖动时的样式
      draggableElement.style.opacity = '0.95'
      draggableElement.style.cursor = 'grabbing'
      setOffsetPosition({ x: offsetX, y: offsetY })
      setDragging(true)
    }
  }
  // 拖拽中
  const handleDragMove = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const draggableElement = previewRef.current
    if (dragging && offsetPosition && draggableElement) {
      // 计算拖动元素的新位置
      const x = e.clientX - offsetPosition.x
      const y = e.clientY - offsetPosition.y
      // 更新拖动元素的位置
      draggableElement.style.left = x + 'px'
      draggableElement.style.top = y + 'px'
    }
  }
  // 拖拽结束
  const handleDragEnd = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const draggableElement = previewRef.current
    if (draggableElement) {
      setDragging(false)
      // 移除拖动时的样式
      draggableElement.style.opacity = '1'
      draggableElement.style.cursor = 'move'
    }
  }

  // 生成带timeline的handler
  const withTimeline = (handler: (timeline: gsap.core.Timeline) => void) => {
    return () => {
      if (isAnimatingRef.current) return
      isAnimatingRef.current = true
      const timeline = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false
        },
      })

      handler(timeline)
      timelineRef.current = timeline
    }
  }
  // 放大
  const handleZoomIn = withTimeline(timeline => {
    const scaleValue = getTransformScale(previewRef.current!)
    if (Math.abs(scaleValue) <= 5) {
      timeline.to(previewRef.current, {
        duration: 0.3,
        scale: '+=0.25',
      })
    }
  })
  // 缩小
  const handleZoomOut = withTimeline(timeline => {
    const scaleValue = getTransformScale(previewRef.current!)
    if (Math.abs(scaleValue) >= 0.5) {
      timeline.to(previewRef.current, {
        duration: 0.3,
        scale: '-=0.25',
      })
    }
  })
  // 顺时针旋转
  const handleRotateRight = withTimeline(timeline => {
    timeline.to(previewRef.current, {
      duration: 0.3,
      rotate: '+=90',
    })
  })

  // 逆时针旋转
  const handleRotateLeft = withTimeline(timeline => {
    timeline.to(previewRef.current, {
      duration: 0.3,
      rotate: '-=90',
    })
  })

  // 滚轮缩放
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.deltaY < 0 ? handleZoomIn() : handleZoomOut()
  }
  const debounceClose = useCallback(
    debounce(() => {
      if (rect) {
        handleClose()
      }
    }, 300),
    [rect]
  )
  useEffect(() => {
    window.addEventListener('resize', debounceClose)
    return () => {
      window.removeEventListener('resize', debounceClose)
    }
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
      <Mask open={!!rect} onClickOutside={handleClose}>
        <NextImage
          src={props.src}
          width={rect?.width || 0}
          height={rect?.height || 0}
          alt="preview-image"
          ref={previewRef}
          className=""
          draggable={false}
          onClick={e => {
            e.stopPropagation()
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onWheel={handleWheel}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translateX(${rect?.left || 0}px) translateY(${
              rect?.top || 0
            }px) scale(1) rotate(0)`,
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
              handleZoomOut()
            }}
          >
            <ZoomOutOutlined />
          </IconButton>
          {/* 放大 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              handleZoomIn()
            }}
          >
            <ZoomInOutlined />
          </IconButton>
          {/* 复原 */}
          <IconButton className="text-zinc-100" onClick={() => handleReset()}>
            <RestartAlt />
          </IconButton>
          {/* 逆时针旋转 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              handleRotateLeft()
            }}
          >
            <RefreshOutlined className="-scale-x-100" />
          </IconButton>
          {/* 顺时针旋转 */}
          <IconButton
            className="text-zinc-100"
            onClick={() => {
              handleRotateRight()
            }}
          >
            <RefreshOutlined />
          </IconButton>
        </div>
      </Mask>
    </>
  )
}
