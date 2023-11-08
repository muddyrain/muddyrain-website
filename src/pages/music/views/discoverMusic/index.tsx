import { FC, useEffect, useState } from 'react'
import { Banner } from './components/Banner'
import { Grid, IconButton, Stack, Typography } from '@mui/material'
import { ScrollView } from '@/components'
import { NavigateNext, PlayArrow, PlayArrowOutlined } from '@mui/icons-material'
import { getPersonalizedApi } from '@/api/music'
import Icon from '@ant-design/icons/lib/components/AntdIcon'

interface PersonalizedItem {
  name: string
  picUrl: string
  playCount: number
}
export const DiscoverMusic: FC = () => {
  const [personalized, setPersonalized] = useState<PersonalizedItem[]>([])
  useEffect(() => {
    getPersonalizedApi(8).then(res => {
      console.log(res.result)
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
    <ScrollView>
      <div className="flex">
        <Banner />
        <div className="w-1/3"></div>
        <Stack className="w-1/3" direction={'row'} spacing={2}>
          <div className="flex-1 bg-red-200 rounded-md"></div>
          <div className="flex-1 bg-red-200 rounded-md"></div>
        </Stack>
      </div>
      <div className="mt-4">
        <Typography variant={'h6'} className="flex items-center">
          <span>推荐歌单</span>
          <NavigateNext />
        </Typography>
        <Grid container spacing={2} className="pt-2">
          {personalized.map(item => (
            <Grid item key={item.name} sm={3} md={2} lg={2.4}>
              <div className="flex flex-col cursor-pointer group">
                <div className="relative">
                  <img className="w-full rounded-md" src={item.picUrl} alt={item.name} />
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
                <div className="line-clamp-2">{item.name}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </ScrollView>
  )
}
