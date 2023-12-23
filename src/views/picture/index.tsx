'use client'
import { LazyImage } from '@/components/LazyImage'
import { WaterFall } from '@/components/WaterFall'
import { createClient } from 'pexels'
import { useEffect, useState } from 'react'
const client = createClient('KHVIPVzSojHHqIBSsI93saqTHpyQLrynPqq9DiPjTHgPkRctuwaPxHhf')

export default function Page() {
  const [imagesList, setImagesList] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [loaded, setLoaded] = useState(false)
  const getList = () => {
    client.photos.search({ query: 'landscape', page, per_page: pageSize }).then((res: any) => {
      setImagesList(list => [...list, ...res.photos])
      if (page * pageSize > res.total_results) {
        setLoaded(true)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [page])

  return (
    <div className="w-container mx-auto mt-4 p-4">
      <WaterFall
        className="w-container"
        dataSource={imagesList}
        renderItem={item => {
          return (
            <div
              style={{
                position: 'absolute',
                visibility: 'visible',
                pointerEvents: 'auto',
                width: item.width,
                height: item.height,
                transform: `translateX(${item.left}px) translateY(${item.top}px)`,
              }}
            >
              <LazyImage src={item.src} preview />
            </div>
          )
        }}
        imageKey="src.small"
        onRefresh={() => {
          setPage(_page => _page + 1)
        }}
        loaded={loaded}
      />
    </div>
  )
}
