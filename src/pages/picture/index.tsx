'use client'
import { Layout } from '@/Layout'
import { Loading } from '@/components'
import { ImageList, ImageListItem } from '@mui/material'
import Image from 'next/image'
import { createClient } from 'pexels'
import { useEffect, useState } from 'react'
import colors from 'tailwindcss/colors'
const client = createClient('KHVIPVzSojHHqIBSsI93saqTHpyQLrynPqq9DiPjTHgPkRctuwaPxHhf')

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [imagesList, setImagesList] = useState<any[]>([])
  useEffect(() => {
    setLoading(true)
    client.photos
      .search({ query: 'cartoon', per_page: 10 })
      .then((res: any) => {
        setImagesList(res.photos)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <Layout>
      <div className="w-wrapper mx-auto mt-4 p-4 ">
        <ImageList variant="masonry" cols={6} gap={20}>
          {imagesList.map((item: any, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${item.src?.small}`}
                src={`${item.src?.original}`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <div className="flex justify-center">
          {loading && <Loading color={colors['violet']['400']} />}
        </div>
      </div>
    </Layout>
  )
}
