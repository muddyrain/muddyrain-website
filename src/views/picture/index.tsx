'use client'
import { Loading } from '@/components'
import { LazyImage } from '@/components/LazyImage'
import { ImageList, ImageListItem } from '@mui/material'
import { createClient } from 'pexels'
import { useEffect, useRef, useState } from 'react'
const client = createClient('KHVIPVzSojHHqIBSsI93saqTHpyQLrynPqq9DiPjTHgPkRctuwaPxHhf')

export default function Page() {
  const [imagesList, setImagesList] = useState<any[]>([])
  const loadingRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const getList = () => {
    client.photos.search({ query: 'cartoon', page, per_page: 20 }).then((res: any) => {
      setImagesList(list => [...list, ...res.photos])
    })
  }
  useEffect(() => {
    getList()
  }, [page])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        console.log('loading')
        setPage(page => page + 1)
      }
    })
    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }
  }, [loadingRef])
  return (
    <div className="w-container mx-auto mt-4 p-4">
      <ImageList className="w-full" variant="masonry" cols={6} gap={2}>
        {imagesList.map((item: any, index) => (
          <ImageListItem key={index} className="w-full">
            <LazyImage src={item.src} />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="flex justify-center mt-2" ref={loadingRef}>
        <Loading />
      </div>
    </div>
  )
}
