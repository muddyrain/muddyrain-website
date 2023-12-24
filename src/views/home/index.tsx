'use client'
import { WaterDrop as WaterDropIcon } from '@mui/icons-material'
import { Button, FormControlLabel, Skeleton, Stack, Switch, Typography } from '@mui/material'
import Image from 'next/image'
import Carousel from 'react-material-ui-carousel'
import { useEffect, useState } from 'react'
import { Article } from '@/components'
import { getArticleListApi } from '@/api'
import { ArticleType } from '@/types'
import { LoadingBox } from '@/components/LoadingBox'
import { Empty } from '@/components/Empty'
import { RecentActivityList } from './RecentActivityList'

export default function Page() {
  const list = [
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/1.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/2.jpg',
    'https://muddyrain-oss.oss-cn-hangzhou.aliyuncs.com/3.jpg',
  ]
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const [loading, setLoading] = useState(true)
  const getArticleList = () => {
    setLoading(true)
    getArticleListApi({ page: 1, pageSize: 10 })
      .then(res => {
        setArticleList(res.data || [])
        // setTotal(res.total || 0)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getArticleList()
  }, [])
  const [autoPlay, setAutoPlay] = useState(true)
  return (
    <div className="w-container mx-auto p-3">
      <Stack direction="row" justifyContent="space-between">
        <div className="text-2xl">展示风采</div>
        <FormControlLabel
          control={
            <Switch
              checked={autoPlay}
              onChange={e => {
                setAutoPlay(e.target.checked)
              }}
            />
          }
          label="自动播放"
        />
      </Stack>
      {/* 轮播图 */}
      <Carousel
        autoPlay={autoPlay}
        interval={5000}
        duration={1000}
        className="relative h-[660px]"
        IndicatorIcon={<WaterDropIcon />}
        indicatorContainerProps={{
          className: 'absolute bottom-4 z-10',
        }}
        indicatorIconButtonProps={{
          className: 'hover:text-white text-zinc-400 mx-1',
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'white',
          },
        }}
      >
        {list.map((item, index) => {
          return (
            <div
              className="h-[660px] duration-300 rounded-lg overflow-hidden relative group"
              key={index}
            >
              <Image
                className="w-full h-full  cursor-pointer group-hover:scale-125 duration-500"
                src={item}
                width={0}
                loading={'eager'}
                height={0}
                sizes="100%,100%"
                alt="Picture of the author"
              />
              <div className="absolute bottom-10 left-10">
                <Button variant="contained" className="rounded-full duration-300">
                  请阅读我
                </Button>
                <div className="mt-2">
                  <Typography color="white">芳树无人花自落，春山一路鸟空啼</Typography>
                </div>
              </div>
            </div>
          )
        })}
      </Carousel>
      {/* 介绍 */}
      <Stack direction="row" spacing={4} className="mt-4">
        <Stack className="w-2/3">
          <div className="text-2xl">优质好文</div>
          <LoadingBox
            loading={loading}
            className="mt-2"
            component={
              <Stack spacing={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Stack spacing={1} key={index}>
                    <Stack spacing={1} direction={'row'} alignItems={'center'}>
                      <Skeleton variant="rounded" className="w-1/3" height={30} />
                      <Skeleton variant="rounded" className="w-20" height={30} />
                    </Stack>
                    <Skeleton variant="rounded" className="w-full" height={25} />
                    <Skeleton variant="rounded" className="w-4/5" height={25} />
                    <Skeleton variant="rounded" className="w-3/5" height={25} />
                  </Stack>
                ))}
              </Stack>
            }
          >
            {articleList.length === 0 && <Empty />}
            <Stack direction={'column'} spacing={1}>
              {articleList.map((item, index) => {
                return <Article article={item} key={index} />
              })}
            </Stack>
          </LoadingBox>
        </Stack>
        <Stack className="w-1/3">
          <Typography variant="h6">最近动态</Typography>
          <RecentActivityList />
        </Stack>
      </Stack>
    </div>
  )
}
