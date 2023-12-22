import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { loadImage } from './tools'
import { srcType } from '@/types'
import { Loading } from '../Loading'
import { debounce, getProperty } from '@/utils'
import Image from 'next/image'
interface WaterFallProps {
  className?: string
  dataSource: any[]
  column?: number
  gap?: number
  imageKey?: string
  onRefresh?: () => void
  renderItem?: (item: ListItem) => React.ReactNode
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
  [key: string]: any
}
export const WaterFall: FC<WaterFallProps> = ({
  className,
  dataSource,
  column = 6,
  gap = 10,
  onRefresh,
  renderItem,
  imageKey = 'src',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerHeight = useRef<number>(0)
  const loadingRef = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<ListItem[]>([])
  const heightList = useRef<number[]>([])
  const lastDataLength = useRef<number>(0)
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
      for (let i = lastDataLength.current; i < dataSource.length; i++) {
        const item = dataSource[i]
        const imageUrl = getProperty(item, imageKey)
        const { height: imageHeight, image } = await loadImage(imageUrl, columnWidth)
        // 计算高度最小的列
        const minHeight = Math.min(...heightList.current)
        const minIndex = heightList.current.indexOf(minHeight)
        // 设置位置
        const tmpItem = {
          url: image.src,
          src: item.src,
          left: minIndex * columnWidth + minIndex * gap,
          top: minHeight,
          width: columnWidth,
          height: imageHeight,
          id: item.id,
          data: item,
          index: i,
          key: `${i}-${Math.random().toString(36).slice(2)}`,
        }
        setList(list => [...list, tmpItem])
        // 更新高度
        heightList.current[minIndex] = minHeight + imageHeight + gap
        // 设置容器高度
        const maxHeight = Math.max(...heightList.current)
        containerRef.current.style.height = `${maxHeight}px`
        containerHeight.current = maxHeight
      }
      // 数据加载完毕
      setIsLoading(false)
      lastDataLength.current = dataSource.length
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
          const imageUrl = getProperty(item.data, imageKey)
          return (
            <Fragment key={item.key}>
              {renderItem ? (
                renderItem(item)
              ) : (
                <div
                  data-key={item.key}
                  data-id={item.id}
                  style={{
                    position: 'absolute',
                    visibility: 'visible',
                    pointerEvents: 'auto',
                    width: item.width,
                    height: item.height,
                    transform: `translateX(${item.left}px) translateY(${item.top}px)`,
                  }}
                >
                  <Image
                    width={0}
                    height={0}
                    src={imageUrl}
                    alt="image"
                    className="w-full h-auto"
                  />
                </div>
              )}
            </Fragment>
          )
        })}
      </div>
      <div className="flex justify-center mt-2" ref={loadingRef}>
        <Loading />
      </div>
    </div>
  )
}
