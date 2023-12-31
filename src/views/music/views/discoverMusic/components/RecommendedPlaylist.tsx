import { FC, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { PlayArrow, PlayArrowOutlined } from '@mui/icons-material'
import { getPersonalizedApi } from '@/views/music/api/music'
import { Title } from './index'
import { SongListItem } from '@/views/music/types'
import Image from 'next/image'

/**
 * 推荐歌单
 */
export const RecommendedPlaylist: FC = () => {
  const [personalized, setPersonalized] = useState<SongListItem[]>([])
  useEffect(() => {
    getPersonalizedApi(5).then(res => {
      setPersonalized(res.result || [])
    })
  }, [])
  const formatePlayCount = (count: number) => {
    if (count > 1e8) {
      return `${(count / 1e8).toFixed(1)}亿`
    } else if (count > 1e4) {
      return `${(count / 1e4).toFixed(1)}万`
    }
    return count
  }
  return (
    <div className="relative">
      <Title title="推荐歌单" />
      <Grid container spacing={2} className="pt-2">
        {personalized.map(item => (
          <Grid item key={item.name} sm={3} md={2} lg={2.4}>
            <div className="flex flex-col cursor-pointer group">
              <div className="relative h-56">
                <Image className="w-full rounded-md" src={item.picUrl} alt={item.name} fill />
                <div className="absolute top-1 right-1 flex items-center">
                  <PlayArrowOutlined className="text-white mr-1" />
                  <span className="text-white">{formatePlayCount(item.playCount)}</span>
                </div>
                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 duration-300">
                  <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center duration-300 hover:bg-red-100">
                    <PlayArrow className="text-red-600" />
                  </div>
                </div>
              </div>
              <div className="line-clamp-2 mt-1">{item.name}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
