'use client'
import { WaterFall } from '@/components/WaterFall'
import { createClient } from 'pexels'
import { useEffect, useState } from 'react'
const client = createClient('KHVIPVzSojHHqIBSsI93saqTHpyQLrynPqq9DiPjTHgPkRctuwaPxHhf')

export default function Page() {
  const [imagesList, setImagesList] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const getList = () => {
    client.photos.search({ query: 'cartoon', page, per_page: 20 }).then((res: any) => {
      setImagesList(list => [...list, ...res.photos])
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
        onRefresh={() => {
          setPage(_page => _page + 1)
        }}
      />
    </div>
  )
}
