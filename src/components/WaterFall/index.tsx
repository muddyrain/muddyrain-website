import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { loadImage } from './tools'
import { LazyImage } from '../LazyImage'
import { srcType } from '@/types'
import { Loading } from '../Loading'
import { debounce } from '@/utils'

interface WaterFallProps {
  className?: string
  dataSource: any[]
  column?: number
  gap?: number
  onRefresh?: () => void
}
interface ListItem {
  url: string
  width: number
  height: number
  left: number
  top: number
  src: srcType
  id: number
  key: string
}
export const WaterFall: FC<WaterFallProps> = ({
  className,
  dataSource,
  column = 6,
  gap = 10,
  onRefresh,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerHeight = useRef<number>(0)
  const loadingRef = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<ListItem[]>([])
  const heightList = useRef<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (heightList.current.length === 0) {
      heightList.current = Array(column).fill(0)
    }
    heightList.current.length = column
  }, [column])
  const computedWidth = useCallback(() => {
    if (containerRef.current) {
      const gapWidth = gap * (column - 1)
      const width = containerRef.current.clientWidth - gapWidth
      return width / column
    }
    return 0
  }, [])
  const loadList = async () => {
    if (containerRef.current && !isLoading) {
      setIsLoading(true)
      const columnWidth = computedWidth()
      for (let i = 0; i < dataSource.length; i++) {
        if (containerRef.current) {
          const item = dataSource[i]
          const imageUrl = item.src.small
          const { height: imageHeight, image } = await loadImage(imageUrl, columnWidth)
          // 计算高度最小的列
          const minHeight = Math.min(...heightList.current)
          const minIndex = heightList.current.indexOf(minHeight)
          // 设置位置
          list.push({
            url: image.src,
            src: item.src,
            left: minIndex * columnWidth + minIndex * gap,
            top: minHeight,
            width: columnWidth,
            height: imageHeight,
            id: item.id,
            key: `${i}-${item.id || '0'}`,
          })
          setList(() => [...list])
          // 更新高度
          heightList.current[minIndex] = minHeight + imageHeight + gap
          // 设置容器高度
          const maxHeight = Math.max(...heightList.current)
          containerRef.current.style.height = `${maxHeight}px`
          containerHeight.current = maxHeight
        }
      }
      // 数据加载完毕
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadList()
    return () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${containerHeight.current}px`
      }
    }
  }, [dataSource, computedWidth])

  const debounceCallback = useCallback(
    debounce(() => {
      !isLoading && onRefresh?.()
    }, 500),
    [isLoading]
  )
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (list.length > 0) {
      observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          debounceCallback()
        }
      })
      if (loadingRef.current) {
        observer.observe(loadingRef.current)
      }
    }
    return () => {
      if (loadingRef.current) {
        observer?.unobserve(loadingRef.current)
      }
    }
  }, [loadingRef, isLoading, list])

  return (
    <div>
      <div
        className={`flex flex-wrap relative duration-200 ${className}`}
        style={{ gap, height: containerHeight.current }}
        ref={containerRef}
      >
        {list.map(item => {
          return (
            <div
              key={item.key}
              style={{
                position: 'absolute',
                visibility: 'visible',
                pointerEvents: 'auto',
                width: item.width,
                height: item.height,
                transform: `translateX(${item.left}px) translateY(${item.top}px)`,
              }}
            >
              <LazyImage src={item.src} />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center mt-2" ref={loadingRef}>
        <Loading />
      </div>
    </div>
  )
}
